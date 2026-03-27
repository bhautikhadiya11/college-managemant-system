import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Loader2, CheckCircle, AlertCircle, Download } from 'lucide-react';

const StudentFees = () => {
  const navigate = useNavigate();
  const [semesters, setSemesters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [selectedSemesters, setSelectedSemesters] = useState([]);

  useEffect(() => {
    const fetchFeeStatus = async () => {
      try {
        const token = sessionStorage.getItem('authToken');
        const res = await axios.get('http://localhost:5000/api/fees/status', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.success) {
          setSemesters(res.data.data);
          // Initialize with unpaid semesters
          const unpaid = res.data.data.filter(sem => !sem.paid).map(sem => sem.semester);
          setSelectedSemesters(unpaid);
          console.log('Initial unpaid semesters:', unpaid);
        } else {
          setError(res.data.message);
        }
      } catch (err) {
        console.error(err);
        setError('Failed to fetch fee status');
      } finally {
        setLoading(false);
      }
    };
    fetchFeeStatus();
  }, []);

  const loadRazorpayScript = () => new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

  const handlePayment = async () => {
    if (selectedSemesters.length === 0) {
      setError('Please select at least one semester to pay.');
      return;
    }
    setProcessing(true);
    setError('');
    try {
      const token = sessionStorage.getItem('authToken');
      console.log('📤 Sending semesters:', selectedSemesters);
      const orderRes = await axios.post(
        'http://localhost:5000/api/fees/create-order',
        { semesters: selectedSemesters },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (!orderRes.data.success) throw new Error(orderRes.data.message);
      const { orderId, amount, key, semesters: confirmedSemesters } = orderRes.data;
      console.log('✅ Order created for semesters:', confirmedSemesters);

      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) throw new Error('Failed to load Razorpay SDK');

      const options = {
        key,
        amount,
        currency: 'INR',
        name: 'Campus Flow',
        description: `Fee Payment - Semesters ${selectedSemesters.join(', ')}`,
        order_id: orderId,
        handler: async (response) => {
          const verifyRes = await axios.post(
            'http://localhost:5000/api/fees/verify-payment',
            {
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
            },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          if (verifyRes.data.success) {
            setSuccess(`Payment successful for semesters ${selectedSemesters.join(', ')}!`);
            // Refresh status
            const statusRes = await axios.get('http://localhost:5000/api/fees/status', {
              headers: { Authorization: `Bearer ${token}` },
            });
            if (statusRes.data.success) setSemesters(statusRes.data.data);
            setSelectedSemesters([]);
            setTimeout(() => setSuccess(''), 5000);
          } else {
            setError(verifyRes.data.message);
          }
        },
        prefill: { name: '', email: '' },
        theme: { color: '#4f46e5' },
      };
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.error(err);
      setError(err.message || 'Payment initiation failed');
    } finally {
      setProcessing(false);
    }
  };

  const toggleSemester = (semester) => {
    setSelectedSemesters(prev => {
      const updated = prev.includes(semester) ? prev.filter(s => s !== semester) : [...prev, semester];
      console.log('Selected semesters after toggle:', updated);
      return updated;
    });
  };

  const selectAllUnpaid = () => {
    const unpaid = semesters.filter(sem => !sem.paid).map(sem => sem.semester);
    setSelectedSemesters(unpaid);
    console.log('Selected all unpaid:', unpaid);
  };

  const totalAmount = selectedSemesters.reduce((sum, sem) => {
    const semData = semesters.find(s => s.semester === sem);
    return sum + (semData ? semData.amount : 0);
  }, 0) / 100;

  const formatAmount = (amount) => `₹${(amount / 100).toFixed(2)}`;

  if (loading) return <div className="flex justify-center items-center h-64"><Loader2 className="animate-spin h-8 w-8 text-indigo-600" /></div>;
  if (error) return <div className="max-w-4xl mx-auto p-6"><div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div></div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Fee Payment</h1>
      {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 flex items-center gap-2"><CheckCircle size={20} />{success}</div>}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-4 bg-gray-50 flex justify-between items-center border-b">
          <h2 className="text-lg font-semibold">Select Semesters to Pay</h2>
          <button onClick={selectAllUnpaid} className="text-blue-600 text-sm hover:underline">Select All Unpaid</button>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Select</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Semester</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Receipt</th>
             </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {semesters.map(sem => (
              <tr key={sem.semester} className={sem.paid ? 'bg-gray-50' : ''}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {!sem.paid && (
                    <input
                      type="checkbox"
                      checked={selectedSemesters.includes(sem.semester)}
                      onChange={() => toggleSemester(sem.semester)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Semester {sem.semester}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatAmount(sem.amount)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${sem.paid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {sem.paid ? 'Paid' : 'Pending'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {sem.paid && sem.receipt ? (
                    <button
                      onClick={() => alert(`Receipt: ${sem.receipt}`)}
                      className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    >
                      <Download size={16} /> Receipt
                    </button>
                  ) : '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {selectedSemesters.length > 0 && (
          <div className="p-4 bg-gray-50 border-t flex justify-between items-center">
            <div>
              <span className="font-medium">Total Amount: </span>
              <span className="text-xl font-bold text-indigo-600">₹{totalAmount}</span>
            </div>
            <button
              onClick={handlePayment}
              disabled={processing}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition"
            >
              {processing ? 'Processing...' : `Pay ₹${totalAmount}`}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentFees;