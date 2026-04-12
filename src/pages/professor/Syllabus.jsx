import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Eye, Edit2, Trash2, Plus, X, FileText, Loader2, CheckCircle } from 'lucide-react';

/* ─── Styles ─────────────────────────────────────────────── */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

  .ps-root * { box-sizing: border-box; }
  .ps-root { font-family: 'Outfit', sans-serif; color: #0f172a; }

  /* ── header ── */
  .ps-header { margin-bottom: 2rem; }
  .ps-header-title {
    font-size: 1.75rem; font-weight: 800; color: #0f172a;
    letter-spacing: -0.02em; margin-bottom: 0.25rem;
    display: flex; align-items: center; gap: 0.65rem;
  }
  .ps-header-title::before {
    content: ''; width: 4px; height: 28px; border-radius: 99px;
    background: linear-gradient(180deg, #6366f1, #0ea5e9); flex-shrink: 0;
  }
  .ps-header-sub { color: #9ca3af; font-size: 0.875rem; font-weight: 400; margin-left: 0.65rem; }

  /* ── toast ── */
  .ps-toast {
    position: fixed; top: 1.25rem; right: 1.25rem; z-index: 200;
    display: flex; align-items: center; gap: 0.65rem;
    background: #0f172a; color: #4ade80;
    border: 1px solid rgba(74,222,128,0.3);
    padding: 0.75rem 1.25rem; border-radius: 12px;
    font-size: 0.875rem; font-weight: 600;
    box-shadow: 0 8px 30px rgba(0,0,0,0.2);
    animation: ps-slidein 0.3s ease both;
  }
  @keyframes ps-slidein { from{opacity:0;transform:translateY(-12px)} to{opacity:1;transform:none} }

  /* ── grid ── */
  .ps-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.25rem; }

  /* ── subject card ── */
  .ps-card {
    background: #fff; border: 1.5px solid #e8eaf0;
    border-radius: 18px; padding: 1.5rem;
    box-shadow: 0 2px 12px rgba(15,23,42,0.04);
    transition: all 0.2s cubic-bezier(0.34,1.56,0.64,1);
    position: relative; overflow: hidden;
    display: flex; flex-direction: column;
  }
  .ps-card:hover { transform: translateY(-3px); box-shadow: 0 10px 30px rgba(15,23,42,0.09); border-color: #c7d2fe; }
  .ps-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
    border-radius: 18px 18px 0 0;
    background: linear-gradient(90deg, #6366f1, #0ea5e9);
  }
  .ps-card.has-syllabus::before { background: linear-gradient(90deg, #22c55e, #0ea5e9); }
  .ps-card.no-syllabus::before { background: linear-gradient(90deg, #f59e0b, #ef4444); }

  .ps-card-top { margin-bottom: 0.75rem; }
  .ps-card-name { font-size: 1rem; font-weight: 700; color: #0f172a; margin-bottom: 0.25rem; line-height: 1.3; }
  .ps-card-code {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.72rem; font-weight: 500;
    color: #6b7280; background: #f3f4f6;
    padding: 0.15rem 0.55rem; border-radius: 5px;
    display: inline-block; margin-bottom: 0.35rem;
  }
  .ps-card-semester { font-size: 0.78rem; color: #9ca3af; }

  .ps-card-body { flex: 1; margin-bottom: 1rem; }
  .ps-syllabus-preview {
    font-size: 0.8rem; color: #6b7280; line-height: 1.5;
    display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
    margin-bottom: 0.4rem;
  }
  .ps-attachment-count {
    display: inline-flex; align-items: center; gap: 0.3rem;
    font-size: 0.72rem; color: #6366f1; font-weight: 600;
    background: #eef2ff; padding: 0.15rem 0.55rem; border-radius: 5px;
  }

  .ps-no-syllabus {
    display: flex; align-items: center; gap: 0.5rem;
    padding: 0.65rem 0.85rem; border-radius: 10px;
    background: #fffbeb; border: 1px dashed #fcd34d;
    color: #92400e; font-size: 0.78rem; font-weight: 500;
    margin-bottom: 1rem;
  }

  /* ── card action buttons ── */
  .ps-btn-row { display: flex; gap: 0.5rem; }
  .ps-btn {
    flex: 1; display: flex; align-items: center; justify-content: center; gap: 0.35rem;
    padding: 0.5rem 0.5rem; border-radius: 10px; border: none; cursor: pointer;
    font-size: 0.78rem; font-weight: 600; font-family: 'Outfit', sans-serif;
    transition: all 0.15s;
  }
  .ps-btn-view   { background: #eef2ff; color: #4338ca; }
  .ps-btn-view:hover   { background: #e0e7ff; }
  .ps-btn-edit   { background: #fefce8; color: #92400e; }
  .ps-btn-edit:hover   { background: #fef3c7; }
  .ps-btn-delete { background: #fff5f5; color: #991b1b; }
  .ps-btn-delete:hover { background: #fee2e2; }
  .ps-btn-add    { background: linear-gradient(135deg, #6366f1, #0ea5e9); color: #fff; box-shadow: 0 3px 12px rgba(99,102,241,0.3); }
  .ps-btn-add:hover    { box-shadow: 0 5px 18px rgba(99,102,241,0.4); transform: translateY(-1px); }
  .ps-btn:disabled { opacity: 0.55; cursor: not-allowed; transform: none !important; }

  /* ── modal backdrop ── */
  .ps-modal-backdrop {
    position: fixed; inset: 0;
    background: rgba(0,0,0,0.55); backdrop-filter: blur(4px);
    display: flex; align-items: center; justify-content: center;
    z-index: 150; padding: 1rem;
    animation: ps-fade 0.2s ease both;
  }
  @keyframes ps-fade { from{opacity:0} to{opacity:1} }

  /* ── modal box ── */
  .ps-modal {
    background: #fff; border-radius: 22px;
    width: 100%; max-width: 680px; max-height: 90vh; overflow-y: auto;
    box-shadow: 0 20px 60px rgba(0,0,0,0.25);
    animation: ps-popin 0.25s cubic-bezier(0.34,1.56,0.64,1) both;
  }
  @keyframes ps-popin { from{opacity:0;transform:scale(0.94)} to{opacity:1;transform:none} }
  .ps-modal::-webkit-scrollbar { width:4px; }
  .ps-modal::-webkit-scrollbar-thumb { background:#c7d2fe; border-radius:99px; }

  .ps-modal-header {
    position: sticky; top: 0; background: #fff;
    border-bottom: 1.5px solid #f1f5f9;
    padding: 1.25rem 1.5rem;
    display: flex; justify-content: space-between; align-items: flex-start;
    border-radius: 22px 22px 0 0;
    z-index: 1;
  }
  .ps-modal-title { font-size: 1.15rem; font-weight: 700; color: #0f172a; }
  .ps-modal-subtitle { font-size: 0.78rem; color: #9ca3af; margin-top: 0.15rem; }
  .ps-modal-close {
    width:34px; height:34px; border-radius:9px; border:none;
    background:#f3f4f6; cursor:pointer; display:flex; align-items:center; justify-content:center;
    color:#6b7280; transition:all 0.15s; flex-shrink:0;
  }
  .ps-modal-close:hover { background:#e5e7eb; color:#0f172a; }

  .ps-modal-body { padding: 1.5rem; }

  /* view mode */
  .ps-view-label { font-size:0.72rem; font-weight:700; color:#6366f1; text-transform:uppercase; letter-spacing:0.06em; margin-bottom:0.5rem; }
  .ps-view-content {
    background:#f8faff; border:1.5px solid #e8eaf0; border-radius:12px;
    padding:1rem 1.25rem; white-space:pre-wrap; font-size:0.875rem;
    color:#374151; line-height:1.65; margin-bottom:1.25rem; max-height:280px; overflow-y:auto;
  }
  .ps-attachment-link {
    display:flex; align-items:center; gap:0.5rem;
    padding:0.5rem 0.75rem; border-radius:8px;
    background:#eef2ff; color:#4338ca;
    font-size:0.8rem; font-weight:500; text-decoration:none; margin-bottom:0.4rem;
    transition:background 0.15s;
  }
  .ps-attachment-link:hover { background:#e0e7ff; }

  /* form */
  .ps-form-label { display:block; font-size:0.78rem; font-weight:700; color:#374151; margin-bottom:0.4rem; }
  .ps-textarea {
    width:100%; border:2px solid #e5e7eb; border-radius:12px;
    padding:0.85rem 1rem; font-family:'Outfit',sans-serif; font-size:0.875rem;
    color:#374151; outline:none; resize:vertical; transition:border-color 0.2s;
    line-height:1.55;
  }
  .ps-textarea:focus { border-color:#6366f1; }

  .ps-file-item {
    display:flex; align-items:center; justify-content:space-between;
    padding:0.5rem 0.75rem; border-radius:8px; margin-bottom:0.35rem;
    font-size:0.8rem;
  }
  .ps-file-item.existing { background:#f8faff; border:1px solid #e8eaf0; color:#374151; }
  .ps-file-item.new      { background:#eef2ff; border:1px solid #c7d2fe; color:#4338ca; }
  .ps-file-remove {
    background:none; border:none; cursor:pointer; color:#9ca3af;
    display:flex; align-items:center; padding:0.1rem; transition:color 0.15s;
  }
  .ps-file-remove:hover { color:#dc2626; }

  .ps-file-hint { font-size:0.72rem; color:#9ca3af; margin-top:0.35rem; }

  .ps-modal-footer {
    display:flex; justify-content:flex-end; gap:0.65rem;
    padding-top:1.25rem; border-top:1.5px solid #f1f5f9; margin-top:1.25rem;
  }
  .ps-modal-cancel {
    padding:0.55rem 1.25rem; border:2px solid #e5e7eb; border-radius:10px;
    background:#fff; color:#6b7280; font-size:0.875rem; font-weight:600;
    font-family:'Outfit',sans-serif; cursor:pointer; transition:all 0.15s;
  }
  .ps-modal-cancel:hover { background:#f3f4f6; }
  .ps-modal-save {
    display:flex; align-items:center; gap:0.4rem;
    padding:0.55rem 1.5rem; border:none; border-radius:10px;
    background:linear-gradient(135deg, #6366f1, #0ea5e9); color:#fff;
    font-size:0.875rem; font-weight:600; font-family:'Outfit',sans-serif;
    cursor:pointer; transition:all 0.2s;
    box-shadow:0 3px 12px rgba(99,102,241,0.35);
  }
  .ps-modal-save:hover { box-shadow:0 5px 18px rgba(99,102,241,0.45); transform:translateY(-1px); }
  .ps-modal-save:disabled { opacity:0.55; cursor:not-allowed; transform:none; box-shadow:none; }

  /* loading / error states */
  .ps-state { display:flex; align-items:center; justify-content:center; min-height:40vh; flex-direction:column; gap:1rem; }
  .ps-spinner { width:42px; height:42px; border-radius:50%; border:3px solid #e5e7eb; border-top-color:#6366f1; animation:ph-spin 0.8s linear infinite; }
  @keyframes ph-spin { to{transform:rotate(360deg)} }

  /* ── responsive ── */
  @media (max-width:768px) {
    .ps-grid { grid-template-columns:1fr 1fr; gap:1rem; }
    .ps-modal { border-radius:18px; }
    .ps-modal-header { padding:1rem 1.25rem; }
    .ps-modal-body { padding:1.25rem; }
  }
  @media (max-width:560px) {
    .ps-grid { grid-template-columns:1fr; }
    .ps-btn-row { flex-wrap:wrap; }
    .ps-btn { min-width:calc(50% - 0.25rem); }
    .ps-btn-add { min-width:100%; }
    .ps-modal { max-height:95vh; border-radius:16px 16px 0 0; margin-top:auto; }
    .ps-toast { left:1rem; right:1rem; top:auto; bottom:1rem; }
  }
  @media (max-width:480px) {
    .ps-header-title { font-size:1.4rem; }
    .ps-card { padding:1.15rem; }
  }
`;

const ProfessorSyllabus = () => {
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState({});
  const [uploading, setUploading] = useState({});
  const [deleting, setDeleting] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('view');
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [formData, setFormData] = useState({ content: '', attachments: [] });
  const [tempFiles, setTempFiles] = useState([]);

  const fileInputRef = useRef(null);

  const token = sessionStorage.getItem('authToken');
  const userRole = sessionStorage.getItem('userRole');
  const userData = JSON.parse(sessionStorage.getItem('userData') || '{}');

  const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: { Authorization: `Bearer ${token}` },
  });

  useEffect(() => {
    if (!token) { setError('No authentication token. Please log in.'); setLoading(false); return; }
    if (userRole !== 'professor') {
      setError(`Access denied: Only professors can manage syllabus.`);
      setLoading(false);
      setTimeout(() => navigate('/professor/dashboard'), 3000);
      return;
    }
    if (!userData.email) { setError('User email missing. Please log in again.'); setLoading(false); return; }
    fetchSubjects();
  }, [token, userRole, userData.email]);

  const fetchSubjects = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(`/professor/profile/${userData.email}`);
      if (!data.success) throw new Error(data.message);
      const professor = data.data;
      if (!professor.coursesTaught || professor.coursesTaught.length === 0) { setSubjects([]); setLoading(false); return; }
      const subjectsWithSyllabus = await Promise.all(
        professor.coursesTaught.map(async (subject) => {
          try {
            const syllabusRes = await api.get(`/syllabus/subject/${subject._id}`);
            if (syllabusRes.data.success) return { ...subject, syllabus: syllabusRes.data.data };
          } catch (err) {}
          return { ...subject, syllabus: null };
        })
      );
      setSubjects(subjectsWithSyllabus);
    } catch (err) {
      setError(err.message || 'Failed to load subjects');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (files) => {
    const uploadPromises = Array.from(files).map(async (file) => {
      const fd = new FormData(); fd.append('file', file);
      const { data } = await api.post('/upload', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      return data.url;
    });
    try { return await Promise.all(uploadPromises); }
    catch (err) { alert('Some files failed to upload'); return []; }
  };

  const openModal = (subject, mode) => {
    setSelectedSubject(subject); setModalMode(mode);
    if (mode === 'add') { setFormData({ content: '', attachments: [] }); setTempFiles([]); }
    else if (mode === 'edit') { setFormData({ content: subject.syllabus?.content || '', attachments: subject.syllabus?.attachments || [] }); setTempFiles([]); }
    else { setFormData({ content: subject.syllabus?.content || '', attachments: subject.syllabus?.attachments || [] }); }
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false); setSelectedSubject(null);
    setFormData({ content: '', attachments: [] }); setTempFiles([]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    if (!selectedSubject) return;
    setSaving(prev => ({ ...prev, [selectedSubject._id]: true }));
    let allAttachments = [...formData.attachments];
    if (tempFiles.length > 0) { const newUrls = await handleFileUpload(tempFiles); allAttachments = [...allAttachments, ...newUrls]; setTempFiles([]); }
    const payload = { content: formData.content, attachments: allAttachments };
    try {
      const { data } = await api.post(`/syllabus/subject/${selectedSubject._id}`, payload);
      if (data.success) {
        setSubjects(prev => prev.map(subj => subj._id === selectedSubject._id ? { ...subj, syllabus: data.data } : subj));
        setSuccessMessage(`Syllabus for ${selectedSubject.name} saved!`);
        setTimeout(() => setSuccessMessage(''), 3000);
        closeModal();
      } else { alert(data.message || 'Save failed'); }
    } catch (err) { alert(err.response?.data?.message || 'Error saving syllabus'); }
    finally { setSaving(prev => ({ ...prev, [selectedSubject._id]: false })); }
  };

  const handleDelete = async (subject) => {
    if (!window.confirm(`Delete syllabus for ${subject.name}? This cannot be undone.`)) return;
    setDeleting(prev => ({ ...prev, [subject._id]: true }));
    try {
      const { data } = await api.delete(`/syllabus/subject/${subject._id}`);
      if (data.success) {
        setSubjects(prev => prev.map(subj => subj._id === subject._id ? { ...subj, syllabus: null } : subj));
        setSuccessMessage(`Syllabus for ${subject.name} deleted.`);
        setTimeout(() => setSuccessMessage(''), 3000);
      } else { alert(data.message || 'Delete failed'); }
    } catch (err) { alert(err.response?.data?.message || 'Error deleting syllabus'); }
    finally { setDeleting(prev => ({ ...prev, [subject._id]: false })); }
  };

  const handleTempFiles = (files) => { setTempFiles(Array.from(files)); };
  const removeAttachment = (urlToRemove) => { setFormData(prev => ({ ...prev, attachments: prev.attachments.filter(url => url !== urlToRemove) })); };
  const removeTempFile = (index) => { setTempFiles(prev => prev.filter((_, i) => i !== index)); };

  if (loading) return <><style>{styles}</style><div className="ps-root ps-state"><div className="ps-spinner" /><span style={{ color:'#9ca3af', fontSize:'0.9rem' }}>Loading subjects…</span></div></>;
  if (error) return <><style>{styles}</style><div className="ps-root ps-state"><p style={{ color:'#dc2626', fontWeight:500 }}>{error}</p></div></>;
  if (subjects.length === 0) return <><style>{styles}</style><div className="ps-root ps-state"><p style={{ color:'#9ca3af' }}>No subjects assigned to you. Please contact admin.</p></div></>;

  return (
    <>
      <style>{styles}</style>
      <div className="ps-root">

        {/* Header */}
        <div className="ps-header">
          <div className="ps-header-title">Syllabus Management</div>
          <p className="ps-header-sub">{subjects.length} subject{subjects.length !== 1 ? 's' : ''} assigned</p>
        </div>

        {/* Toast */}
        {successMessage && (
          <div className="ps-toast">
            <CheckCircle size={18} />
            {successMessage}
          </div>
        )}

        {/* Cards Grid */}
        <div className="ps-grid">
          {subjects.map(subject => (
            <div key={subject._id} className={`ps-card ${subject.syllabus ? 'has-syllabus' : 'no-syllabus'}`}>
              <div className="ps-card-top">
                <div className="ps-card-name">{subject.name}</div>
                <span className="ps-card-code">{subject.code}</span>
                <div className="ps-card-semester">{subject.semester?.semesterName || 'N/A'}</div>
              </div>

              <div className="ps-card-body">
                {subject.syllabus ? (
                  <>
                    <div className="ps-syllabus-preview">{subject.syllabus.content}</div>
                    {subject.syllabus.attachments.length > 0 && (
                      <span className="ps-attachment-count">
                        <FileText size={11} /> {subject.syllabus.attachments.length} file{subject.syllabus.attachments.length !== 1 ? 's' : ''}
                      </span>
                    )}
                  </>
                ) : (
                  <div className="ps-no-syllabus">
                    <FileText size={14} /> No syllabus added yet
                  </div>
                )}
              </div>

              <div className="ps-btn-row">
                {subject.syllabus ? (
                  <>
                    <button className="ps-btn ps-btn-view" onClick={() => openModal(subject, 'view')}>
                      <Eye size={14} /> View
                    </button>
                    <button className="ps-btn ps-btn-edit" onClick={() => openModal(subject, 'edit')}>
                      <Edit2 size={14} /> Edit
                    </button>
                    <button className="ps-btn ps-btn-delete" onClick={() => handleDelete(subject)} disabled={deleting[subject._id]}>
                      {deleting[subject._id] ? <Loader2 size={14} className="animate-spin" /> : <><Trash2 size={14} /> Del</>}
                    </button>
                  </>
                ) : (
                  <button className="ps-btn ps-btn-add" onClick={() => openModal(subject, 'add')}>
                    <Plus size={14} /> Add Syllabus
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {modalOpen && selectedSubject && (
          <div className="ps-modal-backdrop" onClick={closeModal}>
            <div className="ps-modal" onClick={e => e.stopPropagation()}>
              <div className="ps-modal-header">
                <div>
                  <div className="ps-modal-title">
                    {modalMode === 'view' ? 'View Syllabus' : modalMode === 'edit' ? 'Edit Syllabus' : 'Add Syllabus'}
                  </div>
                  <div className="ps-modal-subtitle">{selectedSubject.name} · {selectedSubject.code}</div>
                </div>
                <button className="ps-modal-close" onClick={closeModal}><X size={18} /></button>
              </div>

              <div className="ps-modal-body">
                {modalMode === 'view' ? (
                  <>
                    <div className="ps-view-label">Syllabus Content</div>
                    <div className="ps-view-content">{formData.content || 'No content provided.'}</div>
                    {formData.attachments.length > 0 && (
                      <>
                        <div className="ps-view-label">Attachments</div>
                        {formData.attachments.map((url, idx) => (
                          <a key={idx} href={url} target="_blank" rel="noopener noreferrer" className="ps-attachment-link">
                            <FileText size={14} /> {url.split('/').pop()}
                          </a>
                        ))}
                      </>
                    )}
                  </>
                ) : (
                  <form onSubmit={handleAddOrUpdate}>
                    <div style={{ marginBottom:'1.25rem' }}>
                      <label className="ps-form-label">Syllabus Content *</label>
                      <textarea
                        rows="8" className="ps-textarea"
                        value={formData.content}
                        onChange={e => setFormData(prev => ({ ...prev, content: e.target.value }))}
                        placeholder="Enter syllabus details (week-wise topics, etc.)"
                        required
                      />
                    </div>

                    <div style={{ marginBottom:'1.25rem' }}>
                      <label className="ps-form-label">Attachments</label>
                      {formData.attachments.map((url, idx) => (
                        <div key={idx} className="ps-file-item existing">
                          <div style={{ display:'flex', alignItems:'center', gap:'0.4rem' }}>
                            <FileText size={13} />
                            <span style={{ overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', maxWidth:'280px' }}>{url.split('/').pop()}</span>
                          </div>
                          <button type="button" className="ps-file-remove" onClick={() => removeAttachment(url)}><X size={13} /></button>
                        </div>
                      ))}
                      {tempFiles.map((file, idx) => (
                        <div key={idx} className="ps-file-item new">
                          <div style={{ display:'flex', alignItems:'center', gap:'0.4rem' }}>
                            <FileText size={13} /> <span>{file.name}</span>
                          </div>
                          <button type="button" className="ps-file-remove" onClick={() => removeTempFile(idx)}><X size={13} /></button>
                        </div>
                      ))}
                      <input
                        type="file" multiple ref={fileInputRef} style={{ marginTop:'0.5rem', width:'100%' }}
                        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.ppt,.pptx"
                        onChange={e => { if (e.target.files.length) handleTempFiles(e.target.files); e.target.value = ''; }}
                      />
                      <p className="ps-file-hint">Supported: PDF, Images, Word, PowerPoint (max 10MB each)</p>
                    </div>

                    <div className="ps-modal-footer">
                      <button type="button" className="ps-modal-cancel" onClick={closeModal}>Cancel</button>
                      <button type="submit" className="ps-modal-save" disabled={saving[selectedSubject._id]}>
                        {saving[selectedSubject._id] && <Loader2 size={15} className="animate-spin" />}
                        {saving[selectedSubject._id] ? 'Saving…' : (modalMode === 'edit' ? 'Update Syllabus' : 'Create Syllabus')}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
};

export default ProfessorSyllabus;