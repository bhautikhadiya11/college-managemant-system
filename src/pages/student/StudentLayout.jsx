// src/student/StudentLayout.jsx
import { useState, useEffect } from "react";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, CalendarCheck, BookOpen, Bell, Image, ClipboardList, CreditCard, Menu, X, GraduationCap } from "lucide-react";
import axios from "axios";

/* ─── Styles — matches ProfessorLayout exactly ─────────────────────────── */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

  .sl-root { font-family: 'Outfit', sans-serif; }

  /* ── sidebar ── */
  .sl-sidebar {
    width: 240px;
    background: linear-gradient(170deg, #0f172a 0%, #1e1b4b 50%, #1e3a5f 100%);
    height: 100vh;
    position: fixed; left: 0; top: 0;
    display: flex; flex-direction: column;
    z-index: 100;
    transition: transform 0.3s cubic-bezier(0.4,0,0.2,1);
    box-shadow: 4px 0 30px rgba(0,0,0,0.25);
    overflow: hidden;
  }
  .sl-sidebar::before {
    content: '';
    position: absolute; inset: 0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    pointer-events: none;
  }
  .sl-sidebar-inner { position: relative; z-index: 1; display: flex; flex-direction: column; height: 100%; padding: 1.5rem 1.1rem; overflow: hidden; }

  .sl-logo { display: flex; align-items: center; gap: 0.7rem; margin-bottom: 2.5rem; padding: 0 0.3rem; }
  .sl-logo-icon {
    width: 38px; height: 38px; border-radius: 11px;
    background: linear-gradient(135deg, #0ea5e9, #6366f1);
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 4px 16px rgba(14,165,233,0.4); flex-shrink: 0;
  }
  .sl-logo-text { color: #ffffff; font-size: 1.05rem; font-weight: 700; letter-spacing: -0.01em; line-height: 1.1; }
  .sl-logo-sub { color: rgba(148,163,184,0.7); font-size: 0.65rem; font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase; }

  .sl-nav { display: flex; flex-direction: column; gap: 0.35rem; flex: 1; overflow-x: hidden; overflow-y: auto; scrollbar-width: none; -ms-overflow-style: none; }
  .sl-nav::-webkit-scrollbar { display: none; }

  .sl-nav-link {
    display: flex; align-items: center; gap: 0.75rem;
    padding: 0.7rem 0.9rem; border-radius: 12px;
    color: rgba(148,163,184,0.8);
    font-size: 0.875rem; font-weight: 500;
    text-decoration: none;
    transition: all 0.2s; position: relative; overflow: hidden;
  }
  .sl-nav-link::before {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(99,102,241,0.15), rgba(14,165,233,0.1));
    opacity: 0; transition: opacity 0.2s; border-radius: 12px;
  }
  .sl-nav-link:hover { color: #ffffff; transform: translateX(3px); }
  .sl-nav-link:hover::before { opacity: 1; }
  .sl-nav-link.active {
    color: #ffffff;
    background: linear-gradient(135deg, rgba(99,102,241,0.3), rgba(14,165,233,0.2));
    box-shadow: 0 2px 12px rgba(99,102,241,0.2);
  }
  .sl-nav-link.active::after {
    content: ''; position: absolute; right: 0; top: 50%;
    transform: translateY(-50%);
    width: 3px; height: 60%;
    background: linear-gradient(180deg, #0ea5e9, #6366f1);
    border-radius: 99px 0 0 99px;
  }
  .sl-nav-link svg { flex-shrink: 0; }
  .sl-nav-label { flex: 1; }
  .sl-badge {
    background: #ef4444; color: #fff;
    font-size: 0.65rem; font-weight: 700;
    min-width: 18px; height: 18px; border-radius: 50px;
    display: flex; align-items: center; justify-content: center;
    padding: 0 4px; line-height: 1;
  }

  .sl-sidebar-footer {
    border-top: 1px solid rgba(255,255,255,0.08); padding-top: 1rem; padding-bottom: 1.5rem;
    color: rgba(148,163,184,0.5);
    font-size: 0.65rem; font-weight: 500;
    letter-spacing: 0.06em; text-transform: uppercase; text-align: center;
    flex-shrink: 0; overflow: hidden;
  }

  /* ── main content ── */
  .sl-main {
    margin-left: 240px; min-height: 100vh;
    background: #f5f6fa;
    background-image:
      radial-gradient(ellipse at 10% 0%, rgba(99,102,241,0.05) 0%, transparent 50%),
      radial-gradient(ellipse at 90% 100%, rgba(14,165,233,0.04) 0%, transparent 50%);
    transition: margin-left 0.3s cubic-bezier(0.4,0,0.2,1);
  }
  .sl-main-inner { padding: 2rem; }

  /* ── mobile hamburger ── */
  .sl-hamburger {
    display: none; position: fixed; top: 1rem; left: 1rem; z-index: 200;
    width: 40px; height: 40px; border-radius: 10px;
    background: linear-gradient(135deg, #1e1b4b, #1e3a5f);
    border: none; cursor: pointer;
    align-items: center; justify-content: center;
    box-shadow: 0 4px 15px rgba(0,0,0,0.25); color: white;
  }
  .sl-overlay { display: none; position: fixed; inset: 0; z-index: 90; background: rgba(0,0,0,0.55); backdrop-filter: blur(2px); }
  .sl-overlay.visible { display: block; }

  /* ── responsive ── */
  @media (max-width: 1024px) {
    .sl-sidebar { width: 220px; }
    .sl-main { margin-left: 220px; }
    .sl-main-inner { padding: 1.5rem; }
  }
  @media (max-width: 768px) {
    .sl-sidebar { transform: translateX(-100%); width: 240px; }
    .sl-sidebar.open { transform: translateX(0); }
    .sl-main { margin-left: 0; }
    .sl-main-inner { padding: 1rem; padding-top: 4rem; }
    .sl-hamburger { display: flex; }
  }
  @media (max-width: 480px) {
    .sl-main-inner { padding: 0.75rem; padding-top: 4rem; }
  }
`;

const navItems = [
  { to: "/student",               label: "Profile",       icon: LayoutDashboard, end: true  },
  { to: "/student/attendance",    label: "Attendance",    icon: CalendarCheck,   end: false },
  { to: "/student/syllabus",      label: "Syllabus",      icon: BookOpen,        end: false },
  { to: "/student/notifications", label: "Notifications", icon: Bell,            end: false },
  { to: "/student/gallery",       label: "Gallery",       icon: Image,           end: false },
  { to: "/student/assignments",   label: "Assignments",   icon: ClipboardList,   end: false },
  { to: "/student/fees",          label: "Fees",          icon: CreditCard,      end: false },
];

const StudentLayout = () => {
  const navigate  = useNavigate();
  const location  = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [unread, setUnread]           = useState(0);

  useEffect(() => {
    const token = sessionStorage.getItem('authToken');
    const role  = sessionStorage.getItem('userRole');
    if (!token || role !== 'student') {
      sessionStorage.removeItem('authToken');
      sessionStorage.removeItem('userRole');
      navigate('/');
    }
  }, [navigate]);

  const fetchUnread = async () => {
    try {
      const token = sessionStorage.getItem('authToken');
      if (!token) return;
      const res = await axios.get('https://cms-backend-wl7u.onrender.com/api/notifications/unread-count', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) setUnread(res.data.count);
    } catch (err) {
      if (err.response?.status === 401) {
        sessionStorage.removeItem('authToken'); sessionStorage.removeItem('userRole'); navigate('/');
      }
    }
  };

  useEffect(() => { fetchUnread(); const iv = setInterval(fetchUnread, 30000); return () => clearInterval(iv); }, []);
  useEffect(() => { fetchUnread(); setSidebarOpen(false); }, [location.pathname]);

  return (
    <>
      <style>{styles}</style>
      <div className="sl-root" style={{ display: 'flex', minHeight: '100vh' }}>

        {/* Mobile hamburger */}
        <button className="sl-hamburger" onClick={() => setSidebarOpen(o => !o)}>
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Overlay */}
        <div className={`sl-overlay ${sidebarOpen ? 'visible' : ''}`} onClick={() => setSidebarOpen(false)} />

        {/* Sidebar */}
        <aside className={`sl-sidebar ${sidebarOpen ? 'open' : ''}`}>
          <div className="sl-sidebar-inner">
            {/* Logo */}
            <div className="sl-logo">
              <div className="sl-logo-icon">
                <GraduationCap size={20} color="#fff" />
              </div>
              <div>
                <div className="sl-logo-text">Student</div>
                <div className="sl-logo-sub">Panel</div>
              </div>
            </div>

            {/* Nav */}
            <nav className="sl-nav">
              {navItems.map(({ to, label, icon: Icon, end }) => (
                <NavLink
                  key={to} to={to} end={end}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) => `sl-nav-link${isActive ? ' active' : ''}`}
                >
                  <Icon size={18} />
                  <span className="sl-nav-label">{label}</span>
                  {label === 'Notifications' && unread > 0 && (
                    <span className="sl-badge">{unread > 9 ? '9+' : unread}</span>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Footer */}
            <div className="sl-sidebar-footer">College Management System</div>
          </div>
        </aside>

        {/* Main */}
        <main className="sl-main" style={{ flex: 1 }}>
          <div className="sl-main-inner">
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
};

export default StudentLayout;
