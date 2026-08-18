// src/student/Notifications.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');
  .sn-root * { box-sizing: border-box; }
  .sn-root { font-family: 'Outfit', sans-serif; color: #0f172a; }

  .sn-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:1.75rem; flex-wrap:wrap; gap:1rem; }
  .sn-title { font-size:1.5rem; font-weight:800; color:#0f172a; letter-spacing:-0.02em; }
  .sn-subtitle { font-size:0.82rem; color:#9ca3af; margin-top:0.2rem; }

  .sn-list { display:flex; flex-direction:column; gap:1rem; }

  .sn-item {
    background:#fff; border:1.5px solid #e8eaf0; border-radius:18px;
    overflow:hidden; transition:all 0.2s; box-shadow:0 2px 12px rgba(15,23,42,0.04);
  }
  .sn-item:hover { box-shadow:0 6px 24px rgba(15,23,42,0.09); transform:translateY(-1px); }
  .sn-item.unread { border-color:#c7d2fe; box-shadow:0 2px 12px rgba(99,102,241,0.08); }
  .sn-item-accent { height:3px; background:linear-gradient(90deg, #6366f1, #0ea5e9); }

  .sn-item-body { padding:1.25rem 1.5rem; }
  .sn-item-top { display:flex; align-items:flex-start; justify-content:space-between; gap:1rem; margin-bottom:0.75rem; }
  .sn-item-title { font-size:1rem; font-weight:700; color:#0f172a; }
  .sn-new-badge {
    display:inline-flex; align-items:center; gap:0.3rem;
    background:linear-gradient(135deg, #6366f1, #0ea5e9);
    color:#fff; font-size:0.65rem; font-weight:700;
    padding:0.18rem 0.6rem; border-radius:50px; white-space:nowrap; flex-shrink:0;
  }
  .sn-new-dot { width:5px; height:5px; border-radius:50%; background:#fff; }

  .sn-item-meta { display:flex; align-items:center; gap:1rem; flex-wrap:wrap; margin-bottom:0.75rem; }
  .sn-item-meta span { font-size:0.75rem; color:#9ca3af; display:flex; align-items:center; gap:0.3rem; }

  .sn-item-content { font-size:0.875rem; color:#4b5563; line-height:1.65; white-space:pre-wrap; }

  .sn-attachments { margin-top:1rem; padding-top:1rem; border-top:1px solid #f1f5f9; }
  .sn-att-label { font-size:0.72rem; font-weight:700; color:#6366f1; letter-spacing:0.06em; text-transform:uppercase; margin-bottom:0.6rem; display:flex; align-items:center; gap:0.4rem; }
  .sn-att-label::before { content:''; width:3px; height:12px; border-radius:99px; background:linear-gradient(180deg,#6366f1,#0ea5e9); flex-shrink:0; }
  .sn-att-list { display:flex; flex-wrap:wrap; gap:0.5rem; }
  .sn-att-pill {
    display:inline-flex; align-items:center; gap:0.4rem;
    background:#f8fafc; border:1.5px solid #e8eaf0;
    color:#374151; font-size:0.78rem; font-weight:500;
    padding:0.35rem 0.75rem; border-radius:8px;
    text-decoration:none; transition:all 0.2s;
  }
  .sn-att-pill:hover { background:#eef2ff; border-color:#c7d2fe; color:#4338ca; }

  .sn-read-indicator { display:flex; align-items:center; gap:0.35rem; font-size:0.72rem; color:#34d399; font-weight:600; margin-top:0.75rem; }

  .sn-empty {
    background:#fff; border:1.5px solid #e8eaf0; border-radius:18px;
    padding:4rem 2rem; text-align:center; box-shadow:0 2px 12px rgba(15,23,42,0.04);
  }
  .sn-empty-icon { font-size:3rem; margin-bottom:0.75rem; }
  .sn-empty-title { font-size:1rem; font-weight:700; color:#374151; margin-bottom:0.3rem; }
  .sn-empty-desc { font-size:0.85rem; color:#9ca3af; }

  .sn-loading { display:flex; align-items:center; justify-content:center; min-height:50vh; gap:1rem; }
  .sn-spinner { width:40px; height:40px; border-radius:50%; border:3px solid #e5e7eb; border-top-color:#6366f1; animation:sn-spin 0.8s linear infinite; }
  @keyframes sn-spin { to { transform:rotate(360deg); } }
  .sn-error { background:#fff1f2; border:1.5px solid #fecdd3; border-radius:14px; padding:1rem 1.25rem; font-size:0.875rem; color:#dc2626; }

  @media (max-width:640px) {
    .sn-item-body { padding:1rem; }
    .sn-item-top { flex-direction:column; gap:0.5rem; }
  }
`;

const StudentNotifications = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading]             = useState(true);
  const [error, setError]                 = useState('');

  useEffect(() => {
    (async () => {
      const token = sessionStorage.getItem('authToken');
      if (!token) { setError('Please log in again.'); setLoading(false); return; }
      try {
        const res = await axios.get('https://cms-backend-wl7u.onrender.com/api/notifications', { headers: { Authorization: `Bearer ${token}` } });
        if (res.data.success) setNotifications(res.data.data);
        else setError('Failed to load notifications');
      } catch (err) {
        if (err.response?.status === 401) { sessionStorage.removeItem('authToken'); sessionStorage.removeItem('userRole'); navigate('/'); }
        else setError(err.response?.data?.message || 'Server error');
      } finally { setLoading(false); }
    })();
  }, [navigate]);

  // Auto-mark unread as read
  useEffect(() => {
    const unreadIds = notifications.filter(n => !n.isRead).map(n => n._id);
    if (!unreadIds.length) return;
    const token = sessionStorage.getItem('authToken');
    if (!token) return;
    Promise.all(unreadIds.map(id => axios.put(`https://cms-backend-wl7u.onrender.com/api/notifications/${id}/read`, {}, { headers: { Authorization: `Bearer ${token}` } }).catch(() => {})));
    setNotifications(prev => prev.map(n => unreadIds.includes(n._id) ? { ...n, isRead: true } : n));
  }, [notifications.length]);

  const fmtDate = (d) => new Date(d).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' });

  if (loading) return (
    <><style>{styles}</style>
    <div className="sn-root sn-loading"><div className="sn-spinner" /></div></>
  );

  if (error) return (
    <><style>{styles}</style>
    <div className="sn-root"><div className="sn-error">{error}</div></div></>
  );

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <>
      <style>{styles}</style>
      <div className="sn-root">
        <div className="sn-header">
          <div>
            <div className="sn-title">Notifications</div>
            <div className="sn-subtitle">
              {notifications.length} notification{notifications.length !== 1 ? 's' : ''}
              {unreadCount > 0 && ` · ${unreadCount} unread`}
            </div>
          </div>
        </div>

        {notifications.length === 0 ? (
          <div className="sn-empty">
            <div className="sn-empty-icon">🔔</div>
            <div className="sn-empty-title">All caught up!</div>
            <div className="sn-empty-desc">No notifications for your department yet.</div>
          </div>
        ) : (
          <div className="sn-list">
            {notifications.map(notif => (
              <div key={notif._id} className={`sn-item${!notif.isRead ? ' unread' : ''}`}>
                {!notif.isRead && <div className="sn-item-accent" />}
                <div className="sn-item-body">
                  <div className="sn-item-top">
                    <div className="sn-item-title">{notif.title}</div>
                    {!notif.isRead && (
                      <span className="sn-new-badge"><span className="sn-new-dot" /> New</span>
                    )}
                  </div>
                  <div className="sn-item-meta">
                    <span>📅 {fmtDate(notif.createdAt)}</span>
                    {notif.createdBy && (
                      <span>👤 {notif.createdBy?.firstName || 'Admin'} {notif.createdBy?.lastName || ''}</span>
                    )}
                  </div>
                  <div className="sn-item-content">{notif.content}</div>

                  {notif.attachments?.length > 0 && (
                    <div className="sn-attachments">
                      <div className="sn-att-label">Attachments</div>
                      <div className="sn-att-list">
                        {notif.attachments.map((att, idx) => (
                          <a key={idx} href={att.url} target="_blank" rel="noopener noreferrer" className="sn-att-pill">
                            {att.fileType === 'image' ? '🖼' : '📄'} {att.filename}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {notif.isRead && (
                    <div className="sn-read-indicator">✓✓ Read</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default StudentNotifications;
