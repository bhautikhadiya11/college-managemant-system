// src/student/StudentHome.jsx
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

/* ─── Styles — mirrors ProfessorHome exactly ───────────────────────────── */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=DM+Serif+Display:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap');

  .sh-root * { box-sizing: border-box; }
  .sh-root { font-family: 'Outfit', sans-serif; color: #0f172a; }

  .sh-center { display:flex; align-items:center; justify-content:center; min-height:60vh; flex-direction:column; gap:1rem; }
  .sh-spinner { width:48px; height:48px; border-radius:50%; border:3px solid #e5e7eb; border-top-color:#6366f1; animation:sh-spin 0.8s linear infinite; }
  @keyframes sh-spin { to { transform:rotate(360deg); } }
  .sh-load-text { color:#9ca3af; font-size:0.9rem; font-weight:500; }

  /* ── hero ── */
  .sh-hero {
    position:relative; overflow:hidden; border-radius:24px; margin-bottom:2rem;
    background:linear-gradient(135deg, #0f172a 0%, #1e1b4b 45%, #1e3a5f 100%);
    box-shadow:0 8px 40px rgba(15,23,42,0.2); padding:2.5rem 2.5rem 2rem;
  }
  .sh-hero::before {
    content:''; position:absolute; inset:0;
    background:url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.025'%3E%3Ccircle cx='40' cy='40' r='20'/%3E%3Ccircle cx='0' cy='0' r='20'/%3E%3Ccircle cx='80' cy='80' r='20'/%3E%3C/g%3E%3C/svg%3E");
    pointer-events:none;
  }
  .sh-hero::after {
    content:''; position:absolute; width:320px; height:320px; border-radius:50%;
    background:radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%);
    top:-100px; right:-80px; pointer-events:none;
  }
  .sh-hero-inner { position:relative; z-index:1; }
  .sh-hero-top { display:flex; align-items:flex-start; justify-content:space-between; flex-wrap:wrap; gap:1.5rem; margin-bottom:2rem; }

  .sh-avatar-row { display:flex; align-items:center; gap:1.5rem; }
  .sh-avatar {
    width:72px; height:72px; border-radius:20px;
    background:linear-gradient(135deg, #6366f1, #0ea5e9);
    display:flex; align-items:center; justify-content:center;
    font-family:'DM Serif Display',serif; font-size:2rem; color:#fff; flex-shrink:0;
    box-shadow:0 6px 24px rgba(99,102,241,0.4); overflow:hidden;
  }
  .sh-avatar img { width:100%; height:100%; object-fit:cover; }
  .sh-hero-name { font-family:'DM Serif Display',serif; font-size:1.85rem; color:#fff; letter-spacing:-0.02em; line-height:1; margin-bottom:0.3rem; }
  .sh-hero-email { color:rgba(148,163,184,0.85); font-size:0.85rem; margin-bottom:0.6rem; }
  .sh-status-pill {
    display:inline-flex; align-items:center; gap:0.35rem;
    background:rgba(34,197,94,0.15); border:1px solid rgba(34,197,94,0.3);
    color:#4ade80; font-size:0.72rem; font-weight:600; padding:0.2rem 0.7rem; border-radius:50px;
  }
  .sh-status-dot { width:6px; height:6px; border-radius:50%; background:#4ade80; }

  .sh-hero-actions { display:flex; gap:0.65rem; align-items:flex-start; flex-wrap:wrap; }
  .sh-btn-outline {
    display:flex; align-items:center; gap:0.4rem; padding:0.5rem 1.1rem; border-radius:10px;
    border:1.5px solid rgba(255,255,255,0.2); background:rgba(255,255,255,0.06);
    color:rgba(255,255,255,0.85); font-size:0.82rem; font-weight:600;
    cursor:pointer; transition:all 0.2s; font-family:'Outfit',sans-serif;
  }
  .sh-btn-outline:hover { background:rgba(255,255,255,0.12); border-color:rgba(255,255,255,0.35); }
  .sh-btn-danger {
    display:flex; align-items:center; gap:0.4rem; padding:0.5rem 1.1rem; border-radius:10px;
    border:1.5px solid rgba(239,68,68,0.4); background:rgba(239,68,68,0.1);
    color:#f87171; font-size:0.82rem; font-weight:600;
    cursor:pointer; transition:all 0.2s; font-family:'Outfit',sans-serif;
  }
  .sh-btn-danger:hover { background:rgba(239,68,68,0.2); }

  .sh-hero-stats { display:grid; grid-template-columns:repeat(4,1fr); gap:0; }
  .sh-hero-stat { padding:0 1.5rem 0 0; }
  .sh-hero-stat + .sh-hero-stat { padding-left:1.5rem; border-left:1px solid rgba(255,255,255,0.1); }
  .sh-stat-label { font-size:0.72rem; color:rgba(148,163,184,0.75); font-weight:500; margin-bottom:0.25rem; text-transform:uppercase; letter-spacing:0.05em; }
  .sh-stat-value { font-size:0.95rem; font-weight:700; color:#fff; }

  /* ── tabs ── */
  .sh-tabs { display:flex; gap:0.25rem; margin-bottom:1.75rem; border-bottom:1.5px solid #e8eaf0; }
  .sh-tab {
    padding:0.65rem 1.25rem; border:none; background:transparent; cursor:pointer;
    font-size:0.875rem; font-weight:500; color:#6b7280;
    font-family:'Outfit',sans-serif; border-bottom:2.5px solid transparent;
    margin-bottom:-1.5px; transition:all 0.2s;
  }
  .sh-tab:hover { color:#4338ca; }
  .sh-tab.active { color:#4338ca; border-bottom-color:#6366f1; font-weight:600; }

  /* ── card ── */
  .sh-card { background:#fff; border:1.5px solid #e8eaf0; border-radius:18px; padding:1.5rem 1.75rem; box-shadow:0 2px 12px rgba(15,23,42,0.04); }
  .sh-card-title {
    font-size:0.82rem; font-weight:700; color:#6366f1;
    letter-spacing:0.07em; text-transform:uppercase;
    margin-bottom:1.25rem; display:flex; align-items:center; gap:0.5rem;
  }
  .sh-card-title::before {
    content:''; width:3px; height:16px; border-radius:99px;
    background:linear-gradient(180deg, #6366f1, #0ea5e9); flex-shrink:0;
  }
  .sh-grid-2 { display:grid; grid-template-columns:1fr 1fr; gap:1.25rem; }

  .sh-info-row { display:flex; justify-content:space-between; align-items:center; padding:0.65rem 0; border-bottom:1px solid #f1f5f9; }
  .sh-info-row:last-child { border-bottom:none; }
  .sh-info-label { font-size:0.8rem; color:#9ca3af; font-weight:500; }
  .sh-info-value { font-size:0.875rem; font-weight:600; color:#0f172a; text-align:right; max-width:55%; word-break:break-word; }

  /* ── quick actions ── */
  .sh-actions-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:1.25rem; margin-top:2rem; }
  .sh-action-card {
    border-radius:20px; padding:1.75rem 1.5rem; cursor:pointer;
    transition:all 0.25s cubic-bezier(0.34,1.56,0.64,1);
    box-shadow:0 4px 20px rgba(0,0,0,0.08); position:relative; overflow:hidden;
  }
  .sh-action-card:hover { transform:translateY(-5px) scale(1.02); box-shadow:0 12px 35px rgba(0,0,0,0.15); }
  .sh-action-icon { font-size:2.2rem; margin-bottom:0.9rem; line-height:1; }
  .sh-action-title { font-size:1.1rem; font-weight:700; color:#fff; margin-bottom:0.35rem; }
  .sh-action-desc { font-size:0.78rem; color:rgba(255,255,255,0.75); }
  .sh-action-fees       { background:linear-gradient(135deg, #7c3aed, #6366f1); }
  .sh-action-syllabus   { background:linear-gradient(135deg, #059669, #34d399); }
  .sh-action-assignment { background:linear-gradient(135deg, #d97706, #f59e0b); }

  /* ── animations ── */
  @keyframes sh-fadeup { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:none} }
  .sh-hero { animation:sh-fadeup 0.35s ease both; }
  .sh-tabs { animation:sh-fadeup 0.4s 0.05s ease both; }
  .sh-content { animation:sh-fadeup 0.4s 0.1s ease both; }
  .sh-actions-grid { animation:sh-fadeup 0.4s 0.15s ease both; }

  /* ── responsive ── */
  @media (max-width:1024px) {
    .sh-hero-stats { grid-template-columns:repeat(2,1fr); gap:1rem; }
    .sh-hero-stat + .sh-hero-stat { border-left:none; padding-left:0; }
    .sh-hero-stat { padding:0.5rem 0; border-bottom:1px solid rgba(255,255,255,0.08); }
    .sh-hero-stat:last-child { border-bottom:none; }
  }
  @media (max-width:768px) {
    .sh-hero { padding:1.75rem 1.25rem 1.5rem; border-radius:18px; }
    .sh-hero-top { flex-direction:column; gap:1rem; }
    .sh-hero-name { font-size:1.5rem; }
    .sh-grid-2 { grid-template-columns:1fr; }
    .sh-actions-grid { grid-template-columns:1fr; gap:0.85rem; }
    .sh-tabs { overflow-x:auto; gap:0; }
    .sh-tab { white-space:nowrap; flex-shrink:0; padding:0.6rem 1rem; font-size:0.82rem; }
    .sh-card { padding:1.25rem; }
  }
  @media (max-width:480px) {
    .sh-hero { padding:1.25rem 1rem; border-radius:14px; }
    .sh-avatar { width:56px; height:56px; border-radius:14px; font-size:1.5rem; }
    .sh-hero-name { font-size:1.3rem; }
    .sh-hero-stats { grid-template-columns:1fr 1fr; gap:0.5rem; }
    .sh-hero-stat + .sh-hero-stat { border:none; padding:0; }
    .sh-hero-stat { padding:0.4rem 0.6rem; background:rgba(255,255,255,0.05); border-radius:8px; }
    .sh-hero-actions { width:100%; }
    .sh-btn-outline, .sh-btn-danger { flex:1; justify-content:center; font-size:0.78rem; padding:0.45rem 0.75rem; }
    .sh-actions-grid { margin-top:1.25rem; }
    .sh-action-card { padding:1.25rem; }
  }
`;

/* ─── Helpers ───────────────────────────────────────────────────────────── */
const fmtDate     = (d) => d ? new Date(d).toLocaleDateString('en-IN', { day:'numeric', month:'long', year:'numeric' }) : 'N/A';
const fmtDateTime = (d) => d ? new Date(d).toLocaleString('en-IN', { day:'numeric', month:'long', year:'numeric', hour:'2-digit', minute:'2-digit' }) : 'N/A';

const formatStudentData = (data) => {
  const semesterDisplay = data.semesterID?.semesterName || data.currentSemester || data.semester || 'Not Assigned';
  const departmentName  = data.department?.name || 'Not assigned';
  return {
    _id: data._id, name: data.name || 'Student',
    email: data.email || '', enrollmentNum: data.enrollmentNum || '',
    department: departmentName, departmentCode: data.department?.code || '',
    category: data.category || 'N/A', gender: data.gender || 'N/A',
    address: data.address || '', city: data.city || '', state: data.state || '',
    semester: semesterDisplay, batch: data.batch || 'N/A',
    contactNumber: data.contactNumber || 'N/A',
    dob: fmtDate(data.dob), lastLogin: fmtDateTime(data.lastLogin),
    isActive: data.isActive !== undefined ? data.isActive : true,
    profilePicture: data.profilePicture || null,
  };
};

const SHInfoRow = ({ label, value, mono }) => (
  <div className="sh-info-row">
    <span className="sh-info-label">{label}</span>
    <span className="sh-info-value" style={mono ? { fontFamily:"'JetBrains Mono',monospace", fontSize:'0.82rem' } : {}}>{value || 'N/A'}</span>
  </div>
);

/* ─── Component ─────────────────────────────────────────────────────────── */
const StudentHome = () => {
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading]         = useState(true);
  const [activeTab, setActiveTab]     = useState('overview');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => { loadStudentData(); }, []);

  const loadStudentData = async () => {
    try {
      setLoading(true);
      let enrollmentNum = null;
      if (location.state?.user) {
        const ud = location.state.user;
        localStorage.setItem('userData', JSON.stringify(ud));
        enrollmentNum = ud.enrollmentNum;
      } else {
        const stored = localStorage.getItem('userData') || localStorage.getItem('user');
        if (stored) enrollmentNum = JSON.parse(stored).enrollmentNum;
      }
      if (!enrollmentNum) { navigate('/signin'); return; }
      await fetchProfile(enrollmentNum);
    } catch { setLoading(false); }
  };

  const fetchProfile = async (enrollmentNum) => {
    try {
      const token = localStorage.getItem('authToken');
      const res   = await axios.get(`https://cms-backend-wl7u.onrender.com/api/student/profile/${enrollmentNum}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        const fd = formatStudentData(res.data.data);
        setStudentData(fd);
        localStorage.setItem('userData', JSON.stringify(fd));
      } else {
        const stored = localStorage.getItem('userData');
        if (stored) setStudentData(JSON.parse(stored));
      }
    } catch {
      const stored = localStorage.getItem('userData');
      if (stored) setStudentData(JSON.parse(stored));
    } finally { setLoading(false); }
  };

  const handleLogout           = () => { localStorage.clear(); navigate('/signin'); };
  const navigateToFees         = () => navigate('/student/fees');
  const navigateToSyllabus     = () => navigate('/student/syllabus');
  const navigateToAssignments  = () => navigate('/student/assignments');
  const navigateToChangePass   = () => navigate('/student/change-password');

  if (loading) return (
    <>
      <style>{styles}</style>
      <div className="sh-root sh-center">
        <div className="sh-spinner" />
        <span className="sh-load-text">Loading dashboard…</span>
      </div>
    </>
  );

  if (!studentData) return (
    <>
      <style>{styles}</style>
      <div className="sh-root sh-center">
        <p style={{ color:'#dc2626', marginBottom:'1rem' }}>Session expired. Please login again.</p>
        <button onClick={() => navigate('/signin')} style={{ background:'linear-gradient(135deg,#6366f1,#0ea5e9)', color:'#fff', padding:'0.6rem 1.5rem', border:'none', borderRadius:'10px', cursor:'pointer', fontFamily:'Outfit,sans-serif', fontWeight:600 }}>
          Go to Login
        </button>
      </div>
    </>
  );

  const initials = studentData.name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

  return (
    <>
      <style>{styles}</style>
      <div className="sh-root">

        {/* ── Hero Banner ── */}
        <div className="sh-hero">
          <div className="sh-hero-inner">
            <div className="sh-hero-top">
              <div className="sh-avatar-row">
                <div className="sh-avatar">
                  {studentData.profilePicture
                    ? <img src={studentData.profilePicture} alt={studentData.name} />
                    : initials
                  }
                </div>
                <div>
                  <div className="sh-hero-name">{studentData.name}</div>
                  <div className="sh-hero-email">{studentData.email}</div>
                  <span className="sh-status-pill">
                    <span className="sh-status-dot" />
                    {studentData.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
              <div className="sh-hero-actions">
                <button className="sh-btn-outline" onClick={navigateToChangePass}>Change Password</button>
                <button className="sh-btn-danger"  onClick={handleLogout}>Logout</button>
              </div>
            </div>

            <div className="sh-hero-stats">
              <div className="sh-hero-stat">
                <div className="sh-stat-label">Enrollment No.</div>
                <div className="sh-stat-value" style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'0.82rem' }}>{studentData.enrollmentNum}</div>
              </div>
              <div className="sh-hero-stat">
                <div className="sh-stat-label">Department</div>
                <div className="sh-stat-value">{studentData.department}</div>
              </div>
              <div className="sh-hero-stat">
                <div className="sh-stat-label">Semester</div>
                <div className="sh-stat-value">{studentData.semester}</div>
              </div>
              <div className="sh-hero-stat">
                <div className="sh-stat-label">Batch</div>
                <div className="sh-stat-value">{studentData.batch}</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Tabs ── */}
        <div className="sh-tabs">
          {[['overview','Overview'], ['academic','Academic'], ['personal','Personal']].map(([key, label]) => (
            <button key={key} onClick={() => setActiveTab(key)} className={`sh-tab${activeTab === key ? ' active' : ''}`}>
              {label}
            </button>
          ))}
        </div>

        {/* ── Tab Content ── */}
        <div className="sh-content">
          {activeTab === 'overview' && (
            <div className="sh-grid-2">
              <div className="sh-card">
                <div className="sh-card-title">Academic Information</div>
                <SHInfoRow label="Department"       value={studentData.department} />
                <SHInfoRow label="Current Semester" value={studentData.semester} />
                <SHInfoRow label="Batch"            value={studentData.batch} />
                <SHInfoRow label="Enrollment No."   value={studentData.enrollmentNum} mono />
              </div>
              <div className="sh-card">
                <div className="sh-card-title">Personal Information</div>
                <SHInfoRow label="Full Name"  value={studentData.name} />
                <SHInfoRow label="Email"      value={studentData.email} />
                <SHInfoRow label="Contact"    value={studentData.contactNumber} />
                <SHInfoRow label="Gender"     value={studentData.gender} />
                <SHInfoRow label="Last Login" value={studentData.lastLogin} />
              </div>
            </div>
          )}

          {activeTab === 'academic' && (
            <div className="sh-card">
              <div className="sh-card-title">Academic Details</div>
              <SHInfoRow label="Department"       value={studentData.department} />
              <SHInfoRow label="Department Code"  value={studentData.departmentCode} mono />
              <SHInfoRow label="Current Semester" value={studentData.semester} />
              <SHInfoRow label="Batch"            value={studentData.batch} />
              <SHInfoRow label="Enrollment No."   value={studentData.enrollmentNum} mono />
              <SHInfoRow label="Status"           value={studentData.isActive ? 'Active' : 'Inactive'} />
            </div>
          )}

          {activeTab === 'personal' && (
            <div className="sh-grid-2">
              <div className="sh-card">
                <div className="sh-card-title">Personal Details</div>
                <SHInfoRow label="Full Name"    value={studentData.name} />
                <SHInfoRow label="Email"        value={studentData.email} />
                <SHInfoRow label="Contact"      value={studentData.contactNumber} />
                <SHInfoRow label="Date of Birth" value={studentData.dob} />
                <SHInfoRow label="Gender"       value={studentData.gender} />
                <SHInfoRow label="Category"     value={studentData.category} />
              </div>
              <div className="sh-card">
                <div className="sh-card-title">Address & Login</div>
                {(studentData.city || studentData.state) && (
                  <SHInfoRow label="Location" value={[studentData.city, studentData.state].filter(Boolean).join(', ')} />
                )}
                <SHInfoRow label="Last Login"  value={studentData.lastLogin} />
                <SHInfoRow label="Account"     value={studentData.isActive ? 'Active' : 'Inactive'} />
              </div>
            </div>
          )}
        </div>

        {/* ── Quick Actions ── */}
        <div className="sh-actions-grid">
          <div className="sh-action-card sh-action-fees" onClick={navigateToFees}>
            <div className="sh-action-icon">💳</div>
            <div className="sh-action-title">Fees</div>
            <div className="sh-action-desc">View and pay your semester fees</div>
          </div>
          <div className="sh-action-card sh-action-syllabus" onClick={navigateToSyllabus}>
            <div className="sh-action-icon">📚</div>
            <div className="sh-action-title">Syllabus</div>
            <div className="sh-action-desc">View your course syllabus</div>
          </div>
          <div className="sh-action-card sh-action-assignment" onClick={navigateToAssignments}>
            <div className="sh-action-icon">📝</div>
            <div className="sh-action-title">Assignments</div>
            <div className="sh-action-desc">View and download assignments</div>
          </div>
        </div>

      </div>
    </>
  );
};

export default StudentHome;
