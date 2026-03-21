import { useState, useEffect } from 'react';
import axios from 'axios';
import { FileText, Image as ImageIcon, Calendar } from 'lucide-react';

const StudentNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const res = await axios.get('http://localhost:5000/api/notifications', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.data.success) {
          setNotifications(res.data.data);
        } else {
          setError('Failed to load notifications');
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Server error');
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  if (loading) return <div className="text-center py-8">Loading notifications...</div>;
  if (error) return <div className="text-red-500 text-center py-8">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Notifications</h1>
      {notifications.length === 0 ? (
        <div className="text-center text-gray-500 py-12">No notifications for your department.</div>
      ) : (
        <div className="space-y-6">
          {notifications.map(notif => (
            <div key={notif._id} className="bg-white rounded-lg shadow-md border-l-4 border-blue-500 overflow-hidden">
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-800">{notif.title}</h2>
                  <span className="text-sm text-gray-500 flex items-center gap-1">
                    <Calendar size={14} />
                    {new Date(notif.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-600 mt-2 whitespace-pre-wrap">{notif.content}</p>
                {notif.attachments?.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Attachments</h3>
                    <div className="flex flex-wrap gap-2">
                      {notif.attachments.map((att, idx) => (
                        <a
                          key={idx}
                          href={att.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-blue-600 hover:underline bg-gray-100 px-3 py-1 rounded"
                        >
                          {att.fileType === 'image' ? <ImageIcon size={14} /> : <FileText size={14} />}
                          {att.filename}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
                <div className="mt-3 text-xs text-gray-400">
                  From: {notif.createdBy?.firstName || 'Admin'} {notif.createdBy?.lastName || ''}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentNotifications;