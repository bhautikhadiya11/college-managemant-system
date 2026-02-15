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
    } else if (password.length < 8) {
      err.password = "Password must be at least 8 characters";
    }

    if (role === "student") {
      if (!userId.trim()) {
        err.userId = "Please fill this input";
      } else if (!/^\d{12}$/.test(userId)) {
        err.userId = "Enrollment must be 12 digits";
      }
        // } else {
      //   const year = parseInt(userId.substring(0, 4));
      //   if (year < 2000 || year > new Date().getFullYear()) {
      //     err.userId = "Invalid admission year";
      //   }
      // }
    }
     else {
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
        ? "http://localhost:5000/api/auth/student/login"
        : "http://localhost:5000/api/auth/professor/login";

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
          localStorage.setItem('authToken', response.data.token);
          localStorage.setItem('userRole', role);
          localStorage.setItem('userId', userId);
          if (response.data.user) {
            localStorage.setItem('userData', JSON.stringify(response.data.user));
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

      if (error.code === 'ECONNABORTED') {
        setApiError("Request timeout. Please try again.");
      } else if (error.response) {
        const status = error.response.status;
        const message = error.response.data?.message || error.response.data?.error;

        if (status === 401) {
          setApiError("Invalid enrollment number or password");
        } else if (status === 404) {
          setApiError("Login endpoint not found");
        } else if (status === 500) {
          setApiError("Server error. Please try again later.");
        } else {
          setApiError(message || `Error ${status}: Login failed`);
        }
      } else if (error.request) {
        setApiError("Cannot connect to server. Please check if backend is running.");
      } else {
        setApiError("An error occurred. Please try again.");
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
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center
      bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 px-4 sm:px-6">

      <button
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 sm:top-5 sm:left-5
        bg-blue-600 text-white text-xs sm:text-sm
        px-3 sm:px-4 py-1.5 rounded-md font-medium
        shadow-md hover:bg-blue-700 transition cursor-pointer"
      >
        Go To Home
      </button>

      <div className={`bg-white rounded-3xl shadow-2xl
        p-6 sm:p-8 lg:p-10
        w-full max-w-[420px]
        transition-all duration-700 ease-out
        ${show ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"}`}>

        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 text-blue-950">
          {role === "student" ? "Student Login" : "Professor Login"}
        </h2>

        <div className="relative flex bg-gray-200 rounded-xl p-1 mb-6 sm:mb-8">
          <span
            className={`absolute top-1 left-1 h-10 sm:h-10.5 w-[48%]
            bg-blue-950 rounded-lg transition-all
            ${role === "professor" ? "translate-x-full" : ""}`}
          />

          <button
            onClick={() => {
              setRole("student");
              setApiError("");
              setErrors({});
              setUserId("");
              setPassword("");
            }}
            className={`relative z-10 w-1/2 py-2.5 font-semibold cursor-pointer
            ${role === "student" ? "text-white" : "text-gray-700"}`}
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
            className={`relative z-10 w-1/2 py-2.5 font-semibold cursor-pointer
            ${role === "professor" ? "text-white" : "text-gray-700"}`}
          >
            Professor
          </button>
        </div>

        {apiError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm text-center">{apiError}</p>
          </div>
        )}

        <div className="mb-2">
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={loading}
            placeholder={role === "student"
              ? "Student Enrollment ID"
              : "Professor Email ID"}
            autoComplete="off" // ⛔️ Browser autofill band karo
            className={`w-full border rounded-xl
            px-4 py-2.5 sm:py-3 text-sm outline-none mb-3
            focus:ring-2 focus:ring-blue-500
            ${errors.userId ? "border-red-500" : ""}
            ${loading ? "bg-gray-100 cursor-not-allowed" : ""}`}
          />

          {errors.userId && (
            <p className="text-red-500 text-xs mt-1">{errors.userId}</p>
          )}
        </div>

        <div className="mb-4">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={loading}
              placeholder="Password"
              autoComplete="new-password" // ⛔️ Password autofill band karo
              className={`w-full border rounded-xl
              px-4 py-2.5 sm:py-3 pr-12 text-sm outline-none
              focus:ring-2 focus:ring-blue-500
              ${errors.password ? "border-red-500" : ""}
              ${loading ? "bg-gray-100 cursor-not-allowed" : ""}`}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              disabled={loading}
              className="absolute right-4 top-1/2 -translate-y-1/2
              text-gray-500 hover:text-blue-700 cursor-pointer
              disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full bg-blue-950 text-white
          py-2.5 sm:py-3 rounded-xl font-semibold
          transition cursor-pointer
          ${loading
            ? "opacity-70 cursor-not-allowed hover:scale-100"
            : "hover:scale-[1.03]"}`}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Authenticating...
            </span>
          ) : (
            `Login as ${role}`
          )}
        </button>

        <div className="flex justify-center sm:justify-end mb-5">
          <button
            onClick={() => navigate("/forgot-password")}
            disabled={loading}
            className="text-l text-blue-900 pt-2 cursor-pointer
            hover:underline transition duration-200
            disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Forgot Password?
          </button>
        </div>

        <div className="mt-2">
          <p className="text-center text-sm text-gray-500 mb-5">
            Follow CAMPUS FLOW
          </p>

          <div className="flex justify-center gap-6 sm:gap-8">
            <a href="https://www.facebook.com/LJUniversity"
               target="_blank" rel="noopener noreferrer"
               className="p-3 rounded-full bg-blue-600 text-white hover:scale-110 transition">
              <Facebook size={18} />
            </a>

            <a href="https://www.instagram.com/LJBCA/"
               target="_blank" rel="noopener noreferrer"
               className="p-3 rounded-full bg-pink-600 text-white hover:scale-110 transition">
              <Instagram size={18} />
            </a>

            <a href="https://www.youtube.com/@LJCCA"
               target="_blank" rel="noopener noreferrer"
               className="p-3 rounded-full bg-red-600 text-white hover:scale-110 transition">
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