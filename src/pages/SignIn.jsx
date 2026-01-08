import { useEffect, useState } from "react";

const SignIn = () => {
  const [show, setShow] = useState(false);
  const [role, setRole] = useState("student"); // student | professor

  useEffect(() => {
    setTimeout(() => setShow(true), 100);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-100 to-blue-200">
      
      {/* LOGIN CARD */}
      <div
        className={`bg-white rounded-2xl shadow-xl p-8 w-[380px]
        transition-all duration-700 ease-out
        ${show ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-6 scale-95"}`}
      >
        {/* HEADING */}
        <h2 className="text-2xl font-semibold text-center mb-6">
          {role === "student" ? "Student Login" : "Professor Login"}
        </h2>

        {/* TOGGLE */}
        <div className="relative flex bg-gray-200 rounded-lg p-1 mb-6">
          <span
            className={`absolute top-1 left-1 h-[36px] w-[48%] bg-blue-600 rounded-md
            transition-all duration-300
            ${role === "professor" ? "translate-x-full" : ""}`}
          ></span>

          <button
            onClick={() => setRole("student")}
            className={`relative z-10 w-1/2 py-2 font-medium transition-colors
            ${role === "student" ? "text-white" : "text-gray-700"}`}
          >
            Student
          </button>

          <button
            onClick={() => setRole("professor")}
            className={`relative z-10 w-1/2 py-2 font-medium transition-colors
            ${role === "professor" ? "text-white" : "text-gray-700"}`}
          >
            Professor
          </button>
        </div>

        {/* INPUTS */}
        <input
          type="text"
          placeholder={role === "student" ? "Student ID" : "Professor ID"}
          className="w-full mb-4 border rounded-lg px-4 py-2
          focus:outline-none focus:ring-2 focus:ring-blue-400
          transition-all"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 border rounded-lg px-4 py-2
          focus:outline-none focus:ring-2 focus:ring-blue-400
          transition-all"
        />

        {/* LOGIN BUTTON */}
        <button
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium
          transition-all duration-300
          hover:scale-[1.03] hover:shadow-lg
          active:scale-95"
        >
          Login as {role === "student" ? "Student" : "Professor"}
        </button>

        {/* OR */}
        <div className="my-4 text-center text-gray-400">OR</div>

        {/* SOCIAL */}
        <div className="flex justify-center gap-4">
          {["Google", "Instagram", "LinkedIn"].map((item) => (
            <button
              key={item}
              className="border rounded-full px-4 py-2
              transition-all duration-300
              hover:-translate-y-1 hover:shadow-md"
            >
              {item}
            </button>
          ))}
        </div>

        <p className="text-xs text-center text-gray-500 mt-5">
          Campus Flow • Secure Login Portal
        </p>
      </div>
    </div>
  );
};

export default SignIn;
