import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FileText, Paperclip, Download, Calendar, Clock, User } from 'lucide-react';

const StudentAssignments = () => {
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAssignments = async () => {
      const token = sessionStorage.getItem('authToken');
      if (!token) {
        setError('No authentication token found. Please log in again.');
        setLoading(false);
        return;
      }
      try {
        const res = await axios.get('http://localhost:5000/api/assignments/student', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.success) {
          setAssignments(res.data.data);
        } else {
          setError(res.data.message);
        }
      } catch (err) {
        console.error(err);
        if (err.response?.status === 401) {
          sessionStorage.removeItem('authToken');
          sessionStorage.removeItem('userRole');
          navigate('/');
        } else {
          setError(err.response?.data?.message || 'Failed to load assignments');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchAssignments();
  }, [navigate]);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const isPastDue = (dueDate) => {
    return new Date(dueDate) < new Date();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            My Assignments
          </h1>
          <p className="text-gray-500 mt-2">View and download your course assignments</p>
        </div>

        {assignments.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <FileText size={48} className="mx-auto text-gray-400 mb-3" />
            <p className="text-gray-500">No assignments have been posted for your courses yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {assignments.map(assign => {
              const overdue = isPastDue(assign.dueDate);
              return (
                <div key={assign._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-200 border border-gray-100">
                  <div className="p-6">
                    <div className="flex flex-wrap justify-between items-start gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h2 className="text-2xl font-bold text-gray-800">{assign.title}</h2>
                          {overdue && (
                            <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full font-medium">
                              Overdue
                            </span>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500">
                          <span className="flex items-center gap-1"><Calendar size={14} /> Due: {formatDate(assign.dueDate)}</span>
                          <span className="flex items-center gap-1"><User size={14} /> {assign.createdBy?.name || 'Professor'}</span>
                          <span className="flex items-center gap-1"><FileText size={14} /> {assign.subject?.name || 'Subject'}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 mt-4 whitespace-pre-wrap">{assign.description}</p>
                    {assign.attachments?.length > 0 && (
                      <div className="mt-5">
                        <p className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1"><Paperclip size={14} /> Attachments</p>
                        <div className="flex flex-wrap gap-3">
                          {assign.attachments.map((att, idx) => (
                            <a
                              key={idx}
                              href={att.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 px-4 py-2 rounded-lg transition"
                            >
                              <Download size={16} />
                              {att.originalName}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="mt-4 text-xs text-gray-400">
                      Posted: {formatDate(assign.createdAt)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentAssignments;