import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { LayoutDashboard, ClipboardList, BookOpen, FileText, Menu, X, GraduationCap } from "lucide-react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

  .pl-root { font-family: 'Outfit', sans-serif; }

  /* ── sidebar ── */
  .pl-sidebar {
    width: 240px;
    background: linear-gradient(170deg, #0f172a 0%, #1e1b4b 50%, #1e3a5f 100%);
    height: 100vh;
    position: fixed;
    left: 0; top: 0;
    display: flex; flex-direction: column;
    z-index: 100;
    transition: transform 0.3s cubic-bezier(0.4,0,0.2,1);
    box-shadow: 4px 0 30px rgba(0,0,0,0.25);
  }
  .pl-sidebar::before {
    content: '';
    position: absolute; inset: 0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    pointer-events: none;
  }

  .pl-sidebar-inner { position: relative; z-index: 1; display: flex; flex-direction: column; height: 100%; padding: 1.5rem 1.1rem; }

  .pl-logo {
    display: flex; align-items: center; gap: 0.7rem;
    margin-bottom: 2.5rem; padding: 0 0.3rem;
  }
  .pl-logo-icon {
    width: 38px; height: 38px; border-radius: 11px;
    background: linear-gradient(135deg, #0ea5e9, #6366f1);
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 4px 16px rgba(14,165,233,0.4);
    flex-shrink: 0;
  }
  .pl-logo-text { color: #ffffff; font-size: 1.05rem; font-weight: 700; letter-spacing: -0.01em; line-height: 1.1; }
  .pl-logo-sub { color: rgba(148,163,184,0.7); font-size: 0.65rem; font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase; }

  .pl-nav { display: flex; flex-direction: column; gap: 0.35rem; flex: 1; }

  .pl-nav-link {
    display: flex; align-items: center; gap: 0.75rem;
    padding: 0.7rem 0.9rem;
    border-radius: 12px;
    color: rgba(148,163,184,0.8);
    font-size: 0.875rem; font-weight: 500;
    text-decoration: none;
    transition: all 0.2s;
    position: relative;
    overflow: hidden;
  }
  .pl-nav-link::before {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(99,102,241,0.15), rgba(14,165,233,0.1));
    opacity: 0; transition: opacity 0.2s; border-radius: 12px;
  }
  .pl-nav-link:hover { color: #ffffff; transform: translateX(3px); }
  .pl-nav-link:hover::before { opacity: 1; }
  .pl-nav-link.active {
    color: #ffffff;
    background: linear-gradient(135deg, rgba(99,102,241,0.3), rgba(14,165,233,0.2));
    box-shadow: 0 2px 12px rgba(99,102,241,0.2);
  }
  .pl-nav-link.active::after {
    content: '';
    position: absolute; right: 0; top: 50%;
    transform: translateY(-50%);
    width: 3px; height: 60%;
    background: linear-gradient(180deg, #0ea5e9, #6366f1);
    border-radius: 99px 0 0 99px;
  }
  .pl-nav-link svg { flex-shrink: 0; }

  .pl-sidebar-footer {
    border-top: 1px solid rgba(255,255,255,0.08);
    padding-top: 1rem;
    color: rgba(148,163,184,0.5);
    font-size: 0.65rem; font-weight: 500;
    letter-spacing: 0.06em; text-transform: uppercase;
    text-align: center;
  }

  /* ── main content ── */
  .pl-main {
    margin-left: 240px;
    min-height: 100vh;
    background: #f5f6fa;
    background-image:
      radial-gradient(ellipse at 10% 0%, rgba(99,102,241,0.05) 0%, transparent 50%),
      radial-gradient(ellipse at 90% 100%, rgba(14,165,233,0.04) 0%, transparent 50%);
    transition: margin-left 0.3s cubic-bezier(0.4,0,0.2,1);
  }
  .pl-main-inner { padding: 2rem; }

  /* ── mobile hamburger ── */
  .pl-hamburger {
    display: none;
    position: fixed; top: 1rem; left: 1rem; z-index: 200;
    width: 40px; height: 40px; border-radius: 10px;
    background: linear-gradient(135deg, #1e1b4b, #1e3a5f);
    border: none; cursor: pointer;
    align-items: center; justify-content: center;
    box-shadow: 0 4px 15px rgba(0,0,0,0.25);
    color: white;
  }

  .pl-overlay {
    display: none;
    position: fixed; inset: 0; z-index: 90;
    background: rgba(0,0,0,0.55);
    backdrop-filter: blur(2px);
  }
  .pl-overlay.visible { display: block; }

  /* ── responsive ── */
  @media (max-width: 1024px) {
    .pl-sidebar { width: 220px; }
    .pl-main { margin-left: 220px; }
    .pl-main-inner { padding: 1.5rem; }
  }

  @media (max-width: 768px) {
    .pl-sidebar { transform: translateX(-100%); width: 240px; }
    .pl-sidebar.open { transform: translateX(0); }
    .pl-main { margin-left: 0; }
    .pl-main-inner { padding: 1rem; padding-top: 4rem; }
    .pl-hamburger { display: flex; }
  }

  @media (max-width: 480px) {
    .pl-main-inner { padding: 0.75rem; padding-top: 4rem; }
    .pl-logo-text { font-size: 0.95rem; }
  }
`;

const navItems = [
  { to: "/professor", label: "Profile", icon: LayoutDashboard, end: true },
  { to: "/professor/attendance", label: "Attendance", icon: ClipboardList },
  { to: "/professor/syllabus", label: "Syllabus", icon: BookOpen },
  { to: "/professor/assignments", label: "Assignments", icon: FileText },
];

const ProfessorLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <>
      <style>{styles}</style>
      <div className="pl-root" style={{ display: 'flex', minHeight: '100vh' }}>

        {/* Mobile hamburger */}
        <button className="pl-hamburger" onClick={() => setSidebarOpen(o => !o)}>
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Overlay */}
        <div className={`pl-overlay ${sidebarOpen ? 'visible' : ''}`} onClick={closeSidebar} />

        {/* Sidebar */}
        <aside className={`pl-sidebar ${sidebarOpen ? 'open' : ''}`}>
          <div className="pl-sidebar-inner">
            {/* Logo */}
            <div className="pl-logo">
              <div className="pl-logo-icon">
                <GraduationCap size={20} color="#fff" />
              </div>
              <div>
                <div className="pl-logo-text">Professor</div>
                <div className="pl-logo-sub">Panel</div>
              </div>
            </div>

            {/* Nav */}
            <nav className="pl-nav">
              {navItems.map(({ to, label, icon: Icon, end }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={end}
                  onClick={closeSidebar}
                  className={({ isActive }) => `pl-nav-link${isActive ? ' active' : ''}`}
                >
                  <Icon size={18} />
                  {label}
                </NavLink>
              ))}
            </nav>

            {/* Footer */}
            <div className="pl-sidebar-footer">College Management System</div>
          </div>
        </aside>

        {/* Main content */}
        <main className="pl-main" style={{ flex: 1 }}>
          <div className="pl-main-inner">
            <Outlet />
          </div>
        </main>

      </div>
    </>
  );
};

export default ProfessorLayout;