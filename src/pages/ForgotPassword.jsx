import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [show, setShow] = useState(false); // 🔥 animation trigger
  const navigate = useNavigate();

  useEffect(() => {
    setShow(true); // animate on mount
  }, []);

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      alert("Email is required");
      return;
    }

    if (!isValidEmail(email)) {
      alert("Enter a valid email address");
      return;
    }

    navigate("/verify-otp", { state: { email } });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-blue-100 px-4">

      {/* BACK BUTTON */}
      <button
        onClick={() => navigate("/signin")}
        className="absolute top-4 left-4 bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer"
      >
        ← Back
      </button>

      {/* 🔥 CARD WITH FADE + SCALE */}
      <div
        className={`
          bg-white w-full max-w-md p-8 rounded-2xl shadow-xl
          transform transition-all duration-500 ease-out
          ${show ? "opacity-100 scale-100" : "opacity-0 scale-95"}
        `}
      >
        <h2 className="text-2xl font-bold text-center mb-2">
          Forgot Password
        </h2>

        <p className="text-gray-500 text-center mb-6">
          Enter your registered Email ID
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full bg-blue-900 text-white py-3 rounded-xl hover:bg-blue-800 transition"
          >
            Send OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
