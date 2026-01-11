import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const VerifyOTP = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const handleVerify = (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      alert("Enter 6-digit OTP");
      return;
    }

    // 🔐 Backend OTP verify here
    navigate("/reset-password");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-blue-100 px-4">

      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl">

        <h2 className="text-2xl font-bold text-center mb-2">
          Verify OTP
        </h2>

        <p className="text-gray-500 text-center mb-6">
          OTP sent to <b>{email}</b>
        </p>

        <form onSubmit={handleVerify} className="space-y-4">
          <input
            type="text"
            maxLength="6"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full text-center tracking-widest text-xl border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full bg-blue-900 text-white py-3 rounded-xl hover:bg-blue-800 transition cursor-pointer"
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOTP;
