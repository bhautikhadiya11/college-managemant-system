import React, { useState } from "react";

const Login = () => {
  const [role, setRole] = useState("student");

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-blue-100 to-indigo-200">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">

        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-6">
          {role === "student" ? "Student Login" : "Professor Login"}
        </h2>

        {/* Role Selection */}
        <div className="flex justify-center mb-4 gap-4">
          <button
            onClick={() => setRole("student")}
            className={`px-4 py-2 rounded ${
              role === "student"
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            Student
          </button>

          <button
            onClick={() => setRole("Professor")}
            className={`px-4 py-2 rounded ${
              role === "Professor"
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            Professor
          </button>
        </div>

        {/* Login Form */}
        <div className="space-y-4">
          <input
            type="text"
            placeholder={role === "student" ? "Student ID" : "Professor Email"}
            className="w-full p-2 border rounded"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded"
          />

          <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Login
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center my-5">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="px-3 text-sm text-gray-500">OR</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* SOCIAL MEDIA LINKS */}
        <div className="flex justify-center gap-4">
          <a
            href="https://accounts.google.com"
            target="_blank"
            className="border p-2 rounded-full hover:bg-gray-100"
          >
            <img src="/img/google.png" alt="Google" className="h-6" />
          </a>

          <a
            href="https://www.instagram.com/ljbca/"
            target="_blank"
            className="border p-2 rounded-full hover:bg-gray-100"
          >
            <img src="/img/instagram.png" alt="Instagram" className="h-6" />
          </a>

          <a
            href="https://www.linkedin.com"
            target="_blank"
            className="border p-2 rounded-full hover:bg-gray-100"
          >
            <img src="/img/linkedin.png" alt="LinkedIn" className="h-6" />
          </a>
        </div>

        {/* Footer Text */}
        <p className="text-xs text-center text-gray-500 mt-5">
          Campus Flow • Secure Login Portal
        </p>
      </div>
    </div>
  );
};

export default Login;
