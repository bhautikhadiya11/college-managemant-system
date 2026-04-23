// src/pages/ForgotPassword.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');

  .fp-root * { box-sizing: border-box; margin: 0; padding: 0; }
  .fp-root {
    font-family: 'Outfit', sans-serif;
    min-height: 100vh; display: flex; align-items: center; justify-content: center;
    background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #1e3a5f 100%);
    padding: 1rem; position: relative; overflow: hidden;
  }

  /* Decorative blobs */
  .fp-root::before {
    content: ''; position: absolute;
    width: 500px; height: 500px; border-radius: 50%;
    background: radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%);
    top: -150px; right: -100px; pointer-events: none;
  }
  .fp-root::after {
    content: ''; position: absolute;
    width: 400px; height: 400px; border-radius: 50%;
    background: radial-gradient(circle, rgba(14,165,233,0.1) 0%, transparent 70%);
    bottom: -100px; left: -100px; pointer-events: none;
  }

  .fp-card {
    position: relative; z-index: 1;
    background: rgba(255,255,255,0.97);
    border-radius: 24px; padding: 2.5rem 2.25rem;
    width: 100%; max-width: 420px;
    box-shadow: 0 24px 64px rgba(0,0,0,0.35);
    transform: translateY(16px); opacity: 0;
    transition: all 0.45s cubic-bezier(0.34,1.56,0.64,1);
  }
  .fp-card.visible { transform: translateY(0); opacity: 1; }

  .fp-icon-wrap {
    width: 56px; height: 56px; border-radius: 16px; margin: 0 auto 1.25rem;
    background: linear-gradient(135deg, #6366f1, #0ea5e9);
    display: flex; align-items: center; justify-content: center;
    font-size: 1.6rem; box-shadow: 0 6px 20px rgba(99,102,241,0.35);
  }
  .fp-title { font-size: 1.5rem; font-weight: 800; color: #0f172a; text-align: center; margin-bottom: 0.4rem; letter-spacing: -0.02em; }
  .fp-subtitle { font-size: 0.85rem; color: #6b7280; text-align: center; margin-bottom: 1.75rem; }

  .fp-alert { padding: 0.75rem 1rem; border-radius: 12px; font-size: 0.85rem; font-weight: 500; margin-bottom: 1.25rem; display: flex; align-items: center; gap: 0.5rem; }
  .fp-alert.error   { background: #fff1f2; border: 1.5px solid #fecdd3; color: #dc2626; }
  .fp-alert.success { background: #f0fdf4; border: 1.5px solid #bbf7d0; color: #16a34a; }

  .fp-label { display: block; font-size: 0.78rem; font-weight: 700; color: #374151; margin-bottom: 0.4rem; text-transform: uppercase; letter-spacing: 0.05em; }
  .fp-input {
    width: 100%; border: 1.5px solid #e5e7eb; border-radius: 12px;
    padding: 0.8rem 1rem; font-size: 0.9rem; font-family: 'Outfit', sans-serif;
    color: #0f172a; background: #f9fafb; margin-bottom: 1.25rem;
    transition: all 0.2s; outline: none;
  }
  .fp-input:focus { border-color: #6366f1; background: #fff; box-shadow: 0 0 0 3px rgba(99,102,241,0.1); }
  .fp-input:disabled { opacity: 0.6; cursor: not-allowed; }

  .fp-btn {
    width: 100%; padding: 0.85rem 1rem; border: none; border-radius: 12px; cursor: pointer;
    font-size: 0.95rem; font-weight: 700; font-family: 'Outfit', sans-serif;
    background: linear-gradient(135deg, #6366f1, #0ea5e9);
    color: #fff; transition: all 0.2s;
    box-shadow: 0 4px 16px rgba(99,102,241,0.35); letter-spacing: 0.01em;
  }
  .fp-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(99,102,241,0.45); }
  .fp-btn:active:not(:disabled) { transform: translateY(0); }
  .fp-btn:disabled { opacity: 0.55; cursor: not-allowed; transform: none; }

  .fp-back {
    display: flex; align-items: center; justify-content: center; gap: 0.4rem;
    margin-top: 1.25rem; font-size: 0.82rem; color: #6b7280; font-weight: 500;
    cursor: pointer; border: none; background: none; font-family: 'Outfit', sans-serif;
    transition: color 0.2s; width: 100%;
  }
  .fp-back:hover { color: #6366f1; }

  .fp-spinner {
    display: inline-block; width: 16px; height: 16px; border-radius: 50%;
    border: 2.5px solid rgba(255,255,255,0.35); border-top-color: #fff;
    animation: fp-spin 0.7s linear infinite; vertical-align: middle; margin-right: 6px;
  }
  @keyframes fp-spin { to { transform: rotate(360deg); } }
`;

const ForgotPassword = () => {
  const [email, setEmail]     = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => { setTimeout(() => setVisible(true), 50); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setMessage("");
    if (!email) { setError("Email is required"); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError("Enter a valid email address"); return; }
    setLoading(true);
    try {
      const res  = await fetch("/api/auth/forgot-password", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setMessage(data.message || "OTP sent to your email!");
      setTimeout(() => navigate("/verify-otp", { state: { email } }), 1500);
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="fp-root">
        <div className={`fp-card${visible ? ' visible' : ''}`}>
          <div className="fp-icon-wrap">🔐</div>
          <div className="fp-title">Forgot Password</div>
          <div className="fp-subtitle">Enter your registered email to receive an OTP</div>

          {error   && <div className="fp-alert error">⚠ {error}</div>}
          {message && <div className="fp-alert success">✓ {message}</div>}

          <form onSubmit={handleSubmit}>
            <label className="fp-label">Email Address</label>
            <input
              type="email" placeholder="you@example.com"
              value={email} onChange={e => setEmail(e.target.value)}
              className="fp-input" disabled={loading}
            />
            <button type="submit" className="fp-btn" disabled={loading}>
              {loading ? <><span className="fp-spinner" />Sending OTP…</> : 'Send OTP'}
            </button>
          </form>

          <button className="fp-back" onClick={() => navigate("/signin")}>
            ← Back to Login
          </button>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;