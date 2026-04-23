// src/pages/ResetPassword.jsx
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');

  .rp-root * { box-sizing: border-box; margin: 0; padding: 0; }
  .rp-root {
    font-family: 'Outfit', sans-serif;
    min-height: 100vh; display: flex; align-items: center; justify-content: center;
    background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #1e3a5f 100%);
    padding: 1rem; position: relative; overflow: hidden;
  }
  .rp-root::before {
    content: ''; position: absolute; width: 500px; height: 500px; border-radius: 50%;
    background: radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%);
    top: -150px; right: -100px; pointer-events: none;
  }
  .rp-root::after {
    content: ''; position: absolute; width: 400px; height: 400px; border-radius: 50%;
    background: radial-gradient(circle, rgba(14,165,233,0.1) 0%, transparent 70%);
    bottom: -100px; left: -100px; pointer-events: none;
  }

  .rp-card {
    position: relative; z-index: 1; background: rgba(255,255,255,0.97);
    border-radius: 24px; padding: 2.5rem 2.25rem;
    width: 100%; max-width: 420px;
    box-shadow: 0 24px 64px rgba(0,0,0,0.35);
    transform: translateY(16px); opacity: 0;
    transition: all 0.45s cubic-bezier(0.34,1.56,0.64,1);
  }
  .rp-card.visible { transform: translateY(0); opacity: 1; }

  .rp-icon-wrap {
    width: 56px; height: 56px; border-radius: 16px; margin: 0 auto 1.25rem;
    background: linear-gradient(135deg, #6366f1, #0ea5e9);
    display: flex; align-items: center; justify-content: center;
    font-size: 1.6rem; box-shadow: 0 6px 20px rgba(99,102,241,0.35);
  }
  .rp-title    { font-size: 1.5rem; font-weight: 800; color: #0f172a; text-align: center; margin-bottom: 0.4rem; letter-spacing: -0.02em; }
  .rp-subtitle { font-size: 0.85rem; color: #6b7280; text-align: center; margin-bottom: 1.75rem; }

  .rp-alert { padding: 0.75rem 1rem; border-radius: 12px; font-size: 0.85rem; font-weight: 500; margin-bottom: 1.25rem; display: flex; align-items: center; gap: 0.5rem; }
  .rp-alert.error   { background: #fff1f2; border: 1.5px solid #fecdd3; color: #dc2626; }
  .rp-alert.success { background: #f0fdf4; border: 1.5px solid #bbf7d0; color: #16a34a; }

  .rp-field { margin-bottom: 1rem; }
  .rp-label { display: block; font-size: 0.78rem; font-weight: 700; color: #374151; margin-bottom: 0.4rem; text-transform: uppercase; letter-spacing: 0.05em; }
  .rp-input-wrap { position: relative; }
  .rp-input {
    width: 100%; border: 1.5px solid #e5e7eb; border-radius: 12px;
    padding: 0.8rem 2.75rem 0.8rem 1rem; font-size: 0.9rem; font-family: 'Outfit', sans-serif;
    color: #0f172a; background: #f9fafb; transition: all 0.2s; outline: none;
  }
  .rp-input:focus { border-color: #6366f1; background: #fff; box-shadow: 0 0 0 3px rgba(99,102,241,0.1); }
  .rp-input:disabled { opacity: 0.6; cursor: not-allowed; }
  .rp-eye { position: absolute; right: 0.9rem; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; color: #9ca3af; font-size: 1rem; display: flex; align-items: center; padding: 0; transition: color 0.2s; }
  .rp-eye:hover { color: #6366f1; }

  .rp-strength { display: flex; gap: 4px; margin-top: 0.5rem; }
  .rp-strength-bar { height: 3px; flex: 1; border-radius: 99px; background: #e5e7eb; transition: background 0.3s; }
  .rp-strength-bar.weak   { background: #ef4444; }
  .rp-strength-bar.medium { background: #f97316; }
  .rp-strength-bar.strong { background: #10b981; }

  .rp-btn {
    width: 100%; padding: 0.85rem 1rem; border: none; border-radius: 12px; cursor: pointer;
    font-size: 0.95rem; font-weight: 700; font-family: 'Outfit', sans-serif; margin-top: 0.25rem;
    background: linear-gradient(135deg, #6366f1, #0ea5e9);
    color: #fff; transition: all 0.2s; box-shadow: 0 4px 16px rgba(99,102,241,0.35);
  }
  .rp-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(99,102,241,0.45); }
  .rp-btn:disabled { opacity: 0.55; cursor: not-allowed; transform: none; }
  .rp-spinner { display: inline-block; width: 16px; height: 16px; border-radius: 50%; border: 2.5px solid rgba(255,255,255,0.35); border-top-color: #fff; animation: rp-spin 0.7s linear infinite; vertical-align: middle; margin-right: 6px; }
  @keyframes rp-spin { to { transform: rotate(360deg); } }

  @media (max-width: 440px) { .rp-card { padding: 2rem 1.25rem; } }
`;

const EyeToggle = ({ show, onToggle }) => (
  <button type="button" className="rp-eye" onClick={onToggle} tabIndex={-1}>
    {show ? '🙈' : '👁'}
  </button>
);

const strengthLevel = (pwd) => {
  if (!pwd) return 0;
  let s = 0;
  if (pwd.length >= 6)  s++;
  if (pwd.length >= 10) s++;
  if (/[A-Z]/.test(pwd) && /[0-9]/.test(pwd)) s++;
  return s;
};

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirm,  setConfirm]  = useState("");
  const [showPwd,  setShowPwd]  = useState(false);
  const [showCfm,  setShowCfm]  = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");
  const [message,  setMessage]  = useState("");
  const [visible,  setVisible]  = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { email, resetToken } = location.state || {};

  useEffect(() => { setTimeout(() => setVisible(true), 50); }, []);

  if (!email || !resetToken) { navigate("/forgot-password"); return null; }

  const strength = strengthLevel(password);
  const strClass = ['', 'weak', 'medium', 'strong'][strength] || '';

  const handleReset = async (e) => {
    e.preventDefault();
    setError(""); setMessage("");
    if (!password || !confirm) { setError("Fill all fields"); return; }
    if (password !== confirm)  { setError("Passwords do not match"); return; }
    if (password.length < 6)   { setError("Password must be at least 6 characters"); return; }
    setLoading(true);
    try {
      const res  = await fetch("/api/auth/reset-password", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, resetToken, newPassword: password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Password reset failed");
      setMessage("Password updated! Redirecting to login…");
      setTimeout(() => navigate("/signin"), 2000);
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="rp-root">
        <div className={`rp-card${visible ? ' visible' : ''}`}>
          <div className="rp-icon-wrap">🔑</div>
          <div className="rp-title">Reset Password</div>
          <div className="rp-subtitle">Choose a strong new password</div>

          {error   && <div className="rp-alert error">⚠ {error}</div>}
          {message && <div className="rp-alert success">✓ {message}</div>}

          <form onSubmit={handleReset}>
            <div className="rp-field">
              <label className="rp-label">New Password</label>
              <div className="rp-input-wrap">
                <input
                  type={showPwd ? 'text' : 'password'} placeholder="Min 6 characters"
                  value={password} onChange={e => setPassword(e.target.value)}
                  className="rp-input" disabled={loading}
                />
                <EyeToggle show={showPwd} onToggle={() => setShowPwd(s => !s)} />
              </div>
              {/* Strength bars */}
              {password && (
                <div className="rp-strength">
                  {[1,2,3].map(i => (
                    <div key={i} className={`rp-strength-bar${strength >= i ? ' ' + strClass : ''}`} />
                  ))}
                </div>
              )}
            </div>

            <div className="rp-field">
              <label className="rp-label">Confirm Password</label>
              <div className="rp-input-wrap">
                <input
                  type={showCfm ? 'text' : 'password'} placeholder="Repeat new password"
                  value={confirm} onChange={e => setConfirm(e.target.value)}
                  className="rp-input" disabled={loading}
                />
                <EyeToggle show={showCfm} onToggle={() => setShowCfm(s => !s)} />
              </div>
            </div>

            <button type="submit" className="rp-btn" disabled={loading}>
              {loading ? <><span className="rp-spinner" />Updating…</> : 'Update Password'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;