import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FileText, Image as ImageIcon, Calendar } from 'lucide-react';

const StudentNotifications = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [marking, setMarking] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      const token = sessionStorage.getItem('authToken');
      if (!token) {
        setError('No authentication token found. Please log in again.');
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get('http://localhost:5000/api/notifications', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.data.success) {
          setNotifications(res.data.data);
        } else {
          setError('Failed to load notifications');
        }
      } catch (err) {
        console.error('Notification fetch error:', err);
        if (err.response?.status === 401) {
          sessionStorage.removeItem('authToken');
          sessionStorage.removeItem('userRole');
          navigate('/');
        } else {
          setError(err.response?.data?.message || 'Server error');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, [navigate]);

  // Automatically mark unread notifications as read
  useEffect(() => {
    if (notifications.length > 0 && !marking) {
      const unreadIds = notifications
        .filter(n => !n.isRead)
        .map(n => n._id);
      if (unreadIds.length > 0) {
        setMarking(true);
        // Mark each unread notification
        Promise.all(
          unreadIds.map(async (id) => {
            try {
              const token = sessionStorage.getItem('authToken');
              if (!token) return;
              await axios.put(
                `http://localhost:5000/api/notifications/${id}/read`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
              );
              // Update local state for this notification
              setNotifications(prev =>
                prev.map(n => n._id === id ? { ...n, isRead: true } : n)
              );
            } catch (err) {
              console.error(`Failed to mark ${id} as read`, err);
            }
          })
        ).finally(() => setMarking(false));
      }
    }
  }, [notifications, marking]);

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
            <div
              key={notif._id}
              className={`bg-white rounded-lg shadow-md border-l-4 ${notif.isRead ? 'border-gray-300' : 'border-blue-500'} overflow-hidden`}
            >
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
                          onClick={(e) => e.stopPropagation()}
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
                {!notif.isRead && (
                  <div className="mt-2 text-xs text-blue-600 font-medium">
                    Marked as read automatically
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentNotifications;