// src/student/StudentSyllabus.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
  .sy-root * { box-sizing: border-box; }
  .sy-root { font-family: 'Outfit', sans-serif; color: #0f172a; }

  .sy-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:1.75rem; }
  .sy-title { font-size:1.5rem; font-weight:800; color:#0f172a; letter-spacing:-0.02em; }
  .sy-subtitle { font-size:0.82rem; color:#9ca3af; margin-top:0.2rem; }

  .sy-grid { display:grid; grid-template-columns:repeat(auto-fill, minmax(260px,1fr)); gap:1rem; }

  .sy-card {
    background:#fff; border:1.5px solid #e8eaf0; border-radius:18px;
    padding:1.25rem 1.4rem; transition:all 0.25s cubic-bezier(0.34,1.56,0.64,1);
    box-shadow:0 2px 12px rgba(15,23,42,0.04); position:relative; overflow:hidden;
  }
  .sy-card::before {
    content:''; position:absolute; top:0; left:0; right:0; height:3px;
    background:linear-gradient(90deg, #6366f1, #0ea5e9); border-radius:18px 18px 0 0;
  }
  .sy-card.clickable { cursor:pointer; }
  .sy-card.clickable:hover { transform:translateY(-4px); box-shadow:0 12px 32px rgba(99,102,241,0.12); border-color:#c7d2fe; }
  .sy-card.no-syllabus { opacity:0.65; cursor:default; }
  .sy-card.no-syllabus::before { background:linear-gradient(90deg,#d1d5db,#e5e7eb); }

  .sy-card-top { display:flex; align-items:flex-start; justify-content:space-between; gap:0.75rem; margin-bottom:0.75rem; }
  .sy-card-name { font-size:0.95rem; font-weight:700; color:#0f172a; }
  .sy-card-code { font-family:'JetBrains Mono',monospace; font-size:0.72rem; color:#6b7280; background:#f3f4f6; padding:0.15rem 0.5rem; border-radius:5px; display:inline-block; margin-top:0.25rem; }
  .sy-card-sem { font-size:0.72rem; color:#9ca3af; margin-top:0.25rem; }

  .sy-eye-btn { width:30px; height:30px; border-radius:8px; background:linear-gradient(135deg,#eef2ff,#f0f9ff); border:1.5px solid #c7d2fe; display:flex; align-items:center; justify-content:center; flex-shrink:0; color:#4338ca; font-size:0.9rem; }

  .sy-preview { font-size:0.82rem; color:#6b7280; line-height:1.6; margin-top:0.5rem; display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; overflow:hidden; }
  .sy-att-count { display:flex; align-items:center; gap:0.3rem; font-size:0.72rem; color:#9ca3af; margin-top:0.6rem; }
  .sy-no-syllabus { font-size:0.82rem; color:#c4c9d4; font-style:italic; margin-top:0.5rem; }

  /* modal */
  .sy-overlay { position:fixed; inset:0; background:rgba(15,23,42,0.55); backdrop-filter:blur(4px); z-index:50; display:flex; align-items:center; justify-content:center; padding:1rem; }
  .sy-modal { background:#fff; border-radius:24px; width:100%; max-width:660px; max-height:90vh; display:flex; flex-direction:column; overflow:hidden; box-shadow:0 20px 60px rgba(15,23,42,0.2); }
  .sy-modal-header { display:flex; align-items:center; justify-content:space-between; padding:1.25rem 1.5rem; border-bottom:1.5px solid #f1f5f9; flex-shrink:0; }
  .sy-modal-title { font-size:1rem; font-weight:700; color:#0f172a; }
  .sy-modal-sub { font-size:0.75rem; color:#9ca3af; margin-top:0.1rem; }
  .sy-modal-close { width:34px; height:34px; border-radius:10px; border:1.5px solid #e8eaf0; background:#fff; cursor:pointer; display:flex; align-items:center; justify-content:center; color:#6b7280; font-size:1.1rem; transition:all 0.15s; flex-shrink:0; }
  .sy-modal-close:hover { background:#fee2e2; border-color:#fecdd3; color:#dc2626; }
  .sy-modal-body { padding:1.5rem; overflow-y:auto; flex:1; }

  .sy-section-title { font-size:0.72rem; font-weight:700; color:#6366f1; letter-spacing:0.07em; text-transform:uppercase; margin-bottom:0.75rem; display:flex; align-items:center; gap:0.4rem; }
  .sy-section-title::before { content:''; width:3px; height:12px; border-radius:99px; background:linear-gradient(180deg,#6366f1,#0ea5e9); flex-shrink:0; }
  .sy-content-box { background:#f8fafc; border:1.5px solid #f1f5f9; border-radius:12px; padding:1.1rem; font-size:0.875rem; color:#374151; line-height:1.7; white-space:pre-wrap; margin-bottom:1.25rem; }

  .sy-att-grid { display:flex; flex-direction:column; gap:0.5rem; }
  .sy-att-item {
    display:flex; align-items:center; gap:0.6rem;
    background:#f8fafc; border:1.5px solid #e8eaf0; border-radius:10px;
    padding:0.6rem 0.9rem; text-decoration:none; color:#374151;
    font-size:0.82rem; font-weight:500; transition:all 0.15s;
  }
  .sy-att-item:hover { background:#eef2ff; border-color:#c7d2fe; color:#4338ca; }

  .sy-empty { background:#fff; border:1.5px solid #e8eaf0; border-radius:18px; padding:4rem 2rem; text-align:center; box-shadow:0 2px 12px rgba(15,23,42,0.04); }
  .sy-empty-icon { font-size:3rem; margin-bottom:0.75rem; }
  .sy-empty-title { font-size:1rem; font-weight:700; color:#374151; margin-bottom:0.3rem; }
  .sy-empty-desc { font-size:0.85rem; color:#9ca3af; }

  .sy-error { background:#fff1f2; border:1.5px solid #fecdd3; border-radius:14px; padding:1rem 1.25rem; font-size:0.875rem; color:#dc2626; }
  .sy-loading { display:flex; align-items:center; justify-content:center; min-height:50vh; gap:1rem; }
  .sy-spinner { width:40px; height:40px; border-radius:50%; border:3px solid #e5e7eb; border-top-color:#6366f1; animation:sy-spin 0.8s linear infinite; }
  @keyframes sy-spin { to { transform:rotate(360deg); } }

  @media (max-width:640px) {
    .sy-grid { grid-template-columns:1fr; }
    .sy-modal { border-radius:18px; }
    .sy-modal-body { padding:1rem; }
  }
`;

const StudentSyllabus = () => {
  const [subjects, setSubjects]             = useState([]);
  const [loading, setLoading]               = useState(false);
  const [error, setError]                   = useState('');
  const [modalOpen, setModalOpen]           = useState(false);
  const [selectedSyllabus, setSelectedSyllabus] = useState(null);
  const [selectedSubjectName, setSelectedSubjectName] = useState('');

  const token    = sessionStorage.getItem('authToken');
  const userRole = sessionStorage.getItem('userRole');
  const userData = JSON.parse(sessionStorage.getItem('userData') || '{}');

  const api = axios.create({ baseURL:'https://cms-backend-wl7u.onrender.com/api', headers:{ Authorization:`Bearer ${token}` } });

  useEffect(() => {
    if (!token || userRole !== 'student') { setError('Access denied. Please log in as a student.'); return; }
    const semesterId = userData.semesterID;
    if (!semesterId) { setError('Student semester information not found. Please contact admin.'); return; }
    fetchSubjects(semesterId);
  }, []);

  const fetchSubjects = async (semesterId) => {
    try {
      setLoading(true);
      const { data } = await api.get(`/syllabus/student/semester/${semesterId}`);
      if (data.success) setSubjects(data.data);
      else setSubjects([]);
    } catch { setError('Failed to load subjects'); }
    finally { setLoading(false); }
  };

  const openModal = (item) => {
    if (!item.syllabus) return;
    setSelectedSyllabus(item.syllabus);
    setSelectedSubjectName(item.subject.name);
    setModalOpen(true);
  };

  if (loading) return (
    <><style>{styles}</style>
    <div className="sy-root sy-loading"><div className="sy-spinner" /></div></>
  );

  if (error) return (
    <><style>{styles}</style>
    <div className="sy-root"><div className="sy-error">{error}</div></div></>
  );

  return (
    <>
      <style>{styles}</style>
      <div className="sy-root">
        <div className="sy-header">
          <div>
            <div className="sy-title">Syllabus</div>
            <div className="sy-subtitle">{subjects.length} subject{subjects.length !== 1 ? 's' : ''} for your current semester</div>
          </div>
        </div>

        {subjects.length === 0 ? (
          <div className="sy-empty">
            <div className="sy-empty-icon">📚</div>
            <div className="sy-empty-title">No subjects found</div>
            <div className="sy-empty-desc">No subjects have been added for your semester yet.</div>
          </div>
        ) : (
          <div className="sy-grid">
            {subjects.map((item) => {
              const has = !!item.syllabus;
              return (
                <div key={item.subject.id} className={`sy-card ${has ? 'clickable' : 'no-syllabus'}`} onClick={() => has && openModal(item)}>
                  <div className="sy-card-top">
                    <div>
                      <div className="sy-card-name">{item.subject.name}</div>
                      <span className="sy-card-code">{item.subject.code}</span>
                      <div className="sy-card-sem">{item.subject.semester?.semesterName}</div>
                    </div>
                    {has && <div className="sy-eye-btn">👁</div>}
                  </div>
                  {has ? (
                    <>
                      <div className="sy-preview">{item.syllabus.content}</div>
                      {item.syllabus.attachments?.length > 0 && (
                        <div className="sy-att-count">📎 {item.syllabus.attachments.length} attachment{item.syllabus.attachments.length > 1 ? 's' : ''}</div>
                      )}
                    </>
                  ) : (
                    <div className="sy-no-syllabus">No syllabus uploaded yet</div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Modal */}
        {modalOpen && selectedSyllabus && (
          <div className="sy-overlay" onClick={() => setModalOpen(false)}>
            <div className="sy-modal" onClick={e => e.stopPropagation()}>
              <div className="sy-modal-header">
                <div>
                  <div className="sy-modal-title">{selectedSubjectName}</div>
                  <div className="sy-modal-sub">Syllabus Details</div>
                </div>
                <button className="sy-modal-close" onClick={() => setModalOpen(false)}>✕</button>
              </div>
              <div className="sy-modal-body">
                <div className="sy-section-title">Content</div>
                <div className="sy-content-box">{selectedSyllabus.content || 'No content provided.'}</div>
                {selectedSyllabus.attachments?.length > 0 && (
                  <>
                    <div className="sy-section-title">Attachments</div>
                    <div className="sy-att-grid">
                      {selectedSyllabus.attachments.map((url, idx) => (
                        <a key={idx} href={url} target="_blank" rel="noopener noreferrer" className="sy-att-item">
                          📄 <span style={{overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{url.split('/').pop()}</span>
                        </a>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default StudentSyllabus;
