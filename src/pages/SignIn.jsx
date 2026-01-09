import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Youtube } from "lucide-react";
import { Facebook, Instagram, Linkedin, Globe } from "lucide-react";

const SignIn = () => {
  const [show, setShow] = useState(false);
  const [role, setRole] = useState("student");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setShow(true), 100);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300">

      {/* GO HOME */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 bg-blue-700 text-white text-sm cursor-pointer
        px-4 py-2 rounded-lg shadow hover:bg-blue-800 transition hover:border-l"
      >
         Go To Home
      </button>

      {/* LOGIN CARD */}
      <div
        className={`bg-white rounded-3xl shadow-2xl p-10 w-[430px]
        transition-all duration-700 ease-out
        ${show ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"}`}
      >
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-900">
          {role === "student" ? "Student Login" : "Professor Login"}
        </h2>

        {/* ROLE TOGGLE */}
        <div className="relative flex bg-gray-200 rounded-xl p-1 mb-8">
          <span
            className={`absolute top-1 left-1 h-[42px] w-[48%] bg-blue-700 rounded-lg transition-all
            ${role === "professor" ? "translate-x-full" : ""}`}
          />

          <button
            onClick={() => setRole("student")}
            className={`relative z-10 w-1/2 py-2.5 font-semibold cursor-pointer
            ${role === "student" ? "text-white" : "text-gray-700"}`}
          >
            Student
          </button>

          <button
            onClick={() => setRole("professor")}
            className={`relative z-10 w-1/2 py-2.5 font-semibold cursor-pointer
            ${role === "professor" ? "text-white" : "text-gray-700"}`}
          >
            Professor
          </button>
        </div>

        {/* USER ID */}
        <input
          type="text"
          placeholder={role === "student" ? "Student ID" : "Professor ID"}
          className="w-full mb-5 border rounded-xl px-4 py-3 text-sm
          focus:ring-2 focus:ring-blue-500 outline-none"
        />

        {/* PASSWORD */}
        <div className="relative mb-6">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full border rounded-xl px-4 py-3 pr-12 text-sm
            focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-700 cursor-pointer"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* LOGIN BUTTON */}
        <button
          className="w-full bg-blue-700 text-white py-3 rounded-xl font-semibold cursor-pointer
          hover:scale-[1.03] hover:bg-blue-800 transition"
        >
          Login as {role}
        </button>
        <div className="flex justify-end mb-6">
        <button
          type="button"
          className="text-sm text-blue-700 hover:underline hover:text-blue-900 cursor-pointer pt-3"
        >
          Forgot Password?
        </button>
        </div>
        {/* FOLLOW US */}
        <div className="mt-1">
          <p className="text-center text-sm text-gray-500 mb-6">
            Follow LJ COLLEGE
          </p>

          <div className="flex justify-center gap-8">
            <a
              href="https://www.facebook.com/LJUniversity"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-blue-600 text-white hover:scale-110 transition"
              title="LJ University Facebook"
            >
              <Facebook size={18} />
            </a>

            <a
              href="https://www.instagram.com/LJBCA/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-pink-600 text-white hover:scale-110 transition"
              title="LJ University Instagram"
            >
              <Instagram size={18} />
            </a>
            <a
              href="https://www.youtube.com/@LJCCA"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-red-600 text-white hover:scale-110 transition"
              title="LJ University YouTube Channel"
            >
              <Youtube size={18} />
            </a>
          </div>
        </div>

              
        <p className="text-xs text-center text-gray-500 mt-6">
          Campus Flow • Secure College Login Portal
        </p>
      </div>
    </div>
  );
};

export default SignIn;
