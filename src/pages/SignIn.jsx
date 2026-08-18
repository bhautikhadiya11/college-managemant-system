import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Eye, EyeOff, Facebook, Instagram, Youtube } from "lucide-react";
import axios from "axios";

const SignIn = () => {
  const [show, setShow] = useState(false);
  const [role, setRole] = useState("student");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Reset fields on every visit to this page (including after logout)
  useEffect(() => {
    setUserId("");
    setPassword("");
    setApiError("");
    setErrors({});
  }, [location.key]); // location.key changes on every navigation

  useEffect(() => {
    setTimeout(() => setShow(true), 100);
  }, []);

  const validate = () => {
    let err = {};
    setApiError("");

    if (!password.trim()) {
      err.password = "Please fill this input";
    } else if (password.length < 6) {
      err.password = "Password must be at least 6 characters";
    }

    if (role === "student") {
      if (!userId.trim()) {
        err.userId = "Please fill this input";
      } else if (!/^\d{12}$/.test(userId)) {
        err.userId = "Enrollment must be 12 digits";
      }
    } else {
      if (!userId.trim()) {
        err.userId = "Please fill this input";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userId)) {
        err.userId = "Enter valid email";
      }
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const authenticateUser = async () => {
    setLoading(true);
    setApiError("");

    try {
      const endpoint = role === "student"
        ? "https://cms-backend-wl7u.onrender.com/api/auth/student/login"
        : "https://cms-backend-wl7u.onrender.com/api/auth/professor/login";

      const payload = role === "student"
        ? { enrollmentId: userId, password }
        : { email: userId, password };

      console.log("📡 Sending request to:", endpoint);
      console.log("📦 Payload:", payload);

      const response = await axios.post(endpoint, payload, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        timeout: 10000
      });

      console.log("✅ Response received:", response.data);

      if (response.data.success) {
        if (response.data.token) {
          sessionStorage.setItem('authToken', response.data.token);
          sessionStorage.setItem('userRole', role);
          sessionStorage.setItem('userId', userId);
          if (response.data.user) {
            sessionStorage.setItem('userData', JSON.stringify(response.data.user));
          }
        }

        if (role === "student") {
          navigate("/student", { state: { user: response.data.user } });
        } else {
          navigate("/professor", { state: { user: response.data.user } });
        }
      } else {
        setApiError(response.data.message || "Authentication failed");
      }

    } catch (error) {
  console.error(" Login error:", error);
  console.error("Error object details:", {
    message: error.message,
    code: error.code,
    response: error.response,
    request: error.request,
  });

  if (error.code === 'ECONNABORTED') {
    setApiError("Request timeout. Please try again.");
  } else if (error.response) {
    const status = error.response.status;
    const message = error.response.data?.message || error.response.data?.error;

    if (status === 401) {
      setApiError("Invalid email or password. Please check your credentials.");
    } else if (status === 404) {
      setApiError("Login endpoint not found. Please contact support.");
    } else if (status === 500) {
      setApiError("Server error. Please try again later.");
    } else {
      setApiError(message || `Error ${status}: Login failed. Please check your credentials.`);
    }
  } else if (error.request) {
    setApiError("Cannot connect to server. Please check if backend is running at https://cms-backend-wl7u.onrender.com.");
  } else {
    setApiError("An unexpected error occurred. Please try again.");
  }
} finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (validate()) {
      await authenticateUser();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }  return (
    <div className="relative min-h-screen flex items-center justify-center
      bg-[#f0f4ff] px-4 sm:px-6">

      <button
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 sm:top-6 sm:left-6
        bg-white text-blue-900 text-xs sm:text-sm
        px-4 py-2 rounded-lg font-semibold
        shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)] hover:bg-blue-50 transition cursor-pointer flex items-center gap-2"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        Back to Home
      </button>

      <div className={`bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.08)]
        p-7 sm:p-10 lg:p-12
        w-full max-w-[440px]
        transition-all duration-700 ease-out
        ${show ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"}`}>

        <div className="mb-8 text-center">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
             <GraduationCap size={32} />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Welcome Back
          </h2>
          <p className="text-sm text-gray-500 mt-2">Sign in to your {role} account</p>
        </div>

        <div className="relative flex bg-gray-100 rounded-xl p-1 mb-8">
          <span
            className={`absolute top-1 h-10 w-[calc(50%-4px)]
            bg-white shadow-sm rounded-lg transition-transform duration-300 ease-in-out
            ${role === "professor" ? "translate-x-full" : "translate-x-0"}`}
          />

          <button
            onClick={() => {
              setRole("student");
              setApiError("");
              setErrors({});
              setUserId("");
              setPassword("");
            }}
            className={`relative z-10 w-1/2 py-2 font-semibold text-sm cursor-pointer transition-colors
            ${role === "student" ? "text-blue-900" : "text-gray-500 hover:text-gray-700"}`}
          >
            Student
          </button>

          <button
            onClick={() => {
              setRole("professor");
              setApiError("");
              setErrors({});
              setUserId("");
              setPassword("");
            }}
            className={`relative z-10 w-1/2 py-2 font-semibold text-sm cursor-pointer transition-colors
            ${role === "professor" ? "text-blue-900" : "text-gray-500 hover:text-gray-700"}`}
          >
            Professor
          </button>
        </div>

        {apiError && (
          <div className="mb-5 p-3 bg-red-50 border border-red-100 rounded-xl flex items-center gap-2">
            <AlertCircle size={16} className="text-red-500 flex-shrink-0" />
            <p className="text-red-600 text-sm">{apiError}</p>
          </div>
        )}

        <div className="mb-4">
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 ml-1">
            {role === "student" ? "Enrollment Number" : "Email Address"}
          </label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={loading}
            placeholder={role === "student" ? "e.g. 202301210315" : "e.g. professor@college.edu"}
            autoComplete="off"
            className={`w-full border-2 rounded-xl
            px-4 py-3 text-sm outline-none transition-all
            focus:border-blue-500 focus:bg-white bg-gray-50
            ${errors.userId ? "border-red-400" : "border-transparent hover:border-gray-200"}
            ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
          />
          {errors.userId && (
            <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.userId}</p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 ml-1">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={loading}
              placeholder="Enter your password"
              autoComplete="new-password"
              className={`w-full border-2 rounded-xl
              px-4 py-3 pr-12 text-sm outline-none transition-all
              focus:border-blue-500 focus:bg-white bg-gray-50
              ${errors.password ? "border-red-400" : "border-transparent hover:border-gray-200"}
              ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              disabled={loading}
              className="absolute right-3 top-1/2 -translate-y-1/2
              p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer
              disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.password}</p>
          )}
        </div>

        <div className="flex justify-end mb-6">
          <button
            onClick={() => navigate("/forgot-password")}
            disabled={loading}
            className="text-sm font-semibold text-blue-600 hover:text-blue-800 cursor-pointer
            transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Forgot Password?
          </button>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full bg-blue-600 hover:bg-blue-700 text-white
          py-3.5 rounded-xl font-semibold shadow-[0_4px_12px_rgba(37,99,235,0.2)]
          transition-all cursor-pointer flex items-center justify-center gap-2
          ${loading ? "opacity-70 cursor-not-allowed" : "hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(37,99,235,0.3)]"}`}
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Authenticating...</span>
            </>
          ) : (
            <span>Sign In</span>
          )}
        </button>

        <div className="mt-8 pt-8 border-t border-gray-100">
          <div className="flex items-center justify-center gap-4">
            <a href="https://www.facebook.com/LJUniversity" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-gray-50 text-gray-500 hover:bg-[#1877F2] hover:text-white transition-all">
              <Facebook size={18} />
            </a>
            <a href="https://www.instagram.com/LJBCA/" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-gray-50 text-gray-500 hover:bg-[#E4405F] hover:text-white transition-all">
              <Instagram size={18} />
            </a>
            <a href="https://www.youtube.com/@LJCCA" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-gray-50 text-gray-500 hover:bg-[#FF0000] hover:text-white transition-all">
              <Youtube size={18} />
            </a>
          </div>
          <p className="text-xs text-center text-gray-400 mt-6">
            Campus Flow ? Secure College Login Portal
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
