// src/pages/VerifyOTP.jsx
import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');

  .vo-root * { box-sizing: border-box; margin: 0; padding: 0; }
  .vo-root {
    font-family: 'Outfit', sans-serif;
    min-height: 100vh; display: flex; align-items: center; justify-content: center;
    background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #1e3a5f 100%);
    padding: 1rem; position: relative; overflow: hidden;
  }
  .vo-root::before {
    content: ''; position: absolute;
    width: 500px; height: 500px; border-radius: 50%;
    background: radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%);
    top: -150px; right: -100px; pointer-events: none;
  }
  .vo-root::after {
    content: ''; position: absolute;
    width: 400px; height: 400px; border-radius: 50%;
    background: radial-gradient(circle, rgba(14,165,233,0.1) 0%, transparent 70%);
    bottom: -100px; left: -100px; pointer-events: none;
  }

  .vo-card {
    position: relative; z-index: 1;
    background: rgba(255,255,255,0.97);
    border-radius: 24px; padding: 2.5rem 2.25rem;
    width: 100%; max-width: 420px;
    box-shadow: 0 24px 64px rgba(0,0,0,0.35);
    transform: translateY(16px); opacity: 0;
    transition: all 0.45s cubic-bezier(0.34,1.56,0.64,1);
  }
  .vo-card.visible { transform: translateY(0); opacity: 1; }

  .vo-icon-wrap {
    width: 56px; height: 56px; border-radius: 16px; margin: 0 auto 1.25rem;
    background: linear-gradient(135deg, #6366f1, #0ea5e9);
    display: flex; align-items: center; justify-content: center;
    font-size: 1.6rem; box-shadow: 0 6px 20px rgba(99,102,241,0.35);
  }
  .vo-title    { font-size: 1.5rem; font-weight: 800; color: #0f172a; text-align: center; margin-bottom: 0.4rem; letter-spacing: -0.02em; }
  .vo-subtitle { font-size: 0.85rem; color: #6b7280; text-align: center; margin-bottom: 1.75rem; line-height: 1.5; }
  .vo-email    { color: #6366f1; font-weight: 700; }

  .vo-alert { padding: 0.75rem 1rem; border-radius: 12px; font-size: 0.85rem; font-weight: 500; margin-bottom: 1.25rem; display: flex; align-items: center; gap: 0.5rem; }
  .vo-alert.error   { background: #fff1f2; border: 1.5px solid #fecdd3; color: #dc2626; }
  .vo-alert.success { background: #f0fdf4; border: 1.5px solid #bbf7d0; color: #16a34a; }

  /* 6-box OTP input */
  .vo-otp-row { display: flex; gap: 0.5rem; justify-content: center; margin-bottom: 1.5rem; }
  .vo-otp-box {
    width: 48px; height: 56px; border: 2px solid #e5e7eb; border-radius: 12px;
    font-family: 'JetBrains Mono', monospace; font-size: 1.4rem; font-weight: 700;
    color: #0f172a; text-align: center; background: #f9fafb;
    transition: all 0.2s; outline: none; caret-color: #6366f1;
  }
  .vo-otp-box:focus { border-color: #6366f1; background: #fff; box-shadow: 0 0 0 3px rgba(99,102,241,0.15); transform: scale(1.05); }
  .vo-otp-box.filled { border-color: #6366f1; background: #eef2ff; color: #4338ca; }
  .vo-otp-box:disabled { opacity: 0.5; }

  .vo-btn {
    width: 100%; padding: 0.85rem 1rem; border: none; border-radius: 12px; cursor: pointer;
    font-size: 0.95rem; font-weight: 700; font-family: 'Outfit', sans-serif;
    background: linear-gradient(135deg, #6366f1, #0ea5e9);
    color: #fff; transition: all 0.2s;
    box-shadow: 0 4px 16px rgba(99,102,241,0.35);
  }
  .vo-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(99,102,241,0.45); }
  .vo-btn:disabled { opacity: 0.55; cursor: not-allowed; transform: none; }

  .vo-back {
    display: flex; align-items: center; justify-content: center; gap: 0.4rem;
    margin-top: 1.25rem; font-size: 0.82rem; color: #6b7280; font-weight: 500;
    cursor: pointer; border: none; background: none; font-family: 'Outfit', sans-serif;
    transition: color 0.2s; width: 100%;
  }
  .vo-back:hover { color: #6366f1; }

  .vo-spinner { display: inline-block; width: 16px; height: 16px; border-radius: 50%; border: 2.5px solid rgba(255,255,255,0.35); border-top-color: #fff; animation: vo-spin 0.7s linear infinite; vertical-align: middle; margin-right: 6px; }
  @keyframes vo-spin { to { transform: rotate(360deg); } }
`;

const VerifyOTP = () => {
  const [digits, setDigits]   = useState(Array(6).fill(''));
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(false);
  const refs = Array(6).fill(null).map(() => useRef(null));
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  useEffect(() => { setTimeout(() => setVisible(true), 50); }, []);
  useEffect(() => { refs[0]?.current?.focus(); }, []);

  if (!email) { navigate("/forgot-password"); return null; }

  const handleDigit = (idx, val) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...digits];
    next[idx] = val;
    setDigits(next);
    if (val && idx < 5) refs[idx + 1]?.current?.focus();
  };

  const handleKeyDown = (idx, e) => {
    if (e.key === 'Backspace' && !digits[idx] && idx > 0) {
      refs[idx - 1]?.current?.focus();
    }
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pasted) return;
    const next = [...digits];
    pasted.split('').forEach((d, i) => { if (i < 6) next[i] = d; });
    setDigits(next);
    refs[Math.min(pasted.length, 5)]?.current?.focus();
    e.preventDefault();
  };

  const otp = digits.join('');

  const handleVerify = async (e) => {
    e.preventDefault();
    setError(""); setMessage("");
    if (otp.length !== 6) { setError("Enter all 6 digits of the OTP"); return; }
    setLoading(true);
    try {
      const res  = await fetch("/api/auth/verify-otp", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Verification failed");
      setMessage("OTP verified! Redirecting…");
      setTimeout(() => navigate("/reset-password", { state: { email, resetToken: data.resetToken } }), 1500);
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="vo-root">
        <div className={`vo-card${visible ? ' visible' : ''}`}>
          <div className="vo-icon-wrap">✉️</div>
          <div className="vo-title">Verify OTP</div>
          <div className="vo-subtitle">
            OTP sent to <span className="vo-email">{email}</span><br />
            Enter the 6-digit code below
          </div>

          {error   && <div className="vo-alert error">⚠ {error}</div>}
          {message && <div className="vo-alert success">✓ {message}</div>}

          <form onSubmit={handleVerify}>
            <div className="vo-otp-row" onPaste={handlePaste}>
              {digits.map((d, i) => (
                <input
                  key={i} ref={refs[i]}
                  type="text" maxLength={1} value={d}
                  onChange={e => handleDigit(i, e.target.value)}
                  onKeyDown={e => handleKeyDown(i, e)}
                  className={`vo-otp-box${d ? ' filled' : ''}`}
                  disabled={loading}
                  inputMode="numeric"
                />
              ))}
            </div>
            <button type="submit" className="vo-btn" disabled={loading || otp.length < 6}>
              {loading ? <><span className="vo-spinner" />Verifying…</> : 'Verify OTP'}
            </button>
          </form>

          <button className="vo-back" onClick={() => navigate("/forgot-password")}>
            ← Back
          </button>
        </div>
      </div>
    </>
  );
};

export default VerifyOTP;