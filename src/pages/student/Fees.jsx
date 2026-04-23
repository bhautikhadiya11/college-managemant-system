// src/student/Fees.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  CreditCard, CheckCircle, AlertCircle, Download,
  Loader2, IndianRupee, Receipt, Lock
} from 'lucide-react';

const StudentFees = () => {
  const navigate = useNavigate();
  const [semesters, setSemesters]               = useState([]);
  const [loading, setLoading]                   = useState(true);
  const [processing, setProcessing]             = useState(false);
  const [error, setError]                       = useState('');
  const [success, setSuccess]                   = useState('');
  const [selectedSemesters, setSelectedSemesters] = useState([]);

  useEffect(() => {
    const fetchFeeStatus = async () => {
      try {
        const token = sessionStorage.getItem('authToken');
        if (!token) { setError('Please log in again'); setLoading(false); return; }
        const res = await axios.get('http://localhost:5000/api/fees/status', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.data.success) {
          setSemesters(res.data.data);
          setSelectedSemesters(res.data.data.filter(s => !s.paid).map(s => s.semester));
        } else setError(res.data.message);
      } catch (err) {
        if (err.response?.status === 401) {
          setError('Session expired. Please log in again.');
          sessionStorage.removeItem('authToken'); sessionStorage.removeItem('userRole');
          setTimeout(() => navigate('/'), 2000);
        } else setError('Failed to fetch fee status');
      } finally { setLoading(false); }
    };
    fetchFeeStatus();
  }, [navigate]);

  const loadRazorpay = () => new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true); script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

  const downloadReceipt = (feeId) => {
    const token = sessionStorage.getItem('authToken');
    if (!token) { alert('Please log in again'); return; }
    window.open(`http://localhost:5000/api/fees/receipt/${feeId}?token=${encodeURIComponent(token)}`, '_blank');
  };

  const handlePayment = async () => {
    if (!selectedSemesters.length) { setError('Select at least one semester to pay.'); return; }
    setProcessing(true); setError('');
    try {
      const token = sessionStorage.getItem('authToken');
      const orderRes = await axios.post(
        'http://localhost:5000/api/fees/create-order',
        { semesters: selectedSemesters },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (!orderRes.data.success) throw new Error(orderRes.data.message);
      const { orderId, amount, key } = orderRes.data;

      const loaded = await loadRazorpay();
      if (!loaded) throw new Error('Failed to load Razorpay SDK');

      new window.Razorpay({
        key, amount, currency: 'INR',
        name: 'Campus Flow',
        description: `Fee Payment - Semesters ${selectedSemesters.join(', ')}`,
        order_id: orderId,
        handler: async (response) => {
          const verifyRes = await axios.post(
            'http://localhost:5000/api/fees/verify-payment',
            {
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature
            },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          if (verifyRes.data.success) {
            setSuccess(`Payment successful for semesters ${selectedSemesters.join(', ')}!`);
            const statusRes = await axios.get('http://localhost:5000/api/fees/status', {
              headers: { Authorization: `Bearer ${token}` }
            });
            if (statusRes.data.success) setSemesters(statusRes.data.data);
            setSelectedSemesters([]);
            setTimeout(() => setSuccess(''), 5000);
          } else setError(verifyRes.data.message);
        },
        prefill: { name: '', email: '' },
        theme: { color: '#2563eb' },
      }).open();
    } catch (err) {
      setError(err.message || 'Payment initiation failed');
    } finally { setProcessing(false); }
  };

  const toggle = (sem) =>
    setSelectedSemesters(prev =>
      prev.includes(sem) ? prev.filter(s => s !== sem) : [...prev, sem]
    );

  const selectAllUnpaid = () =>
    setSelectedSemesters(semesters.filter(s => !s.paid).map(s => s.semester));

  const fmtAmt = (amt) => `₹${(amt / 100).toFixed(0)}`;
  const totalAmount = selectedSemesters.reduce((sum, sem) => {
    const found = semesters.find(s => s.semester === sem);
    return sum + (found?.amount || 0);
  }, 0) / 100;

  const paid   = semesters.filter(s => s.paid);
  const unpaid = semesters.filter(s => !s.paid);

  if (loading) return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <Loader2 className="animate-spin w-8 h-8 text-blue-600" />
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800">Fee Payment</h1>
          <p className="text-slate-500 text-sm mt-0.5">Manage and pay your semester fees</p>
        </div>
        <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
          <CreditCard size={18} className="text-green-600" />
        </div>
      </div>

      {/* Alerts */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl flex items-center gap-2 text-sm">
          <AlertCircle size={16} className="flex-shrink-0" /> {error}
        </div>
      )}
      {success && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-2xl flex items-center gap-2 text-sm">
          <CheckCircle size={16} className="flex-shrink-0" /> {success}
        </div>
      )}

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Total Semesters</p>
          <p className="text-3xl font-extrabold text-slate-800 mt-1">{semesters.length}</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
          <p className="text-xs font-semibold text-emerald-500 uppercase tracking-wide">Paid</p>
          <p className="text-3xl font-extrabold text-emerald-600 mt-1">{paid.length}</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 col-span-2 sm:col-span-1">
          <p className="text-xs font-semibold text-red-400 uppercase tracking-wide">Pending</p>
          <p className="text-3xl font-extrabold text-red-500 mt-1">{unpaid.length}</p>
        </div>
      </div>

      {/* Unpaid semesters */}
      {unpaid.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-bold text-slate-700 text-sm uppercase tracking-wide">Pending Fees</h2>
            <button onClick={selectAllUnpaid}
              className="text-xs text-blue-600 font-semibold hover:underline">
              Select All
            </button>
          </div>
          <div className="divide-y divide-slate-50">
            {unpaid.map(sem => {
              const selected = selectedSemesters.includes(sem.semester);
              return (
                <div key={sem.semester}
                  onClick={() => toggle(sem.semester)}
                  className={`flex items-center gap-4 px-5 py-4 cursor-pointer transition-colors ${selected ? 'bg-blue-50' : 'hover:bg-slate-50'}`}
                >
                  <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-colors ${selected ? 'bg-blue-600 border-blue-600' : 'border-slate-300'}`}>
                    {selected && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-slate-800 text-sm">Semester {sem.semester}</p>
                  </div>
                  <span className="text-sm font-bold text-slate-700">{fmtAmt(sem.amount)}</span>
                  <span className="text-xs font-semibold bg-red-100 text-red-700 px-2.5 py-1 rounded-full">Pending</span>
                </div>
              );
            })}
          </div>

          {/* Pay button */}
          {selectedSemesters.length > 0 && (
            <div className="px-5 py-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-1 text-slate-700">
                <IndianRupee size={16} className="text-slate-500" />
                <span className="text-sm">Total:</span>
                <span className="text-xl font-extrabold text-blue-600 ml-1">₹{totalAmount.toFixed(0)}</span>
              </div>
              <button onClick={handlePayment} disabled={processing}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-6 py-3 rounded-xl transition disabled:opacity-50 shadow-lg shadow-blue-200 active:scale-95">
                {processing
                  ? <><Loader2 size={15} className="animate-spin" /> Processing…</>
                  : <><Lock size={14} /> Pay Securely ₹{totalAmount.toFixed(0)}</>}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Paid semesters */}
      {paid.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100">
            <h2 className="font-bold text-slate-700 text-sm uppercase tracking-wide">Payment History</h2>
          </div>
          <div className="divide-y divide-slate-50">
            {paid.map(sem => (
              <div key={sem.semester} className="flex items-center gap-4 px-5 py-4">
                <div className="w-8 h-8 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <CheckCircle size={16} className="text-emerald-600" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-slate-800 text-sm">Semester {sem.semester}</p>
                  <p className="text-xs text-slate-400">{fmtAmt(sem.amount)}</p>
                </div>
                <span className="text-xs font-semibold bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full">Paid</span>
                {sem.receipt && sem._id && (
                  <button onClick={() => downloadReceipt(sem._id)}
                    className="flex items-center gap-1.5 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 text-slate-600 hover:text-blue-700 text-xs font-semibold px-3 py-2 rounded-xl transition">
                    <Receipt size={13} /> Receipt
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentFees;