import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const StudentLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchUnreadCount = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const res = await axios.get('http://localhost:5000/api/notifications/unread-count', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        setUnreadCount(res.data.count);
      }
    } catch (err) {
      console.error('Failed to fetch unread count:', err);
    }
  };

  useEffect(() => {
    fetchUnreadCount();
    const interval = setInterval(fetchUnreadCount, 30000); // every 30 seconds
    return () => clearInterval(interval);
  }, []);

  // Refetch when location changes (e.g., after navigating away from notifications)
  useEffect(() => {
    fetchUnreadCount();
  }, [location.pathname]);

  const navClass = ({ isActive }) =>
    `p-3 rounded transition-all duration-300 flex items-center justify-between
     ${isActive
       ? "bg-blue-700 scale-105 shadow-lg"
       : "hover:bg-blue-700 hover:translate-x-1"}`;

  return (
    <div className="flex h-screen overflow-hidden">
      <aside className="w-64 bg-blue-900 text-white flex flex-col h-screen fixed left-0 top-0">
        <div className="p-5 flex flex-col h-full">
          <h2 className="text-2xl font-bold mb-8">
            Student Panel
          </h2>
          <nav className="flex flex-col gap-3 flex-grow">
            <NavLink to="/student" end className={navClass}>
              <span>Profile</span>
            </NavLink>

            <NavLink to="/student/attendance" className={navClass}>
              <span>Attendance</span>
            </NavLink>

            <NavLink to="/student/syllabus" className={navClass}>
              <span>Syllabus</span>
            </NavLink>

            <NavLink to="/student/notifications" className={navClass}>
              <div className="flex items-center justify-between w-full">
                <span>Notifications</span>
                {unreadCount > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5 ml-2">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </div>
            </NavLink>

            <NavLink to="/student/gallery" className={navClass}>
              <span>Gallery</span>
            </NavLink>

            <NavLink to="/student/assignments" className={navClass}>
              <span>Assignments</span>
            </NavLink>

            <NavLink to="/student/fees" className={navClass}>
              <span>Fees</span>
            </NavLink>
          </nav>
        </div>
      </aside>
      <main className="flex-1 ml-64 bg-gray-100 min-h-screen overflow-y-auto">
        <div className="p-8 animate-fade">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default StudentLayout;