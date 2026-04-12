import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BookOpen, CheckCircle, AlertCircle } from 'lucide-react';

/* ─── Styles ──────────────────────────────────────────────── */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

  .sa-root * { box-sizing: border-box; margin: 0; padding: 0; }
  .sa-root { font-family: 'DM Sans', sans-serif; }

  /* ── page wrapper ── */
  .sa-root {
    min-height: 100vh;
    background: #f5f6fa;
    background-image:
      radial-gradient(ellipse at 15% 10%, rgba(56,189,248,0.07) 0%, transparent 55%),
      radial-gradient(ellipse at 85% 90%, rgba(99,102,241,0.06) 0%, transparent 55%);
    padding: 2.5rem 2rem;
  }

  /* ── page title ── */
  .sa-title-row {
    display: flex; align-items: center; gap: 0.75rem;
    margin-bottom: 2rem;
  }
  .sa-title-icon {
    width: 44px; height: 44px; border-radius: 14px;
    background: linear-gradient(135deg, #0ea5e9, #6366f1);
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 6px 20px rgba(14,165,233,0.35);
    flex-shrink: 0;
  }
  .sa-title-text {
    font-family: 'DM Serif Display', serif;
    font-size: 1.9rem;
    color: #0f172a;
    letter-spacing: -0.02em;
    line-height: 1;
  }
  .sa-title-text em {
    font-style: italic;
    background: linear-gradient(90deg, #0ea5e9, #6366f1);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* ── hero card ── */
  .sa-hero {
    position: relative;
    border-radius: 24px;
    overflow: hidden;
    padding: 2.25rem 2.5rem;
    margin-bottom: 2rem;
    background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0c4a6e 100%);
    box-shadow: 0 8px 40px rgba(15,23,42,0.22);
  }
  .sa-hero::before {
    content: '';
    position: absolute; inset: 0;
    background: url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.025'%3E%3Ccircle cx='40' cy='40' r='20'/%3E%3Ccircle cx='0' cy='0' r='20'/%3E%3Ccircle cx='80' cy='80' r='20'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  }
  /* decorative glow orbs */
  .sa-hero::after {
    content: '';
    position: absolute;
    width: 300px; height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(14,165,233,0.18) 0%, transparent 70%);
    top: -80px; right: -60px;
    pointer-events: none;
  }
  .sa-hero-inner { position: relative; z-index: 1; }
  .sa-hero-label {
    font-size: 0.72rem; font-weight: 600; letter-spacing: 0.12em;
    text-transform: uppercase; color: rgba(148,163,184,0.9);
    margin-bottom: 1.5rem;
    display: flex; align-items: center; gap: 0.5rem;
  }
  .sa-hero-label::before {
    content: '';
    width: 20px; height: 1.5px;
    background: rgba(148,163,184,0.5);
    display: inline-block;
  }

  .sa-hero-stats {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 0;
  }
  .sa-hero-stat { padding: 0 2rem 0 0; }
  .sa-hero-stat + .sa-hero-stat {
    padding-left: 2rem;
    border-left: 1px solid rgba(255,255,255,0.1);
  }
  .sa-hero-stat-label {
    font-size: 0.75rem; color: rgba(148,163,184,0.85);
    font-weight: 500; margin-bottom: 0.35rem;
  }
  .sa-hero-stat-value {
    font-family: 'DM Serif Display', serif;
    font-size: 2.6rem;
    color: #ffffff;
    line-height: 1;
    letter-spacing: -0.02em;
  }
  .sa-hero-stat-value.pct-good  { color: #4ade80; }
  .sa-hero-stat-value.pct-mid   { color: #fbbf24; }
  .sa-hero-stat-value.pct-low   { color: #f87171; }

  /* progress bar in hero */
  .sa-hero-progress { margin-top: 2rem; }
  .sa-hero-progress-labels {
    display: flex; justify-content: space-between;
    font-size: 0.72rem; color: rgba(148,163,184,0.75);
    margin-bottom: 0.5rem;
  }
  .sa-hero-bar-bg {
    width: 100%; height: 8px;
    background: rgba(255,255,255,0.1);
    border-radius: 99px; overflow: hidden;
    position: relative;
  }
  .sa-hero-bar-fill {
    height: 100%; border-radius: 99px;
    position: relative;
    transition: width 1s cubic-bezier(0.34,1.56,0.64,1);
  }
  .sa-hero-bar-fill.pct-good { background: linear-gradient(90deg, #22c55e, #4ade80); }
  .sa-hero-bar-fill.pct-mid  { background: linear-gradient(90deg, #f59e0b, #fbbf24); }
  .sa-hero-bar-fill.pct-low  { background: linear-gradient(90deg, #ef4444, #f87171); }
  /* 75% marker */
  .sa-hero-bar-bg::after {
    content: '';
    position: absolute;
    left: 75%; top: 0; bottom: 0;
    width: 2px;
    background: rgba(255,255,255,0.35);
  }
  .sa-hero-note {
    display: flex; align-items: center; gap: 0.4rem;
    margin-top: 0.75rem;
    font-size: 0.72rem; color: rgba(148,163,184,0.65);
  }
  .sa-hero-note-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: rgba(255,255,255,0.35); flex-shrink: 0;
  }

  /* ── section heading ── */
  .sa-section-head {
    display: flex; align-items: center; gap: 0.65rem;
    margin-bottom: 1.25rem;
  }
  .sa-section-head-line {
    width: 4px; height: 22px; border-radius: 99px;
    background: linear-gradient(180deg, #0ea5e9, #6366f1);
    flex-shrink: 0;
  }
  .sa-section-head-title {
    font-family: 'DM Serif Display', serif;
    font-size: 1.25rem; color: #0f172a;
    letter-spacing: -0.01em;
  }

  /* ── subject cards grid ── */
  .sa-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .sa-subject-card {
    background: #ffffff;
    border: 1.5px solid #e8eaf0;
    border-radius: 18px;
    padding: 1.35rem 1.5rem;
    box-shadow: 0 2px 12px rgba(15,23,42,0.04);
    transition: all 0.2s cubic-bezier(0.34,1.56,0.64,1);
    position: relative;
    overflow: hidden;
    animation: sa-fadeup 0.4s ease both;
  }
  .sa-subject-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(15,23,42,0.1);
    border-color: #c7d2fe;
  }
  /* coloured top accent */
  .sa-subject-card::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 3px;
    border-radius: 18px 18px 0 0;
  }
  .sa-subject-card.good::before { background: linear-gradient(90deg, #22c55e, #4ade80); }
  .sa-subject-card.mid::before  { background: linear-gradient(90deg, #f59e0b, #fbbf24); }
  .sa-subject-card.low::before  { background: linear-gradient(90deg, #ef4444, #f87171); }

  .sa-card-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.9rem; }
  .sa-card-name { font-weight: 700; color: #0f172a; font-size: 0.95rem; line-height: 1.3; flex: 1; padding-right: 0.5rem; }
  .sa-card-code {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.72rem; font-weight: 500;
    color: #6b7280; background: #f3f4f6;
    padding: 0.2rem 0.6rem; border-radius: 6px; white-space: nowrap;
  }

  /* mini arc progress */
  .sa-card-arc { display: flex; align-items: center; justify-content: space-between; }
  .sa-card-sessions {
    font-size: 0.8rem; color: #6b7280;
  }
  .sa-card-sessions strong { color: #0f172a; font-weight: 700; }

  /* inline bar */
  .sa-card-bar-wrap { margin-top: 0.9rem; }
  .sa-card-bar-bg {
    width: 100%; height: 5px; background: #f1f5f9;
    border-radius: 99px; overflow: hidden;
  }
  .sa-card-bar-fill { height: 100%; border-radius: 99px; transition: width 0.8s ease; }
  .sa-card-bar-fill.good { background: linear-gradient(90deg, #22c55e, #4ade80); }
  .sa-card-bar-fill.mid  { background: linear-gradient(90deg, #f59e0b, #fbbf24); }
  .sa-card-bar-fill.low  { background: linear-gradient(90deg, #ef4444, #f87171); }

  .sa-pct-badge {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.78rem; font-weight: 700;
    padding: 0.22rem 0.6rem; border-radius: 7px;
  }
  .sa-pct-badge.good { background: #dcfce7; color: #166534; }
  .sa-pct-badge.mid  { background: #fef3c7; color: #92400e; }
  .sa-pct-badge.low  { background: #fee2e2; color: #991b1b; }

  /* ── detailed table ── */
  .sa-table-wrap {
    border: 1.5px solid #e8eaf0;
    border-radius: 18px;
    overflow: hidden;
    box-shadow: 0 2px 15px rgba(15,23,42,0.05);
    background: #fff;
  }
  .sa-table { width: 100%; border-collapse: collapse; }
  .sa-table thead { background: linear-gradient(135deg, #f8faff, #eef2ff); }
  .sa-table th {
    padding: 0.9rem 1.4rem;
    text-align: left;
    font-size: 0.7rem; font-weight: 700;
    color: #6366f1; letter-spacing: 0.08em; text-transform: uppercase;
  }
  .sa-table th.center { text-align: center; }
  .sa-table tbody tr { border-top: 1px solid #f1f5f9; transition: background 0.15s; }
  .sa-table tbody tr:hover { background: #fafbff; }
  .sa-table td { padding: 1rem 1.4rem; font-size: 0.875rem; color: #374151; vertical-align: middle; }
  .sa-table td.center { text-align: center; }
  .sa-table-name { font-weight: 600; color: #0f172a; }
  .sa-table-code {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.78rem; color: #6b7280;
    background: #f3f4f6; padding: 0.2rem 0.55rem;
    border-radius: 6px; display: inline-block;
  }
  .sa-table-sessions {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.82rem; color: #374151;
  }

  /* row bar (inside table) */
  .sa-row-bar-wrap { display: flex; align-items: center; gap: 0.65rem; }
  .sa-row-bar-bg { flex: 1; height: 5px; background: #f1f5f9; border-radius: 99px; overflow: hidden; min-width: 60px; }
  .sa-row-bar-fill { height: 100%; border-radius: 99px; }
  .sa-row-bar-fill.good { background: linear-gradient(90deg, #22c55e, #4ade80); }
  .sa-row-bar-fill.mid  { background: linear-gradient(90deg, #f59e0b, #fbbf24); }
  .sa-row-bar-fill.low  { background: linear-gradient(90deg, #ef4444, #f87171); }

  /* ── loading ── */
  .sa-loading {
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    height: 280px; gap: 1.25rem;
  }
  .sa-spinner {
    width: 44px; height: 44px; border-radius: 50%;
    border: 3px solid #e5e7eb;
    border-top-color: #0ea5e9;
    animation: sa-spin 0.8s linear infinite;
  }
  .sa-loading-text { font-size: 0.875rem; color: #9ca3af; font-weight: 500; }

  /* ── error ── */
  .sa-error {
    display: flex; align-items: center; gap: 0.75rem;
    background: #fff5f5; border: 1.5px solid #fecaca;
    border-radius: 14px; padding: 1rem 1.25rem;
    color: #991b1b; font-size: 0.875rem; font-weight: 500;
    max-width: 860px; margin: 2rem auto;
  }

  /* ── animations ── */
  @keyframes sa-spin { to { transform: rotate(360deg); } }
  @keyframes sa-fadeup {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .sa-hero         { animation: sa-fadeup 0.35s ease both; }
  .sa-section-head { animation: sa-fadeup 0.4s 0.1s ease both; }
  .sa-grid         { animation: sa-fadeup 0.4s 0.15s ease both; }
  .sa-table-wrap   { animation: sa-fadeup 0.4s 0.2s ease both; }
  .sa-subject-card:nth-child(1) { animation-delay: 0.15s; }
  .sa-subject-card:nth-child(2) { animation-delay: 0.2s;  }
  .sa-subject-card:nth-child(3) { animation-delay: 0.25s; }
  .sa-subject-card:nth-child(4) { animation-delay: 0.3s;  }
  .sa-subject-card:nth-child(5) { animation-delay: 0.35s; }
  .sa-subject-card:nth-child(6) { animation-delay: 0.4s;  }

  @media (max-width: 640px) {
    .sa-hero-stats { grid-template-columns: 1fr; gap: 1.25rem; }
    .sa-hero-stat + .sa-hero-stat { padding-left: 0; border-left: none; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 1.25rem; }
    .sa-grid { grid-template-columns: 1fr; }
  }

  /* ── Responsive: all breakpoints ─────────────────────── */

  /* 480px and below — iPhone SE, small phones */
  @media (max-width: 480px) {
    .sa-root { padding: 1rem 0.75rem; }

    .sa-title-icon { width: 36px; height: 36px; border-radius: 11px; }
    .sa-title-text { font-size: 1.35rem; }

    .sa-hero { padding: 1.4rem 1.25rem; border-radius: 18px; }
    .sa-hero-label { font-size: 0.65rem; margin-bottom: 1rem; }
    .sa-hero-stats { grid-template-columns: 1fr; gap: 1rem; }
    .sa-hero-stat + .sa-hero-stat { padding-left: 0; border-left: none; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 1rem; }
    .sa-hero-stat-value { font-size: 2rem; }
    .sa-hero-progress { margin-top: 1.25rem; }
    .sa-hero-progress-labels { font-size: 0.65rem; flex-wrap: wrap; gap: 0.25rem; }

    .sa-section-head-title { font-size: 1.05rem; }

    .sa-grid { grid-template-columns: 1fr; gap: 0.75rem; margin-bottom: 1rem; }
    .sa-subject-card { padding: 1rem 1.1rem; border-radius: 14px; }
    .sa-card-name { font-size: 0.88rem; }

    .sa-table-wrap { border-radius: 14px; overflow-x: auto; }
    .sa-table { min-width: 480px; }
    .sa-table th { padding: 0.7rem 0.85rem; font-size: 0.62rem; }
    .sa-table td { padding: 0.75rem 0.85rem; font-size: 0.8rem; }
    .sa-row-bar-bg { min-width: 40px; }
  }

  /* 481px – 640px — iPhone XR, iPhone 12 Pro, Pixel 7, Galaxy S8+ */
  @media (min-width: 481px) and (max-width: 640px) {
    .sa-root { padding: 1.25rem 1rem; }
    .sa-title-text { font-size: 1.55rem; }
    .sa-hero { padding: 1.6rem 1.5rem; border-radius: 20px; }
    .sa-hero-stats { grid-template-columns: 1fr; gap: 1.1rem; }
    .sa-hero-stat + .sa-hero-stat { padding-left: 0; border-left: none; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 1.1rem; }
    .sa-hero-stat-value { font-size: 2.2rem; }
    .sa-grid { grid-template-columns: 1fr; gap: 0.85rem; }
    .sa-table-wrap { overflow-x: auto; }
    .sa-table { min-width: 520px; }
    .sa-table th { padding: 0.75rem 1rem; }
    .sa-table td { padding: 0.85rem 1rem; }
  }

  /* 641px – 768px — iPhone 14 Pro Max, Galaxy S20 Ultra, Surface Duo */
  @media (min-width: 641px) and (max-width: 768px) {
    .sa-root { padding: 1.5rem 1.25rem; }
    .sa-title-text { font-size: 1.7rem; }
    .sa-hero { padding: 1.75rem 1.75rem; }
    .sa-hero-stats { grid-template-columns: 1fr 1fr; gap: 1.25rem; }
    .sa-hero-stat + .sa-hero-stat { padding-left: 1.25rem; border-left: 1px solid rgba(255,255,255,0.1); border-top: none; padding-top: 0; }
    .sa-hero-stat:last-child { grid-column: 1 / -1; border-left: none; padding-left: 0; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 1.1rem; }
    .sa-hero-stat-value { font-size: 2.3rem; }
    .sa-grid { grid-template-columns: repeat(2, 1fr); }
    .sa-table-wrap { overflow-x: auto; }
    .sa-table { min-width: 560px; }
  }

  /* 769px – 1024px — iPad Mini, iPad Air, iPad Pro, Surface Pro 7, Galaxy Z Fold 5 */
  @media (min-width: 769px) and (max-width: 1024px) {
    .sa-root { padding: 2rem 1.5rem; }
    .sa-hero { padding: 2rem 2rem; }
    .sa-hero-stats { grid-template-columns: 1fr 1fr 1fr; }
    .sa-hero-stat-value { font-size: 2.4rem; }
    .sa-grid { grid-template-columns: repeat(2, 1fr); }
    .sa-table th { padding: 0.85rem 1.1rem; }
    .sa-table td { padding: 0.9rem 1.1rem; }
  }

  /* 1025px – 1280px — Nest Hub, Asus Zenbook Fold, Samsung A51/71 landscape */
  @media (min-width: 1025px) and (max-width: 1280px) {
    .sa-root { padding: 2rem 1.75rem; }
    .sa-grid { grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); }
  }

  /* ── subject card clickable ── */
  .sa-subject-card { cursor: pointer; }
  .sa-card-click-hint {
    font-size: 0.7rem; color: #9ca3af; margin-top: 0.6rem;
    display: flex; align-items: center; gap: 0.3rem;
    transition: color 0.2s;
  }
  .sa-subject-card:hover .sa-card-click-hint { color: #6366f1; }
  .sa-card-click-hint svg { transition: transform 0.25s; }
  .sa-subject-card.expanded .sa-card-click-hint svg { transform: rotate(180deg); }

  /* ── detail panel ── */
  .sa-detail-panel {
    margin-top: 1rem;
    border-top: 1.5px solid #f1f5f9;
    padding-top: 1rem;
    animation: sa-fadeup 0.25s ease both;
  }
  .sa-detail-loading {
    text-align: center; padding: 0.75rem 0;
    font-size: 0.78rem; color: #9ca3af;
    display: flex; align-items: center; justify-content: center; gap: 0.5rem;
  }
  .sa-detail-mini-spin {
    width: 14px; height: 14px; border-radius: 50%;
    border: 2px solid #e5e7eb; border-top-color: #6366f1;
    animation: sa-spin 0.7s linear infinite; flex-shrink: 0;
  }
  .sa-detail-error { font-size: 0.78rem; color: #dc2626; padding: 0.5rem 0; }
  .sa-detail-empty { font-size: 0.78rem; color: #9ca3af; padding: 0.5rem 0; }

  .sa-detail-list {
    display: flex; flex-direction: column; gap: 0.45rem;
    max-height: 220px; overflow-y: auto;
    padding-right: 2px;
  }
  .sa-detail-list::-webkit-scrollbar { width: 4px; }
  .sa-detail-list::-webkit-scrollbar-track { background: #f1f5f9; border-radius: 99px; }
  .sa-detail-list::-webkit-scrollbar-thumb { background: #c7d2fe; border-radius: 99px; }

  .sa-detail-row {
    display: flex; align-items: center; justify-content: space-between;
    padding: 0.4rem 0.65rem;
    border-radius: 8px;
    background: #f8faff;
    border: 1px solid #eef2ff;
  }
  .sa-detail-date {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.76rem; color: #374151; font-weight: 500;
  }
  .sa-detail-badge {
    font-size: 0.7rem; font-weight: 700;
    padding: 0.15rem 0.55rem; border-radius: 5px;
    display: flex; align-items: center; gap: 0.3rem;
  }
  .sa-detail-badge.present { background: #dcfce7; color: #166534; }
  .sa-detail-badge.absent  { background: #fee2e2; color: #991b1b; }
`;

/* ─── Helpers ──────────────────────────────────────────────── */
const getClass = (pct) => {
  if (pct >= 75) return 'good';
  if (pct >= 50) return 'mid';
  return 'low';
};

/* ─── Component ────────────────────────────────────────────── */
const StudentAttendance = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  // Subject detail state (day-by-day log)
  const [expandedSubject, setExpandedSubject] = useState(null); // subjectId
  const [subjectDetail, setSubjectDetail] = useState({});       // { [subjectId]: { loading, error, records } }

  useEffect(() => {
    const fetchAttendance = async () => {
      const token = sessionStorage.getItem('authToken');
      if (!token) {
        setError('No authentication token found. Please log in again.');
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get('http://localhost:5000/api/student/attendance', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.success) {
          setData(res.data.data);
        } else {
          setError(res.data.message);
        }
      } catch (err) {
        console.error('Attendance fetch error:', err);

        if (err.response) {
          const { status, data } = err.response;
          switch (status) {
            case 401:
              setError('Your session has expired. Please log in again.');
              sessionStorage.removeItem('authToken');
              sessionStorage.removeItem('userRole');
              setTimeout(() => navigate('/'), 2000);
              break;
            case 403:
              setError('You do not have permission to view attendance.');
              break;
            case 404:
              setError('Student record not found.');
              break;
            default:
              setError(data?.message || 'Failed to load attendance data.');
          }
        } else if (err.request) {
          setError('Network error. Please check your connection.');
        } else {
          setError('An unexpected error occurred.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, [navigate]);

  // Toggle subject card and fetch day-by-day detail
  const handleCardClick = async (subjectId) => {
    if (expandedSubject === subjectId) {
      setExpandedSubject(null);
      return;
    }
    setExpandedSubject(subjectId);
    if (subjectDetail[subjectId]) return; // already fetched

    setSubjectDetail(prev => ({ ...prev, [subjectId]: { loading: true, error: null, records: [] } }));
    try {
      const token = sessionStorage.getItem('authToken');
      const res = await axios.get(
        `http://localhost:5000/api/student/attendance/subject/${subjectId}/detail`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) {
        setSubjectDetail(prev => ({ ...prev, [subjectId]: { loading: false, error: null, records: res.data.data } }));
      } else {
        setSubjectDetail(prev => ({ ...prev, [subjectId]: { loading: false, error: res.data.message, records: [] } }));
      }
    } catch (err) {
      setSubjectDetail(prev => ({ ...prev, [subjectId]: { loading: false, error: 'Failed to load detail.', records: [] } }));
    }
  };

  /* ── loading ── */
  if (loading) {
    return (
      <>
        <style>{styles}</style>
        <div className="sa-root">
          <div className="sa-loading">
            <div className="sa-spinner" />
            <span className="sa-loading-text">Loading your attendance…</span>
          </div>
        </div>
      </>
    );
  }

  /* ── error ── */
  if (error) {
    return (
      <>
        <style>{styles}</style>
        <div className="sa-root">
          <div className="sa-error">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        </div>
      </>
    );
  }

  if (!data) return null;

  const { subjects, overall } = data;
  const overallClass = getClass(overall.percentage);
  const missedSessions = overall.totalSessions - overall.attended;

  return (
    <>
      <style>{styles}</style>
      <div className="sa-root">

        {/* ── Page Title ── */}
        <div className="sa-title-row">
          <div className="sa-title-icon">
            <BookOpen size={20} color="#fff" />
          </div>
          <h1 className="sa-title-text">My <em>Attendance</em> Report</h1>
        </div>

        {/* ── Hero Overall Card ── */}
        <div className="sa-hero">
          <div className="sa-hero-inner">
            <div className="sa-hero-label">Overall Summary — Current Semester</div>

            <div className="sa-hero-stats">
              <div className="sa-hero-stat">
                <div className="sa-hero-stat-label">Total Sessions</div>
                <div className="sa-hero-stat-value">{overall.totalSessions}</div>
              </div>
              <div className="sa-hero-stat">
                <div className="sa-hero-stat-label">Sessions Attended</div>
                <div className="sa-hero-stat-value">{overall.attended}</div>
              </div>
              <div className="sa-hero-stat">
                <div className="sa-hero-stat-label">Attendance</div>
                <div className={`sa-hero-stat-value pct-${overallClass}`}>
                  {overall.percentage.toFixed(1)}%
                </div>
              </div>
            </div>

            <div className="sa-hero-progress">
              <div className="sa-hero-progress-labels">
                <span>{overall.attended} attended · {missedSessions} missed</span>
                <span>75% required</span>
              </div>
              <div className="sa-hero-bar-bg">
                <div
                  className={`sa-hero-bar-fill pct-${overallClass}`}
                  style={{ width: `${Math.min(overall.percentage, 100)}%` }}
                />
              </div>
              <div className="sa-hero-note">
                <span className="sa-hero-note-dot" />
                Minimum 75% attendance required for exam eligibility
              </div>
            </div>
          </div>
        </div>

        {/* ── Subject Cards ── */}
        <div className="sa-section-head">
          <div className="sa-section-head-line" />
          <h2 className="sa-section-head-title">Subject-wise Breakdown</h2>
        </div>

        <div className="sa-grid">
          {subjects.map((sub) => {
            const cls = getClass(sub.percentage);
            const isExpanded = expandedSubject === sub._id;
            const detail = subjectDetail[sub._id];
            return (
              <div
                key={sub.code}
                className={`sa-subject-card ${cls} ${isExpanded ? 'expanded' : ''}`}
                onClick={() => handleCardClick(sub._id)}
              >
                <div className="sa-card-top">
                  <div className="sa-card-name">{sub.subject}</div>
                  <span className="sa-card-code">{sub.code}</span>
                </div>
                <div className="sa-card-arc">
                  <div className="sa-card-sessions">
                    <strong>{sub.attended}</strong> / {sub.totalSessions} sessions
                  </div>
                  <span className={`sa-pct-badge ${cls}`}>{sub.percentage.toFixed(1)}%</span>
                </div>
                <div className="sa-card-bar-wrap">
                  <div className="sa-card-bar-bg">
                    <div
                      className={`sa-card-bar-fill ${cls}`}
                      style={{ width: `${Math.min(sub.percentage, 100)}%` }}
                    />
                  </div>
                </div>
                <div className="sa-card-click-hint">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {isExpanded ? 'Hide date-wise log' : 'Click to view date-wise log'}
                </div>

                {/* ── Detail Panel ── */}
                {isExpanded && (
                  <div className="sa-detail-panel" onClick={e => e.stopPropagation()}>
                    {detail?.loading && (
                      <div className="sa-detail-loading">
                        <div className="sa-detail-mini-spin" /> Loading…
                      </div>
                    )}
                    {detail?.error && (
                      <div className="sa-detail-error">{detail.error}</div>
                    )}
                    {detail && !detail.loading && !detail.error && detail.records.length === 0 && (
                      <div className="sa-detail-empty">No sessions recorded yet.</div>
                    )}
                    {detail && !detail.loading && detail.records.length > 0 && (
                      <div className="sa-detail-list">
                        {detail.records.map((rec) => (
                          <div key={rec.date} className="sa-detail-row">
                            <span className="sa-detail-date">{rec.date}</span>
                            <span className={`sa-detail-badge ${rec.status}`}>
                              {rec.status === 'present' ? '✓ Present' : '✕ Absent'}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ── Detailed Table ── */}
        <div className="sa-section-head" style={{ marginTop: '0.5rem' }}>
          <div className="sa-section-head-line" />
          <h2 className="sa-section-head-title">Detailed View</h2>
        </div>

        <div className="sa-table-wrap">
          <table className="sa-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Subject</th>
                <th>Code</th>
                <th className="center">Attended / Total</th>
                <th>Attendance</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((sub, idx) => {
                const cls = getClass(sub.percentage);
                return (
                  <tr key={sub.code}>
                    <td style={{ color:'#c7d2fe', fontFamily:"'JetBrains Mono',monospace", fontSize:'0.75rem' }}>
                      {String(idx + 1).padStart(2, '0')}
                    </td>
                    <td><span className="sa-table-name">{sub.subject}</span></td>
                    <td><span className="sa-table-code">{sub.code}</span></td>
                    <td className="center">
                      <span className="sa-table-sessions">{sub.attended} / {sub.totalSessions}</span>
                    </td>
                    <td>
                      <div className="sa-row-bar-wrap">
                        <div className="sa-row-bar-bg">
                          <div
                            className={`sa-row-bar-fill ${cls}`}
                            style={{ width: `${Math.min(sub.percentage, 100)}%` }}
                          />
                        </div>
                        <span className={`sa-pct-badge ${cls}`}>{sub.percentage.toFixed(1)}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>
    </>
  );
};

export default StudentAttendance;