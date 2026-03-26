import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BookOpen, CheckCircle, AlertCircle } from 'lucide-react';

const StudentAttendance = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAttendance = async () => {
      const token = sessionStorage.getItem('authToken');
      if (!token) {
        setError('No authentication token found. Please log in again.');
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get('http://localhost:5000/api/student/attendance', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.success) {
          setData(res.data.data);
        } else {
          setError(res.data.message);
        }
      } catch (err) {
        console.error('Attendance fetch error:', err);

        if (err.response) {
          const { status, data } = err.response;
          switch (status) {
            case 401:
              setError('Your session has expired. Please log in again.');
              sessionStorage.removeItem('authToken');
              sessionStorage.removeItem('userRole');
              setTimeout(() => navigate('/'), 2000);
              break;
            case 403:
              setError('You do not have permission to view attendance.');
              break;
            case 404:
              setError('Student record not found.');
              break;
            default:
              setError(data?.message || 'Failed to load attendance data.');
          }
        } else if (err.request) {
          setError('Network error. Please check your connection.');
        } else {
          setError('An unexpected error occurred.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded flex items-center gap-2">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const { subjects, overall } = data;

  const getPercentageColor = (percent) => {
    if (percent >= 75) return 'text-green-600';
    if (percent >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <BookOpen className="text-blue-600" /> My Attendance Report
      </h1>

      {/* Overall Summary Card */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 shadow-sm mb-8">
        <h2 className="text-xl font-semibold mb-3">Overall Attendance</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-600">Total Sessions</p>
            <p className="text-2xl font-bold">{overall.totalSessions}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Sessions Attended</p>
            <p className="text-2xl font-bold">{overall.attended}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Attendance Percentage</p>
            <p className={`text-2xl font-bold ${getPercentageColor(overall.percentage)}`}>
              {overall.percentage.toFixed(2)}%
            </p>
          </div>
        </div>
        <div className="mt-4 w-full bg-gray-200 rounded-full h-2.5">
          <div
            className={`h-2.5 rounded-full ${
              overall.percentage >= 75 ? 'bg-green-600' : overall.percentage >= 50 ? 'bg-yellow-500' : 'bg-red-600'
            }`}
            style={{ width: `${Math.min(overall.percentage, 100)}%` }}
          ></div>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          * Minimum 75% attendance required for eligibility
        </p>
      </div>

      {/* Subject-wise Table */}
      <h2 className="text-xl font-semibold mb-4">Subject-wise Attendance</h2>
      <div className="overflow-x-auto border rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Attended / Total</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Percentage</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {subjects.map((sub) => (
              <tr key={sub.code} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{sub.subject}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sub.code}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                  {sub.attended} / {sub.totalSessions}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span
                    className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      sub.percentage >= 75
                        ? 'bg-green-100 text-green-800'
                        : sub.percentage >= 50
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {sub.percentage.toFixed(2)}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentAttendance;