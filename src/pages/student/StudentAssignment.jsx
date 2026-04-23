// src/student/StudentAssignment.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
  .sa-root * { box-sizing: border-box; }
  .sa-root { font-family: 'Outfit', sans-serif; color: #0f172a; }

  .sa-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:1.75rem; flex-wrap:wrap; gap:1rem; }
  .sa-title { font-size:1.5rem; font-weight:800; color:#0f172a; letter-spacing:-0.02em; }
  .sa-subtitle { font-size:0.82rem; color:#9ca3af; margin-top:0.2rem; }

  .sa-list { display:flex; flex-direction:column; gap:1rem; }

  .sa-item {
    background:#fff; border:1.5px solid #e8eaf0; border-radius:18px;
    overflow:hidden; transition:all 0.2s cubic-bezier(0.34,1.56,0.64,1);
    box-shadow:0 2px 12px rgba(15,23,42,0.04);
  }
  .sa-item:hover { box-shadow:0 8px 28px rgba(15,23,42,0.1); transform:translateY(-2px); }

  .sa-item-stripe { height:4px; }
  .sa-stripe-overdue { background:linear-gradient(90deg, #ef4444, #f87171); }
  .sa-stripe-urgent  { background:linear-gradient(90deg, #f97316, #fb923c); }
  .sa-stripe-soon    { background:linear-gradient(90deg, #eab308, #facc15); }
  .sa-stripe-ok      { background:linear-gradient(90deg, #10b981, #34d399); }

  .sa-item-body { padding:1.25rem 1.5rem; }
  .sa-item-top { display:flex; justify-content:space-between; align-items:flex-start; gap:1rem; margin-bottom:0.75rem; flex-wrap:wrap; }
  .sa-item-title { font-size:1.05rem; font-weight:700; color:#0f172a; }

  .sa-badge { display:inline-flex; align-items:center; gap:0.3rem; padding:0.25rem 0.75rem; border-radius:50px; font-size:0.72rem; font-weight:700; white-space:nowrap; flex-shrink:0; }
  .sa-badge-overdue { background:#fee2e2; color:#dc2626; }
  .sa-badge-urgent  { background:#ffedd5; color:#c2410c; }
  .sa-badge-soon    { background:#fef9c3; color:#854d0e; }
  .sa-badge-ok      { background:#d1fae5; color:#065f46; }

  .sa-meta { display:flex; flex-wrap:wrap; gap:0.75rem 1.25rem; margin-bottom:1rem; }
  .sa-meta span {
    display:flex; align-items:center; gap:0.35rem;
    font-size:0.78rem; color:#6b7280; font-weight:500;
  }

  .sa-desc { font-size:0.875rem; color:#4b5563; line-height:1.65; white-space:pre-wrap; margin-bottom:1rem; }

  .sa-attachments { border-top:1px solid #f1f5f9; padding-top:1rem; }
  .sa-att-label { font-size:0.72rem; font-weight:700; color:#6366f1; letter-spacing:0.06em; text-transform:uppercase; margin-bottom:0.6rem; display:flex; align-items:center; gap:0.4rem; }
  .sa-att-label::before { content:''; width:3px; height:12px; border-radius:99px; background:linear-gradient(180deg,#6366f1,#0ea5e9); flex-shrink:0; }
  .sa-att-list { display:flex; flex-wrap:wrap; gap:0.5rem; }
  .sa-att-pill {
    display:inline-flex; align-items:center; gap:0.5rem;
    background:linear-gradient(135deg, #eef2ff, #f0f9ff);
    border:1.5px solid #c7d2fe; color:#4338ca;
    font-size:0.78rem; font-weight:600;
    padding:0.4rem 0.85rem; border-radius:10px;
    text-decoration:none; transition:all 0.2s;
  }
  .sa-att-pill:hover { background:linear-gradient(135deg,#e0e7ff,#dbeafe); border-color:#a5b4fc; transform:translateY(-1px); }

  .sa-footer { font-size:0.72rem; color:#d1d5db; margin-top:0.75rem; }

  .sa-empty {
    background:#fff; border:1.5px solid #e8eaf0; border-radius:18px;
    padding:4rem 2rem; text-align:center; box-shadow:0 2px 12px rgba(15,23,42,0.04);
  }
  .sa-empty-icon { font-size:3rem; margin-bottom:0.75rem; }
  .sa-empty-title { font-size:1rem; font-weight:700; color:#374151; margin-bottom:0.3rem; }
  .sa-empty-desc { font-size:0.85rem; color:#9ca3af; }

  .sa-loading { display:flex; align-items:center; justify-content:center; min-height:50vh; }
  .sa-spinner { width:40px; height:40px; border-radius:50%; border:3px solid #e5e7eb; border-top-color:#6366f1; animation:sa-spin 0.8s linear infinite; }
  @keyframes sa-spin { to { transform:rotate(360deg); } }
  .sa-error { background:#fff1f2; border:1.5px solid #fecdd3; border-radius:14px; padding:1rem 1.25rem; font-size:0.875rem; color:#dc2626; }

  @media (max-width:640px) {
    .sa-item-body { padding:1rem; }
    .sa-item-top { flex-direction:column; }
  }
`;

const fmtDate = (d) => new Date(d).toLocaleDateString('en-IN', { day:'numeric', month:'long', year:'numeric' });

const urgency = (due) => {
  const d = Math.ceil((new Date(due) - new Date()) / 86400000);
  if (d < 0)  return { label:`Overdue`,        stripe:'sa-stripe-overdue', badge:'sa-badge-overdue', emoji:'🔴' };
  if (d <= 2) return { label:`Due in ${d}d`,   stripe:'sa-stripe-urgent',  badge:'sa-badge-urgent',  emoji:'🟠' };
  if (d <= 7) return { label:`${d} days left`, stripe:'sa-stripe-soon',    badge:'sa-badge-soon',    emoji:'🟡' };
  return            { label:`${d} days left`,  stripe:'sa-stripe-ok',      badge:'sa-badge-ok',      emoji:'🟢' };
};

const StudentAssignments = () => {
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState('');

  useEffect(() => {
    (async () => {
      const token = sessionStorage.getItem('authToken');
      if (!token) { setError('No authentication token. Please log in again.'); setLoading(false); return; }
      try {
        const res = await axios.get('http://localhost:5000/api/assignments/student', { headers: { Authorization: `Bearer ${token}` } });
        if (res.data.success) setAssignments(res.data.data);
        else setError(res.data.message);
      } catch (err) {
        if (err.response?.status === 401) { sessionStorage.removeItem('authToken'); sessionStorage.removeItem('userRole'); navigate('/'); }
        else setError(err.response?.data?.message || 'Failed to load assignments');
      } finally { setLoading(false); }
    })();
  }, [navigate]);

  if (loading) return (
    <><style>{styles}</style>
    <div className="sa-root sa-loading"><div className="sa-spinner" /></div></>
  );

  if (error) return (
    <><style>{styles}</style>
    <div className="sa-root"><div className="sa-error">{error}</div></div></>
  );

  return (
    <>
      <style>{styles}</style>
      <div className="sa-root">
        <div className="sa-header">
          <div>
            <div className="sa-title">Assignments</div>
            <div className="sa-subtitle">{assignments.length} assignment{assignments.length !== 1 ? 's' : ''} posted for your courses</div>
          </div>
        </div>

        {assignments.length === 0 ? (
          <div className="sa-empty">
            <div className="sa-empty-icon">📋</div>
            <div className="sa-empty-title">No assignments yet</div>
            <div className="sa-empty-desc">Your professors haven't posted any assignments.</div>
          </div>
        ) : (
          <div className="sa-list">
            {assignments.map(assign => {
              const { label, stripe, badge, emoji } = urgency(assign.dueDate);
              return (
                <div key={assign._id} className="sa-item">
                  <div className={`sa-item-stripe ${stripe}`} />
                  <div className="sa-item-body">
                    <div className="sa-item-top">
                      <div className="sa-item-title">{assign.title}</div>
                      <span className={`sa-badge ${badge}`}>{emoji} {label}</span>
                    </div>
                    <div className="sa-meta">
                      <span>📅 Due: {fmtDate(assign.dueDate)}</span>
                      <span>📖 {assign.subject?.name || 'Subject'}</span>
                      <span>👤 {assign.createdBy?.name || 'Professor'}</span>
                    </div>
                    {assign.description && <div className="sa-desc">{assign.description}</div>}
                    {assign.attachments?.length > 0 && (
                      <div className="sa-attachments">
                        <div className="sa-att-label">Attachments</div>
                        <div className="sa-att-list">
                          {assign.attachments.map((att, idx) => (
                            <a key={idx} href={att.url} target="_blank" rel="noopener noreferrer" className="sa-att-pill">
                              ⬇ {att.originalName}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="sa-footer">Posted: {fmtDate(assign.createdAt)}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default StudentAssignments;