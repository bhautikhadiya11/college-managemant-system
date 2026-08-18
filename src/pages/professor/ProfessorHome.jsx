import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

/* ─── Styles ───────────────────────────────────────────── */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=DM+Serif+Display:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap');

  .ph-root * { box-sizing: border-box; }
  .ph-root { font-family: 'Outfit', sans-serif; color: #0f172a; }

  /* ── loading / error ── */
  .ph-center { display:flex; align-items:center; justify-content:center; min-height:60vh; flex-direction:column; gap:1rem; }
  .ph-spinner {
    width:48px; height:48px; border-radius:50%;
    border:3px solid #e5e7eb; border-top-color:#6366f1;
    animation:ph-spin 0.8s linear infinite;
  }
  @keyframes ph-spin { to { transform:rotate(360deg); } }
  .ph-load-text { color:#9ca3af; font-size:0.9rem; font-weight:500; }

  /* ── hero banner ── */
  .ph-hero {
    position: relative; overflow: hidden;
    border-radius: 24px; margin-bottom: 2rem;
    background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 45%, #1e3a5f 100%);
    box-shadow: 0 8px 40px rgba(15,23,42,0.2);
    padding: 2.5rem 2.5rem 2rem;
  }
  .ph-hero::before {
    content: '';
    position: absolute; inset: 0;
    background: url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.025'%3E%3Ccircle cx='40' cy='40' r='20'/%3E%3Ccircle cx='0' cy='0' r='20'/%3E%3Ccircle cx='80' cy='80' r='20'/%3E%3C/g%3E%3C/svg%3E");
    pointer-events: none;
  }
  .ph-hero::after {
    content: '';
    position: absolute; width:320px; height:320px; border-radius:50%;
    background: radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%);
    top:-100px; right:-80px; pointer-events:none;
  }
  .ph-hero-inner { position:relative; z-index:1; }

  .ph-hero-top { display:flex; align-items:flex-start; justify-content:space-between; flex-wrap:wrap; gap:1.5rem; margin-bottom:2rem; }

  .ph-avatar-row { display:flex; align-items:center; gap:1.5rem; }
  .ph-avatar {
    width:72px; height:72px; border-radius:20px;
    background: linear-gradient(135deg, #6366f1, #0ea5e9);
    display:flex; align-items:center; justify-content:center;
    font-family:'DM Serif Display', serif;
    font-size:2rem; color:#fff; flex-shrink:0;
    box-shadow:0 6px 24px rgba(99,102,241,0.4);
  }
  .ph-hero-name { font-family:'DM Serif Display', serif; font-size:1.85rem; color:#fff; letter-spacing:-0.02em; line-height:1; margin-bottom:0.3rem; }
  .ph-hero-email { color:rgba(148,163,184,0.85); font-size:0.85rem; margin-bottom:0.6rem; }
  .ph-status-pill {
    display:inline-flex; align-items:center; gap:0.35rem;
    background:rgba(34,197,94,0.15); border:1px solid rgba(34,197,94,0.3);
    color:#4ade80; font-size:0.72rem; font-weight:600;
    padding:0.2rem 0.7rem; border-radius:50px;
  }
  .ph-status-dot { width:6px; height:6px; border-radius:50%; background:#4ade80; }

  .ph-hero-actions { display:flex; gap:0.65rem; align-items:flex-start; flex-wrap:wrap; }
  .ph-btn-outline {
    display:flex; align-items:center; gap:0.4rem;
    padding:0.5rem 1.1rem; border-radius:10px;
    border:1.5px solid rgba(255,255,255,0.2);
    background:rgba(255,255,255,0.06);
    color:rgba(255,255,255,0.85);
    font-size:0.82rem; font-weight:600;
    cursor:pointer; transition:all 0.2s;
    font-family:'Outfit', sans-serif;
  }
  .ph-btn-outline:hover { background:rgba(255,255,255,0.12); border-color:rgba(255,255,255,0.35); }
  .ph-btn-danger {
    display:flex; align-items:center; gap:0.4rem;
    padding:0.5rem 1.1rem; border-radius:10px;
    border:1.5px solid rgba(239,68,68,0.4);
    background:rgba(239,68,68,0.1);
    color:#f87171;
    font-size:0.82rem; font-weight:600;
    cursor:pointer; transition:all 0.2s;
    font-family:'Outfit', sans-serif;
  }
  .ph-btn-danger:hover { background:rgba(239,68,68,0.2); }

  .ph-hero-stats { display:grid; grid-template-columns:repeat(4,1fr); gap:0; }
  .ph-hero-stat { padding:0 1.5rem 0 0; }
  .ph-hero-stat + .ph-hero-stat { padding-left:1.5rem; border-left:1px solid rgba(255,255,255,0.1); }
  .ph-hero-stat-label { font-size:0.72rem; color:rgba(148,163,184,0.75); font-weight:500; margin-bottom:0.25rem; text-transform:uppercase; letter-spacing:0.05em; }
  .ph-hero-stat-value { font-size:0.95rem; font-weight:700; color:#fff; }

  /* ── tabs ── */
  .ph-tabs { display:flex; gap:0.25rem; margin-bottom:1.75rem; border-bottom:1.5px solid #e8eaf0; }
  .ph-tab {
    padding:0.65rem 1.25rem; border:none; background:transparent; cursor:pointer;
    font-size:0.875rem; font-weight:500; color:#6b7280;
    font-family:'Outfit', sans-serif;
    border-bottom:2.5px solid transparent; margin-bottom:-1.5px;
    transition:all 0.2s;
  }
  .ph-tab:hover { color:#4338ca; }
  .ph-tab.active { color:#4338ca; border-bottom-color:#6366f1; font-weight:600; }

  /* ── section card ── */
  .ph-card {
    background:#fff; border:1.5px solid #e8eaf0;
    border-radius:18px; padding:1.5rem 1.75rem;
    box-shadow:0 2px 12px rgba(15,23,42,0.04);
  }
  .ph-card-title {
    font-size:0.82rem; font-weight:700; color:#6366f1;
    letter-spacing:0.07em; text-transform:uppercase;
    margin-bottom:1.25rem; display:flex; align-items:center; gap:0.5rem;
  }
  .ph-card-title::before {
    content:''; width:3px; height:16px; border-radius:99px;
    background:linear-gradient(180deg, #6366f1, #0ea5e9);
    flex-shrink:0;
  }

  .ph-grid-2 { display:grid; grid-template-columns:1fr 1fr; gap:1.25rem; }

  /* info row */
  .ph-info-row {
    display:flex; justify-content:space-between; align-items:center;
    padding:0.65rem 0; border-bottom:1px solid #f1f5f9;
  }
  .ph-info-row:last-child { border-bottom:none; }
  .ph-info-label { font-size:0.8rem; color:#9ca3af; font-weight:500; }
  .ph-info-value { font-size:0.875rem; font-weight:600; color:#0f172a; text-align:right; max-width:55%; word-break:break-word; }

  /* course cards */
  .ph-courses-grid { display:grid; grid-template-columns:repeat(auto-fill, minmax(220px,1fr)); gap:1rem; }
  .ph-course-card {
    border:1.5px solid #e8eaf0; border-radius:14px; padding:1.1rem 1.25rem;
    transition:all 0.2s cubic-bezier(0.34,1.56,0.64,1);
    position:relative; overflow:hidden;
  }
  .ph-course-card::before {
    content:''; position:absolute; top:0; left:0; right:0; height:3px;
    background:linear-gradient(90deg, #6366f1, #0ea5e9);
    border-radius:14px 14px 0 0;
  }
  .ph-course-card:hover { transform:translateY(-3px); box-shadow:0 10px 28px rgba(99,102,241,0.12); border-color:#c7d2fe; }
  .ph-course-name { font-weight:700; font-size:0.9rem; color:#0f172a; margin-bottom:0.35rem; }
  .ph-course-code {
    font-family:'JetBrains Mono', monospace;
    font-size:0.72rem; color:#6b7280;
    background:#f3f4f6; padding:0.15rem 0.5rem; border-radius:5px;
    display:inline-block; margin-bottom:0.4rem;
  }
  .ph-course-desc { font-size:0.78rem; color:#9ca3af; line-height:1.4; }

  /* quick actions */
  .ph-actions-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:1.25rem; margin-top:2rem; }
  .ph-action-card {
    border-radius:20px; padding:1.75rem 1.5rem;
    cursor:pointer; transition:all 0.25s cubic-bezier(0.34,1.56,0.64,1);
    position:relative; overflow:hidden;
    box-shadow:0 4px 20px rgba(0,0,0,0.08);
  }
  .ph-action-card:hover { transform:translateY(-5px) scale(1.02); box-shadow:0 12px 35px rgba(0,0,0,0.15); }
  .ph-action-icon { font-size:2.2rem; margin-bottom:0.9rem; line-height:1; }
  .ph-action-title { font-size:1.1rem; font-weight:700; color:#fff; margin-bottom:0.35rem; }
  .ph-action-desc { font-size:0.78rem; color:rgba(255,255,255,0.75); }

  .ph-action-attendance { background:linear-gradient(135deg, #1d4ed8, #0ea5e9); }
  .ph-action-syllabus   { background:linear-gradient(135deg, #059669, #34d399); }
  .ph-action-assignment { background:linear-gradient(135deg, #d97706, #f59e0b); }

  /* ── animations ── */
  @keyframes ph-fadeup { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:none} }
  .ph-hero     { animation:ph-fadeup 0.35s ease both; }
  .ph-tabs     { animation:ph-fadeup 0.4s 0.05s ease both; }
  .ph-content  { animation:ph-fadeup 0.4s 0.1s ease both; }
  .ph-actions-grid { animation:ph-fadeup 0.4s 0.15s ease both; }

  /* ── responsive ── */
  @media (max-width:1024px) {
    .ph-hero-stats { grid-template-columns:repeat(2,1fr); gap:1rem; }
    .ph-hero-stat + .ph-hero-stat { border-left:none; padding-left:0; }
    .ph-hero-stat:nth-child(odd) { padding-right:0; }
    .ph-hero-stat { padding:0.5rem 0; border-bottom:1px solid rgba(255,255,255,0.08); }
    .ph-hero-stat:last-child, .ph-hero-stat:nth-last-child(2):nth-child(odd) { border-bottom:none; }
  }

  @media (max-width:768px) {
    .ph-hero { padding:1.75rem 1.25rem 1.5rem; border-radius:18px; }
    .ph-hero-top { flex-direction:column; gap:1rem; }
    .ph-hero-name { font-size:1.5rem; }
    .ph-hero-stats { grid-template-columns:1fr 1fr; }
    .ph-grid-2 { grid-template-columns:1fr; }
    .ph-actions-grid { grid-template-columns:1fr; gap:0.85rem; }
    .ph-tabs { overflow-x:auto; gap:0; }
    .ph-tab { white-space:nowrap; flex-shrink:0; padding:0.6rem 1rem; font-size:0.82rem; }
    .ph-card { padding:1.25rem; }
  }

  @media (max-width:480px) {
    .ph-hero { padding:1.25rem 1rem 1.25rem; border-radius:14px; }
    .ph-avatar { width:56px; height:56px; border-radius:14px; font-size:1.5rem; }
    .ph-hero-name { font-size:1.3rem; }
    .ph-hero-stats { grid-template-columns:1fr 1fr; gap:0.5rem; }
    .ph-hero-stat + .ph-hero-stat { border:none; padding:0; }
    .ph-hero-stat { padding:0.4rem 0.6rem; background:rgba(255,255,255,0.05); border-radius:8px; }
    .ph-hero-actions { width:100%; }
    .ph-btn-outline, .ph-btn-danger { flex:1; justify-content:center; font-size:0.78rem; padding:0.45rem 0.75rem; }
    .ph-courses-grid { grid-template-columns:1fr; }
    .ph-actions-grid { margin-top:1.25rem; }
    .ph-action-card { padding:1.25rem; }
  }
`;

/* ─── Component ─────────────────────────────────────────── */
const ProfessorHome = () => {
  const [professorData, setProfessorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => { loadProfessorData(); }, []);

  const loadProfessorData = async () => {
    try {
      setLoading(true);
      let email = location.state?.user?.email;
      if (!email) {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          try { const user = JSON.parse(storedUser); email = user.email; } catch (e) {}
        }
      }
      if (!email) { navigate('/professor/login'); return; }
      const fullData = await fetchCompleteProfile(email);
      if (fullData) {
        const formattedData = formatProfessorData(fullData);
        setProfessorData(formattedData);
        localStorage.setItem('professorData', JSON.stringify(formattedData));
        localStorage.setItem('user', JSON.stringify(fullData));
      } else {
        const storedData = localStorage.getItem('professorData');
        if (storedData) { setProfessorData(JSON.parse(storedData)); }
        else { navigate('/professor/login'); }
      }
    } catch (error) {
      navigate('/professor/login');
    } finally {
      setLoading(false);
    }
  };

  const fetchCompleteProfile = async (email) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.get(`https://cms-backend-wl7u.onrender.com/api/professor/profile/${email}`, {
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
      });
      if (response.data.success) return response.data.data;
      return null;
    } catch (error) {
      console.error('❌ Failed to fetch profile:', error.response?.data || error.message);
      return null;
    }
  };

  const formatProfessorData = (data) => {
    let joiningDate = 'Not available';
    if (data.joiningDate) {
      try {
        const date = new Date(data.joiningDate);
        if (!isNaN(date.getTime())) joiningDate = date.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
      } catch (e) {}
    }
    let lastLogin = 'Never logged in';
    if (data.lastLogin) {
      try {
        const date = new Date(data.lastLogin);
        if (!isNaN(date.getTime())) lastLogin = date.toLocaleString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });
      } catch (e) {}
    }
    const professorId = data.id || data._id || 'N/A';
    let departmentName = 'Not specified', departmentCode = '', departmentDescription = '';
    if (data.department) {
      if (typeof data.department === 'object') {
        departmentName = data.department.name || 'Not specified';
        departmentCode = data.department.code || '';
        departmentDescription = data.department.description || '';
      } else if (typeof data.department === 'string') { departmentName = data.department; }
    }
    let displayId = 'N/A';
    if (professorId !== 'N/A' && departmentCode) {
      const lastTwoHex = professorId.toString().slice(-2);
      const lastTwoDecimal = parseInt(lastTwoHex, 16) % 100;
      displayId = `${departmentCode}${lastTwoDecimal.toString().padStart(2, '0')}`.toUpperCase();
    } else if (professorId !== 'N/A') {
      displayId = professorId.toString().slice(-6).toUpperCase();
    }
    const coursesTaught = data.coursesTaught || [];
    const formattedCourses = coursesTaught.map(course => ({
      id: course._id, name: course.name, code: course.code,
      credits: course.credits || 3, semester: course.semester || 'N/A', description: course.description || ''
    }));
    return {
      id: professorId, displayId,
      name: data.name || 'Professor', email: data.email || '',
      contactNumber: data.contactNumber || 'Not provided',
      department: departmentName, departmentCode, departmentDescription,
      qualification: data.qualification || 'Not specified',
      experience: data.experience || 0,
      specialization: data.specialization || 'Not specified',
      joiningDate, lastLogin,
      isActive: data.isActive === true,
      statusText: data.isActive === true ? 'Active' : 'Inactive',
      profilePicture: data.profilePicture || null,
      coursesCount: formattedCourses.length,
      coursesTaught: formattedCourses,
      stats: data.stats || {}
    };
  };

  const navigateToAttendance = () => navigate('/professor/attendance');
  const navigateToSyllabus = () => navigate('/professor/syllabus');
  const navigateToAssignments = () => navigate('/professor/assignments');
  const handleLogout = () => { localStorage.clear(); navigate('/signin'); };
  const navigateToChangePassword = () => navigate('/professor/change-password');

  if (loading) {
    return (
      <>
        <style>{styles}</style>
        <div className="ph-root ph-center">
          <div className="ph-spinner" />
          <span className="ph-load-text">Loading dashboard…</span>
        </div>
      </>
    );
  }

  if (!professorData) {
    return (
      <>
        <style>{styles}</style>
        <div className="ph-root ph-center">
          <p style={{ color:'#dc2626', marginBottom:'1rem' }}>Session expired. Please login again.</p>
          <button onClick={() => navigate('/signin')} style={{ background:'linear-gradient(135deg,#6366f1,#0ea5e9)', color:'#fff', padding:'0.6rem 1.5rem', border:'none', borderRadius:'10px', cursor:'pointer', fontFamily:'Outfit,sans-serif', fontWeight:600 }}>
            Go to Login
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{styles}</style>
      <div className="ph-root">

        {/* ── Hero Banner ── */}
        <div className="ph-hero">
          <div className="ph-hero-inner">
            <div className="ph-hero-top">
              <div className="ph-avatar-row">
                <div className="ph-avatar">{professorData.name?.charAt(0)}</div>
                <div>
                  <div className="ph-hero-name">{professorData.name}</div>
                  <div className="ph-hero-email">{professorData.email}</div>
                  <span className="ph-status-pill">
                    <span className="ph-status-dot" /> {professorData.statusText}
                  </span>
                </div>
              </div>
              <div className="ph-hero-actions">
                <button className="ph-btn-outline" onClick={navigateToChangePassword}>Change Password</button>
                <button className="ph-btn-danger" onClick={handleLogout}>Logout</button>
              </div>
            </div>

            <div className="ph-hero-stats">
              <div className="ph-hero-stat">
                <div className="ph-hero-stat-label">Professor ID</div>
                <div className="ph-hero-stat-value" style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'0.85rem' }}>{professorData.displayId}</div>
              </div>
              <div className="ph-hero-stat">
                <div className="ph-hero-stat-label">Department</div>
                <div className="ph-hero-stat-value">{professorData.department}</div>
              </div>
              <div className="ph-hero-stat">
                <div className="ph-hero-stat-label">Experience</div>
                <div className="ph-hero-stat-value">{professorData.experience} yrs</div>
              </div>
              <div className="ph-hero-stat">
                <div className="ph-hero-stat-label">Subjects</div>
                <div className="ph-hero-stat-value">{professorData.coursesCount}</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Tabs ── */}
        <div className="ph-tabs">
          {[['overview','Overview'], ['courses',`Subjects (${professorData.coursesCount})`], ['professional','Professional']].map(([key, label]) => (
            <button key={key} onClick={() => setActiveTab(key)} className={`ph-tab${activeTab === key ? ' active' : ''}`}>
              {label}
            </button>
          ))}
        </div>

        {/* ── Tab Content ── */}
        <div className="ph-content">
          {activeTab === 'overview' && (
            <div className="ph-grid-2">
              <div className="ph-card">
                <div className="ph-card-title">Personal Information</div>
                <PHInfoRow label="Full Name" value={professorData.name} />
                <PHInfoRow label="Email Address" value={professorData.email} />
                <PHInfoRow label="Contact Number" value={professorData.contactNumber} />
                <PHInfoRow label="Joining Date" value={professorData.joiningDate} />
                <PHInfoRow label="Last Login" value={professorData.lastLogin} />
              </div>
              <div className="ph-card">
                <div className="ph-card-title">Academic Information</div>
                <PHInfoRow label="Qualification" value={professorData.qualification} />
                <PHInfoRow label="Specialization" value={professorData.specialization} />
                <PHInfoRow label="Experience" value={`${professorData.experience} years`} />
              </div>
            </div>
          )}

          {activeTab === 'courses' && (
            <div className="ph-card">
              <div className="ph-card-title">Subjects Taught</div>
              {professorData.coursesTaught.length === 0 ? (
                <p style={{ color:'#9ca3af', textAlign:'center', padding:'2rem 0' }}>No subjects assigned yet.</p>
              ) : (
                <div className="ph-courses-grid">
                  {professorData.coursesTaught.map((course, index) => (
                    <div key={course.id || index} className="ph-course-card">
                      <div className="ph-course-name">{course.name}</div>
                      <span className="ph-course-code">{course.code}</span>
                      {course.description && <div className="ph-course-desc">{course.description}</div>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'professional' && (
            <div className="ph-grid-2">
              <div className="ph-card">
                <div className="ph-card-title">Professional Details</div>
                <PHInfoRow label="Qualification" value={professorData.qualification} />
                <PHInfoRow label="Specialization" value={professorData.specialization} />
                <PHInfoRow label="Experience" value={`${professorData.experience} years`} />
                <PHInfoRow label="Joining Date" value={professorData.joiningDate} />
                <PHInfoRow label="Status" value={professorData.statusText} />
              </div>
              <div className="ph-card">
                <div className="ph-card-title">Account Information</div>
                <PHInfoRow label="Account Status" value={professorData.isActive ? 'Active' : 'Inactive'} />
                <PHInfoRow label="Last Login" value={professorData.lastLogin} />
                <PHInfoRow label="Account Created" value={new Date().toLocaleDateString()} />
              </div>
            </div>
          )}
        </div>

        {/* ── Quick Actions ── */}
        <div className="ph-actions-grid">
          <div className="ph-action-card ph-action-attendance" onClick={navigateToAttendance}>
            <div className="ph-action-icon">📋</div>
            <div className="ph-action-title">Attendance</div>
            <div className="ph-action-desc">Mark and manage student attendance</div>
          </div>
          <div className="ph-action-card ph-action-syllabus" onClick={navigateToSyllabus}>
            <div className="ph-action-icon">📚</div>
            <div className="ph-action-title">Syllabus</div>
            <div className="ph-action-desc">View and manage course syllabus</div>
          </div>
          <div className="ph-action-card ph-action-assignment" onClick={navigateToAssignments}>
            <div className="ph-action-icon">📝</div>
            <div className="ph-action-title">Assignments</div>
            <div className="ph-action-desc">Create and grade assignments</div>
          </div>
        </div>

      </div>
    </>
  );
};

const PHInfoRow = ({ label, value }) => (
  <div className="ph-info-row">
    <span className="ph-info-label">{label}</span>
    <span className="ph-info-value">{value || 'N/A'}</span>
  </div>
);

export default ProfessorHome;
