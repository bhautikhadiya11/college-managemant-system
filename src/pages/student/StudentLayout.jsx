import { NavLink, Outlet, useNavigate } from "react-router-dom";

const StudentLayout = () => {
  const navigate = useNavigate();

  const navClass = ({ isActive }) =>
    `p-3 rounded transition-all duration-300
     ${isActive
       ? "bg-blue-700 scale-105 shadow-lg"
       : "hover:bg-blue-700 hover:translate-x-1"}`;

  return (
    <div className="flex min-h-screen">

      {/* SIDEBAR */}
      <aside className="w-64 bg-blue-900 text-white p-5 flex flex-col">

        <h2 className="text-2xl font-bold mb-8">
          Student Panel
        </h2>

        <nav className="flex flex-col gap-3 flex-grow">

          <NavLink to="/student" end className={navClass}>
            Dashboard
          </NavLink>

          <NavLink to="/student/attendance" className={navClass}>
            Attendance
          </NavLink>

          <NavLink to="/student/syllabus" className={navClass}>
            Syllabus
          </NavLink>

          <NavLink to="/student/notifications" className={navClass}>
            Notifications
          </NavLink>

          <NavLink to="/student/gallery" className={navClass}>
            Gallery
          </NavLink>

          <NavLink to="/student/assignments" className={navClass}>
            Assignments
          </NavLink>  

          <NavLink to="/student/fees" className={navClass}>
            Fees
          </NavLink>

        </nav>

        <button
          onClick={() => navigate("/")}
          className="bg-red-500 py-2 rounded hover:bg-red-600 transition cursor-pointer"
        >
          Logout
        </button>

      </aside>

      {/* RIGHT SIDE CONTENT */}
      <main className="flex-1 bg-gray-100 p-8 animate-fade">
        <Outlet />
      </main>

    </div>
  );
};

export default StudentLayout;