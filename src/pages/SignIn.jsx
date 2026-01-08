import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ import added

const SignIn = () => {
  const [show, setShow] = useState(false);
  const [role, setRole] = useState("student");
  const navigate = useNavigate(); // ✅ initialize

  useEffect(() => {
    setTimeout(() => setShow(true), 100);
  }, []);

  return (
    // ✅ relative added
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-100 to-blue-200">
      
      {/* TOP RIGHT DASHBOARD BUTTON */}
      <button
        onClick={() => navigate("/")} // ✅ redirect
        className="absolute top-5 left-5
        bg-blue-600 text-white text-sm
        px-4 py-1.5 rounded-md font-medium
        shadow-md
        hover:bg-blue-700
        transition cursor-pointer"
        
      >
       Go To Home
      </button>

      {/* LOGIN CARD */}
      <div
        className={`bg-white rounded-2xl shadow-xl p-8 w-[380px]
        transition-all duration-700 ease-out
        ${show ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-6 scale-95"}`}
      >
        <h2 className="text-2xl font-semibold text-center mb-6">
          {role === "student" ? "Student Login" : "Professor Login"}
        </h2>

        {/* TOGGLE */}
        <div className="relative flex bg-gray-200 rounded-lg p-1 mb-6">
          <span
            className={`absolute top-1 left-1 h-[36px] w-[48%] bg-blue-600 rounded-md transition-all
            ${role === "professor" ? "translate-x-full" : ""}`}
          ></span>

          <button
            onClick={() => setRole("student")}
            className={`relative z-10 w-1/2 py-2 font-medium
            ${role === "student" ? "text-white" : "text-gray-700"}`}
          >
            Student
          </button>

          <button
            onClick={() => setRole("professor")}
            className={`relative z-10 w-1/2 py-2 font-medium
            ${role === "professor" ? "text-white" : "text-gray-700"}`}
          >
            Professor
          </button>
        </div>

        <input
          type="text"
          placeholder={role === "student" ? "Student ID" : "Professor ID"}
          className="w-full mb-4 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
        />

        <button
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium
          hover:scale-[1.03] transition cursor-pointer"
        >
          Login as {role}
        </button>

        <p className="text-xs text-center text-gray-500 mt-5">
          Campus Flow • Secure Login Portal
        </p>
      </div>
    </div>
  );
};

export default SignIn;
