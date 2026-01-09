import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Facebook, Instagram, Youtube } from "lucide-react";

const SignIn = () => {
  const [show, setShow] = useState(false);
  const [role, setRole] = useState("student");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setShow(true), 100);
  }, []);

  return (
    <div
      className="relative min-h-screen flex items-center justify-center
      bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300
      px-4 sm:px-6"
    >
      {/* GO TO HOME */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 sm:top-5 sm:left-5
        bg-blue-600 text-white text-xs sm:text-sm
        px-3 sm:px-4 py-1.5 rounded-md font-medium
        shadow-md hover:bg-blue-700 transition"
      >
        Go To Home
      </button>

      {/* LOGIN CARD */}
      <div
        className={`bg-white rounded-3xl shadow-2xl
        p-6 sm:p-8 lg:p-10
        w-full max-w-[420px]
        transition-all duration-700 ease-out
        ${show ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"}`}
      >
        {/* TITLE */}
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 text-blue-950">
          {role === "student" ? "Student Login" : "Professor Login"}
        </h2>

        {/* ROLE TOGGLE */}
        <div className="relative flex bg-gray-200 rounded-xl p-1 mb-6 sm:mb-8">
          <span
            className={`absolute top-1 left-1 h-10 sm:h-10.5 w-[48%]
            bg-blue-950 rounded-lg transition-all
            ${role === "professor" ? "translate-x-full" : ""}`}
          />

          <button
            onClick={() => setRole("student")}
            className={`relative z-10 w-1/2 py-2.5 font-semibold
            ${role === "student" ? "text-white" : "text-gray-700"}`}
          >
            Student
          </button>

          <button
            onClick={() => setRole("professor")}
            className={`relative z-10 w-1/2 py-2.5 font-semibold
            ${role === "professor" ? "text-white" : "text-gray-700"}`}
          >
            Professor
          </button>
        </div>

        {/* USER ID */}
        <input
          type="text"
          placeholder={role === "student" ? "Student ID" : "Professor ID"}
          className="w-full mb-4 sm:mb-5 border rounded-xl
          px-4 py-2.5 sm:py-3 text-sm
          focus:ring-2 focus:ring-blue-500 outline-none"
        />

        {/* PASSWORD */}
        <div className="relative mb-5 sm:mb-6">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full border rounded-xl
            px-4 py-2.5 sm:py-3 pr-12 text-sm
            focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2
            text-gray-500 hover:text-blue-700"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* LOGIN BUTTON */}
        <button
          className="w-full bg-blue-950 text-white
          py-2.5 sm:py-3 rounded-xl font-semibold
          hover:scale-[1.03] transition"
        >
          Login as {role}
        </button>

        {/* FORGOT PASSWORD */}
        <div className="flex justify-center sm:justify-end mb-5">
          <button
            type="button"
            className="text-sm text-blue-900 hover:underline pt-2"
          >
            Forgot Password?
          </button>
        </div>

        {/* SOCIAL MEDIA */}
        <div className="mt-2">
          <p className="text-center text-sm text-gray-500 mb-5">
            Follow CAMPUS FLOW
          </p>

          <div className="flex justify-center gap-6 sm:gap-8">
            <a
              href="https://www.facebook.com/LJUniversity"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-blue-600 text-white hover:scale-110 transition"
              title="Facebook"
            >
              <Facebook size={18} />
            </a>

            <a
              href="https://www.instagram.com/LJBCA/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-pink-600 text-white hover:scale-110 transition"
              title="Instagram"
            >
              <Instagram size={18} />
            </a>

            <a
              href="https://www.youtube.com/@LJCCA"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-red-600 text-white hover:scale-110 transition"
              title="YouTube"
            >
              <Youtube size={18} />
            </a>
          </div>
        </div>

        {/* FOOTER */}
        <p className="text-xs text-center text-gray-500 mt-6">
          Campus Flow • Secure College Login Portal
        </p>
      </div>
    </div>
  );
};

export default SignIn;
