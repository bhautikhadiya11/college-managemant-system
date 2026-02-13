import { Link, Outlet, useNavigate } from "react-router-dom";

const ProfessorLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-gray-100">

      <aside className="w-64 bg-indigo-900 text-white p-5 flex flex-col">

        <h2 className="text-2xl font-bold mb-8">
          Professor Panel
        </h2>

        <nav className="flex flex-col gap-3 flex-grow">

          <Link to="/professor" className="hover:bg-indigo-700 p-2 rounded">
            Dashboard
          </Link>

          <Link to="/professor/students" className="hover:bg-indigo-700 p-2 rounded">
            Students
          </Link>

          <Link to="/professor/marks" className="hover:bg-indigo-700 p-2 rounded">
            Upload Marks
          </Link>

        </nav>

        <button
          onClick={() => navigate("/signin")}
          className="bg-red-500 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>

      </aside>

      <main className="flex-1 p-6">
        <Outlet />
      </main>

    </div>
  );
};

export default ProfessorLayout;