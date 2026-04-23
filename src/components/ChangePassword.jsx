// src/pages/ChangePassword.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');

  .cp-root * { box-sizing: border-box; margin: 0; padding: 0; }
  .cp-root {
    font-family: 'Outfit', sans-serif;
    min-height: 100vh; display: flex; align-items: center; justify-content: center;
    background: #f5f6fa;
    background-image:
      radial-gradient(ellipse at 10% 0%, rgba(99,102,241,0.06) 0%, transparent 50%),
      radial-gradient(ellipse at 90% 100%, rgba(14,165,233,0.05) 0%, transparent 50%);
    padding: 1rem;
  }

  .cp-card {
    background: #fff; border: 1.5px solid #e8eaf0; border-radius: 24px;
    padding: 2.5rem 2.25rem; width: 100%; max-width: 440px;
    box-shadow: 0 8px 32px rgba(15,23,42,0.08);
    transform: translateY(16px); opacity: 0;
    transition: all 0.4s cubic-bezier(0.34,1.56,0.64,1);
  }
  .cp-card.visible { transform: translateY(0); opacity: 1; }

  .cp-icon-wrap {
    width: 56px; height: 56px; border-radius: 16px; margin: 0 auto 1.25rem;
    background: linear-gradient(135deg, #6366f1, #0ea5e9);
    display: flex; align-items: center; justify-content: center;
    font-size: 1.6rem; box-shadow: 0 6px 20px rgba(99,102,241,0.3);
  }
  .cp-title    { font-size: 1.5rem; font-weight: 800; color: #0f172a; text-align: center; margin-bottom: 0.4rem; letter-spacing: -0.02em; }
  .cp-subtitle { font-size: 0.85rem; color: #6b7280; text-align: center; margin-bottom: 1.75rem; }

  .cp-alert { padding: 0.75rem 1rem; border-radius: 12px; font-size: 0.85rem; font-weight: 500; margin-bottom: 1.25rem; display: flex; align-items: center; gap: 0.5rem; }
  .cp-alert.error   { background: #fff1f2; border: 1.5px solid #fecdd3; color: #dc2626; }
  .cp-alert.success { background: #f0fdf4; border: 1.5px solid #bbf7d0; color: #16a34a; }

  .cp-field { margin-bottom: 1rem; }
  .cp-label { display: block; font-size: 0.78rem; font-weight: 700; color: #374151; margin-bottom: 0.4rem; text-transform: uppercase; letter-spacing: 0.05em; }
  .cp-input-wrap { position: relative; }
  .cp-input {
    width: 100%; border: 1.5px solid #e5e7eb; border-radius: 12px;
    padding: 0.8rem 2.75rem 0.8rem 1rem; font-size: 0.9rem; font-family: 'Outfit', sans-serif;
    color: #0f172a; background: #f9fafb; transition: all 0.2s; outline: none;
  }
  .cp-input:focus { border-color: #6366f1; background: #fff; box-shadow: 0 0 0 3px rgba(99,102,241,0.1); }
  .cp-input:disabled { opacity: 0.6; }
  .cp-eye { position: absolute; right: 0.9rem; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; color: #9ca3af; font-size: 1rem; display: flex; align-items: center; padding: 0; transition: color 0.2s; }
  .cp-eye:hover { color: #6366f1; }

  .cp-divider { border: none; border-top: 1.5px solid #f1f5f9; margin: 1.25rem 0; }

  .cp-btn {
    width: 100%; padding: 0.85rem 1rem; border: none; border-radius: 12px; cursor: pointer;
    font-size: 0.95rem; font-weight: 700; font-family: 'Outfit', sans-serif;
    background: linear-gradient(135deg, #6366f1, #0ea5e9);
    color: #fff; transition: all 0.2s; box-shadow: 0 4px 16px rgba(99,102,241,0.3);
  }
  .cp-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(99,102,241,0.4); }
  .cp-btn:disabled { opacity: 0.55; cursor: not-allowed; transform: none; }

  .cp-back {
    display: flex; align-items: center; justify-content: center; gap: 0.4rem;
    margin-top: 1rem; font-size: 0.82rem; color: #6b7280; font-weight: 500;
    cursor: pointer; border: none; background: none; font-family: 'Outfit', sans-serif;
    transition: color 0.2s; width: 100%;
  }
  .cp-back:hover { color: #6366f1; }

  .cp-spinner { display: inline-block; width: 16px; height: 16px; border-radius: 50%; border: 2.5px solid rgba(255,255,255,0.35); border-top-color: #fff; animation: cp-spin 0.7s linear infinite; vertical-align: middle; margin-right: 6px; }
  @keyframes cp-spin { to { transform: rotate(360deg); } }

  @media (max-width: 440px) { .cp-card { padding: 2rem 1.25rem; border-radius: 18px; } }
`;

// Single password field with eye toggle
const PwdField = ({ label, name, value, onChange, disabled }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="cp-field">
      <label className="cp-label">{label}</label>
      <div className="cp-input-wrap">
        <input
          type={show ? 'text' : 'password'}
          name={name} value={value} onChange={onChange}
          className="cp-input" disabled={disabled} required
          placeholder="••••••••"
        />
        <button type="button" className="cp-eye" onClick={() => setShow(s => !s)} tabIndex={-1}>
          {show ? '🙈' : '👁'}
        </button>
      </div>
    </div>
  );
};

const ChangePassword = () => {
  const [form, setForm]       = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [error, setError]     = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => { setTimeout(() => setVisible(true), 50); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setSuccess("");
    if (form.newPassword !== form.confirmPassword) { setError("New passwords do not match"); return; }
    if (form.newPassword.length < 6) { setError("Password must be at least 6 characters"); return; }
    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const res   = await axios.post(
        "http://localhost:5000/api/auth/change-password",
        { currentPassword: form.currentPassword, newPassword: form.newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) {
        setSuccess("Password changed successfully!");
        setTimeout(() => navigate(-1), 2000);
      }
    } catch (err) { setError(err.response?.data?.message || "Failed to change password"); }
    finally { setLoading(false); }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="cp-root">
        <div className={`cp-card${visible ? ' visible' : ''}`}>
          <div className="cp-icon-wrap">🔒</div>
          <div className="cp-title">Change Password</div>
          <div className="cp-subtitle">Keep your account secure with a strong password</div>

          {error   && <div className="cp-alert error">⚠ {error}</div>}
          {success && <div className="cp-alert success">✓ {success}</div>}

          <form onSubmit={handleSubmit}>
            <PwdField label="Current Password"    name="currentPassword" value={form.currentPassword} onChange={handleChange} disabled={loading} />
            <hr className="cp-divider" />
            <PwdField label="New Password"         name="newPassword"     value={form.newPassword}     onChange={handleChange} disabled={loading} />
            <PwdField label="Confirm New Password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} disabled={loading} />

            <button type="submit" className="cp-btn" disabled={loading}>
              {loading ? <><span className="cp-spinner" />Changing…</> : 'Change Password'}
            </button>
          </form>

          <button className="cp-back" onClick={() => navigate(-1)}>
            ← Go Back
          </button>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;