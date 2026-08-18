import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, AlertCircle, Save, BarChart2, BookOpen, Users, Calendar, TrendingUp, X, Pencil, FileDown, FileSpreadsheet } from 'lucide-react';

/* ─── Design tokens ─────────────────────────────────────── */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

  .att-root * { box-sizing: border-box; }
  .att-root { font-family: 'Outfit', sans-serif; }

  /* animated gradient background */
  .att-root {
    min-height: 100vh;
    background: #f0f4ff;
    background-image:
      radial-gradient(ellipse at 10% 20%, rgba(99,102,241,0.08) 0%, transparent 50%),
      radial-gradient(ellipse at 90% 80%, rgba(16,185,129,0.07) 0%, transparent 50%);
    padding: 2rem;
  }

  /* ── card shell ── */
  .att-card {
    max-width: 1100px;
    margin: 0 auto;
    background: #ffffff;
    border-radius: 24px;
    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05), 0 20px 60px -10px rgba(99,102,241,0.12);
    overflow: hidden;
  }

  /* ── header ── */
  .att-header {
    background: linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1d4ed8 100%);
    padding: 2rem 2.5rem 0;
    position: relative;
    overflow: hidden;
  }
  .att-header::before {
    content: '';
    position: absolute;
    inset: 0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  }
  .att-header-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.5rem;
  }
  .att-header-title {
    color: #ffffff;
    font-size: 1.5rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }
  .att-header-title span {
    background: linear-gradient(90deg, #a5b4fc, #6ee7b7);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .att-date-badge {
    background: rgba(255,255,255,0.1);
    border: 1px solid rgba(255,255,255,0.15);
    color: rgba(255,255,255,0.8);
    padding: 0.4rem 1rem;
    border-radius: 50px;
    font-size: 0.8rem;
    font-family: 'JetBrains Mono', monospace;
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }

  /* ── tabs ── */
  .att-tabs {
    display: flex;
    gap: 0.25rem;
    position: relative;
    z-index: 1;
  }
  .att-tab {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    font-size: 0.875rem;
    font-weight: 500;
    font-family: 'Outfit', sans-serif;
    border: none;
    cursor: pointer;
    border-radius: 12px 12px 0 0;
    transition: all 0.2s;
    color: rgba(255,255,255,0.55);
    background: transparent;
  }
  .att-tab:hover { color: rgba(255,255,255,0.85); background: rgba(255,255,255,0.06); }
  .att-tab.active {
    background: #f0f4ff;
    color: #4338ca;
    font-weight: 600;
  }

  /* ── body ── */
  .att-body { padding: 2rem 2.5rem; }

  /* ── subject grid ── */
  .att-subject-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;
  }
  .att-subject-card {
    border: 2px solid #e5e7eb;
    border-radius: 16px;
    padding: 1.25rem;
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.34,1.56,0.64,1);
    background: #fff;
    position: relative;
    overflow: hidden;
  }
  .att-subject-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, #6366f1, #3b82f6);
    opacity: 0;
    transition: opacity 0.2s;
  }
  .att-subject-card:hover { transform: translateY(-3px); box-shadow: 0 10px 30px rgba(99,102,241,0.15); border-color: #a5b4fc; }
  .att-subject-card.active { border-color: transparent; box-shadow: 0 8px 25px rgba(99,102,241,0.3); transform: translateY(-3px); }
  .att-subject-card.active::before { opacity: 1; }
  .att-subject-card-inner { position: relative; z-index: 1; }
  .att-subject-name { font-size: 0.95rem; font-weight: 600; color: #1e1b4b; transition: color 0.2s; }
  .att-subject-card.active .att-subject-name { color: #ffffff; }
  .att-subject-meta { font-size: 0.78rem; color: #9ca3af; margin-top: 0.3rem; font-family: 'JetBrains Mono', monospace; transition: color 0.2s; }
  .att-subject-card.active .att-subject-meta { color: rgba(255,255,255,0.7); }
  .att-subject-chip {
    display: inline-block;
    margin-top: 0.6rem;
    background: #ede9fe;
    color: #6d28d9;
    font-size: 0.7rem;
    font-weight: 600;
    padding: 0.2rem 0.6rem;
    border-radius: 50px;
    transition: all 0.2s;
  }
  .att-subject-card.active .att-subject-chip { background: rgba(255,255,255,0.2); color: #fff; }

  /* ── section heading ── */
  .att-section-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.25rem;
    flex-wrap: wrap;
    gap: 1rem;
  }
  .att-section-title {
    font-size: 1.15rem;
    font-weight: 700;
    color: #1e1b4b;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .att-section-title .dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    background: linear-gradient(135deg, #6366f1, #3b82f6);
  }
  .att-controls { display: flex; gap: 0.75rem; align-items: center; flex-wrap: wrap; }

  /* ── date input ── */
  .att-date-input {
    border: 2px solid #e5e7eb;
    border-radius: 10px;
    padding: 0.45rem 0.9rem;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.85rem;
    color: #374151;
    outline: none;
    transition: border-color 0.2s;
  }
  .att-date-input:focus { border-color: #6366f1; }

  /* ── buttons ── */
  .att-btn-ghost {
    display: flex; align-items: center; gap: 0.4rem;
    padding: 0.45rem 1rem;
    border: 2px solid #d1fae5;
    background: #f0fdf4;
    color: #059669;
    border-radius: 10px;
    font-size: 0.85rem;
    font-weight: 600;
    font-family: 'Outfit', sans-serif;
    cursor: pointer;
    transition: all 0.2s;
  }
  .att-btn-ghost:hover { background: #dcfce7; border-color: #6ee7b7; }

  .att-btn-primary {
    display: flex; align-items: center; gap: 0.5rem;
    padding: 0.65rem 1.5rem;
    background: linear-gradient(135deg, #4f46e5, #2563eb);
    color: #fff;
    border: none;
    border-radius: 12px;
    font-size: 0.9rem;
    font-weight: 600;
    font-family: 'Outfit', sans-serif;
    cursor: pointer;
    transition: all 0.2s;
    box-shadow: 0 4px 15px rgba(79,70,229,0.35);
  }
  .att-btn-primary:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(79,70,229,0.45); }
  .att-btn-primary:disabled { opacity: 0.5; cursor: not-allowed; transform: none; box-shadow: none; }

  .att-btn-report {
    display: flex; align-items: center; gap: 0.5rem;
    padding: 0.6rem 1.2rem;
    background: linear-gradient(135deg, #4f46e5, #2563eb);
    color: #fff;
    border: none;
    border-radius: 10px;
    font-size: 0.875rem;
    font-weight: 600;
    font-family: 'Outfit', sans-serif;
    cursor: pointer;
    transition: all 0.2s;
    box-shadow: 0 4px 12px rgba(79,70,229,0.3);
  }
  .att-btn-report:hover { opacity: 0.9; transform: translateY(-1px); }
  .att-btn-report:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

  /* ── table ── */
  .att-table-wrap {
    border: 1.5px solid #e5e7eb;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 2px 15px rgba(0,0,0,0.04);
  }
  .att-table { width: 100%; border-collapse: collapse; }
  .att-table thead { background: linear-gradient(135deg, #f8faff, #eef2ff); }
  .att-table th {
    padding: 0.9rem 1.25rem;
    text-align: left;
    font-size: 0.72rem;
    font-weight: 700;
    color: #6366f1;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
  .att-table th.center { text-align: center; }
  .att-table tbody tr { border-top: 1px solid #f1f5f9; transition: background 0.15s; }
  .att-table tbody tr:hover { background: #fafbff; }
  .att-table td { padding: 1rem 1.25rem; font-size: 0.875rem; color: #374151; vertical-align: middle; }
  .att-table td.center { text-align: center; }
  .att-enroll {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.8rem;
    color: #6b7280;
    background: #f3f4f6;
    padding: 0.25rem 0.6rem;
    border-radius: 6px;
    display: inline-block;
  }
  .att-student-name { font-weight: 600; color: #1e1b4b; }
  .att-student-sub { font-size: 0.75rem; color: #9ca3af; margin-top: 1px; }

  /* ── attendance % badge ── */
  .att-pct-wrap { display: flex; align-items: center; gap: 0.6rem; }
  .att-pct-bar-bg { flex: 1; height: 6px; background: #e5e7eb; border-radius: 99px; overflow: hidden; min-width: 60px; }
  .att-pct-bar-fill { height: 100%; border-radius: 99px; transition: width 0.5s ease; }
  .att-pct-badge {
    font-size: 0.78rem;
    font-weight: 700;
    font-family: 'JetBrains Mono', monospace;
    padding: 0.2rem 0.55rem;
    border-radius: 6px;
    white-space: nowrap;
  }
  .pct-high { background: #dcfce7; color: #166534; }
  .pct-high .att-pct-bar-fill { background: linear-gradient(90deg, #22c55e, #16a34a); }
  .pct-mid  { background: #fef3c7; color: #92400e; }
  .pct-mid  .att-pct-bar-fill { background: linear-gradient(90deg, #f59e0b, #d97706); }
  .pct-low  { background: #fee2e2; color: #991b1b; }
  .pct-low  .att-pct-bar-fill { background: linear-gradient(90deg, #ef4444, #dc2626); }
  .pct-none { background: #f3f4f6; color: #6b7280; }
  .pct-none .att-pct-bar-fill { background: #d1d5db; }

  /* ── status buttons ── */
  .att-status-wrap { display: flex; justify-content: center; gap: 0.5rem; }
  .att-status-btn {
    padding: 0.4rem 1rem;
    border-radius: 8px;
    border: 2px solid transparent;
    font-size: 0.82rem;
    font-weight: 600;
    font-family: 'Outfit', sans-serif;
    cursor: pointer;
    transition: all 0.15s;
  }
  .att-status-btn.present-inactive { background: #f0fdf4; color: #16a34a; border-color: #bbf7d0; }
  .att-status-btn.present-inactive:hover { background: #dcfce7; }
  .att-status-btn.present-active { background: linear-gradient(135deg, #22c55e, #16a34a); color: #fff; border-color: transparent; box-shadow: 0 3px 10px rgba(22,163,74,0.3); }
  .att-status-btn.absent-inactive { background: #fff5f5; color: #dc2626; border-color: #fecaca; }
  .att-status-btn.absent-inactive:hover { background: #fee2e2; }
  .att-status-btn.absent-active { background: linear-gradient(135deg, #f87171, #dc2626); color: #fff; border-color: transparent; box-shadow: 0 3px 10px rgba(220,38,38,0.3); }

  /* ── report status badge ── */
  .att-report-badge {
    display: inline-flex; align-items: center; gap: 0.35rem;
    padding: 0.3rem 0.9rem;
    border-radius: 50px;
    font-size: 0.82rem;
    font-weight: 600;
  }
  .badge-present { background: #dcfce7; color: #166534; }
  .badge-absent  { background: #fee2e2; color: #991b1b; }
  .badge-dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; }

  /* ── summary bar ── */
  .att-summary {
    display: flex; gap: 1rem; margin-bottom: 1.5rem; flex-wrap: wrap;
  }
  .att-stat-pill {
    display: flex; align-items: center; gap: 0.5rem;
    padding: 0.5rem 1rem;
    border-radius: 50px;
    font-size: 0.82rem;
    font-weight: 600;
    border: 1.5px solid;
  }
  .pill-total   { background: #eef2ff; color: #4338ca; border-color: #c7d2fe; }
  .pill-present { background: #f0fdf4; color: #166534; border-color: #bbf7d0; }
  .pill-absent  { background: #fff5f5; color: #991b1b; border-color: #fecaca; }

  /* ── loading skeleton ── */
  @keyframes shimmer { 0%{background-position:-400px 0} 100%{background-position:400px 0} }
  .att-skeleton {
    background: linear-gradient(90deg, #f0f4ff 25%, #e5e7eb 50%, #f0f4ff 75%);
    background-size: 800px 100%;
    animation: shimmer 1.4s infinite linear;
    border-radius: 8px;
  }

  /* ── message ── */
  .att-message {
    display: flex; align-items: center; gap: 0.6rem;
    padding: 0.85rem 1.25rem;
    border-radius: 12px;
    font-size: 0.875rem;
    font-weight: 500;
    margin-top: 1.25rem;
    animation: slideIn 0.3s ease;
  }
  @keyframes slideIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:none} }
  .msg-success { background: #f0fdf4; color: #166534; border: 1.5px solid #bbf7d0; }
  .msg-error   { background: #fff5f5; color: #991b1b; border: 1.5px solid #fecada; }
  .msg-info    { background: #eef2ff; color: #3730a3; border: 1.5px solid #c7d2fe; }

  /* ── report form ── */
  .att-report-form {
    display: flex; flex-wrap: wrap; gap: 1rem; align-items: flex-end;
    background: #f8faff;
    border: 1.5px solid #e5e7eb;
    border-radius: 16px;
    padding: 1.25rem;
    margin-bottom: 1.5rem;
  }
  .att-form-group { display: flex; flex-direction: column; gap: 0.4rem; flex: 1; min-width: 180px; }
  .att-form-label { font-size: 0.78rem; font-weight: 600; color: #6366f1; letter-spacing: 0.05em; text-transform: uppercase; }
  .att-form-select, .att-form-date {
    border: 2px solid #e5e7eb;
    border-radius: 10px;
    padding: 0.55rem 0.9rem;
    font-family: 'Outfit', sans-serif;
    font-size: 0.875rem;
    color: #374151;
    background: #fff;
    outline: none;
    transition: border-color 0.2s;
  }
  .att-form-select:focus, .att-form-date:focus { border-color: #6366f1; }

  /* ── empty state ── */
  .att-empty {
    text-align: center; padding: 3rem 1rem;
    color: #9ca3af; font-size: 0.9rem;
  }
  .att-empty-icon { font-size: 2.5rem; margin-bottom: 0.75rem; opacity: 0.4; }

  /* ── save row ── */
  .att-save-row { display: flex; justify-content: flex-end; margin-top: 1.5rem; }

  /* ── already-marked banner ── */
  .att-already-banner {
    display: flex; align-items: flex-start; gap: 0.75rem;
    background: #fffbeb; border: 1.5px solid #fcd34d;
    border-radius: 14px; padding: 1rem 1.25rem;
    margin-bottom: 1.25rem; animation: slideIn 0.3s ease;
  }
  .att-already-banner-icon { font-size: 1.4rem; line-height: 1; flex-shrink: 0; }
  .att-already-banner-title { font-weight: 700; color: #92400e; font-size: 0.9rem; margin-bottom: 0.2rem; }
  .att-already-banner-sub { font-size: 0.82rem; color: #b45309; }

  /* ── edit panel ── */
  .att-edit-panel {
    background: #f8faff; border: 1.5px solid #c7d2fe;
    border-radius: 16px; padding: 1.25rem 1.5rem;
    margin-bottom: 1.5rem; animation: slideIn 0.25s ease;
  }
  .att-edit-panel-title { font-size: 0.88rem; font-weight: 700; color: #4338ca; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.4rem; }
  .att-edit-row { display: flex; gap: 0.75rem; align-items: flex-end; flex-wrap: wrap; }
  .att-edit-group { display: flex; flex-direction: column; gap: 0.3rem; }
  .att-edit-label { font-size: 0.72rem; font-weight: 600; color: #6366f1; text-transform: uppercase; letter-spacing: 0.05em; }
  .att-edit-input {
    border: 2px solid #e5e7eb; border-radius: 8px;
    padding: 0.45rem 0.75rem; font-family: 'JetBrains Mono', monospace;
    font-size: 0.82rem; color: #374151; outline: none;
    transition: border-color 0.2s; background: #fff;
  }
  .att-edit-input:focus { border-color: #6366f1; }
  .att-edit-select {
    border: 2px solid #e5e7eb; border-radius: 8px;
    padding: 0.45rem 0.75rem; font-family: 'Outfit', sans-serif;
    font-size: 0.85rem; color: #374151; outline: none;
    transition: border-color 0.2s; background: #fff; cursor: pointer;
  }
  .att-edit-select:focus { border-color: #6366f1; }
  .att-edit-btn-save {
    display: flex; align-items: center; gap: 0.4rem;
    padding: 0.5rem 1.1rem; background: linear-gradient(135deg, #4f46e5, #2563eb);
    color: #fff; border: none; border-radius: 8px;
    font-size: 0.82rem; font-weight: 600; font-family: 'Outfit', sans-serif;
    cursor: pointer; transition: all 0.2s;
    box-shadow: 0 3px 10px rgba(79,70,229,0.3);
  }
  .att-edit-btn-save:disabled { opacity: 0.5; cursor: not-allowed; }
  .att-edit-btn-cancel {
    padding: 0.5rem 1rem; background: #f3f4f6; color: #6b7280;
    border: 2px solid #e5e7eb; border-radius: 8px;
    font-size: 0.82rem; font-weight: 600; font-family: 'Outfit', sans-serif;
    cursor: pointer; transition: all 0.2s;
  }
  .att-edit-btn-cancel:hover { background: #e5e7eb; }
  .att-edit-btn-icon {
    background: none; border: none; cursor: pointer;
    color: #9ca3af; padding: 0.25rem; border-radius: 6px;
    transition: all 0.15s; display: flex; align-items: center;
  }
  .att-edit-btn-icon:hover { background: #eef2ff; color: #4338ca; }

  /* ── report sessions info ── */
  .att-report-info {
    display: flex; align-items: center; gap: 0.5rem;
    background: #eef2ff; border: 1.5px solid #c7d2fe;
    border-radius: 10px; padding: 0.6rem 1rem;
    font-size: 0.82rem; font-weight: 600; color: #4338ca;
    margin-bottom: 1.25rem;
  }

  /* ── download buttons ── */
  .att-download-row { display: flex; gap: 0.65rem; margin-bottom: 1rem; flex-wrap: wrap; }
  .att-btn-pdf {
    display: flex; align-items: center; gap: 0.4rem;
    padding: 0.5rem 1.1rem;
    background: linear-gradient(135deg, #dc2626, #b91c1c);
    color: #fff; border: none; border-radius: 10px;
    font-size: 0.82rem; font-weight: 600; font-family: 'Outfit', sans-serif;
    cursor: pointer; transition: all 0.2s;
    box-shadow: 0 3px 10px rgba(220,38,38,0.28);
  }
  .att-btn-pdf:hover { transform: translateY(-1px); box-shadow: 0 5px 15px rgba(220,38,38,0.38); }
  .att-btn-excel {
    display: flex; align-items: center; gap: 0.4rem;
    padding: 0.5rem 1.1rem;
    background: linear-gradient(135deg, #16a34a, #15803d);
    color: #fff; border: none; border-radius: 10px;
    font-size: 0.82rem; font-weight: 600; font-family: 'Outfit', sans-serif;
    cursor: pointer; transition: all 0.2s;
    box-shadow: 0 3px 10px rgba(22,163,74,0.28);
  }
  .att-btn-excel:hover { transform: translateY(-1px); box-shadow: 0 5px 15px rgba(22,163,74,0.38); }

  /* ── Responsive: all breakpoints ─────────────────────── */

  /* 480px and below — iPhone SE, small phones */
  @media (max-width: 480px) {
    .att-root { padding: 0.75rem; }

    .att-card { border-radius: 16px; }

    .att-header { padding: 1.25rem 1rem 0; }
    .att-header-top { margin-bottom: 1rem; flex-wrap: wrap; gap: 0.5rem; }
    .att-header-title { font-size: 1.05rem; gap: 0.4rem; }
    .att-date-badge { font-size: 0.7rem; padding: 0.3rem 0.65rem; }

    .att-tabs { gap: 0.15rem; overflow-x: auto; }
    .att-tab { padding: 0.6rem 0.85rem; font-size: 0.78rem; gap: 0.3rem; white-space: nowrap; flex-shrink: 0; }

    .att-body { padding: 1rem 0.85rem; }

    .att-subject-grid { grid-template-columns: 1fr; gap: 0.65rem; margin-bottom: 1.25rem; }

    .att-section-head { flex-direction: column; align-items: flex-start; gap: 0.65rem; }
    .att-controls { width: 100%; }
    .att-date-input { flex: 1; min-width: 0; font-size: 0.78rem; }
    .att-btn-ghost { font-size: 0.78rem; padding: 0.4rem 0.75rem; }

    .att-summary { gap: 0.5rem; }
    .att-stat-pill { font-size: 0.75rem; padding: 0.4rem 0.75rem; }

    .att-table-wrap { border-radius: 12px; overflow-x: auto; }
    .att-table { min-width: 520px; }
    .att-table th { padding: 0.7rem 0.85rem; font-size: 0.62rem; }
    .att-table td { padding: 0.75rem 0.85rem; font-size: 0.8rem; }

    .att-status-wrap { gap: 0.3rem; }
    .att-status-btn { padding: 0.35rem 0.65rem; font-size: 0.75rem; }

    .att-pct-bar-bg { min-width: 40px; }

    .att-btn-primary { font-size: 0.82rem; padding: 0.55rem 1.1rem; }
    .att-save-row { justify-content: stretch; }
    .att-save-row .att-btn-primary { width: 100%; justify-content: center; }

    .att-already-banner { flex-direction: column; gap: 0.5rem; }
    .att-already-banner-title { font-size: 0.82rem; }
    .att-already-banner-sub { font-size: 0.75rem; }

    .att-report-form { padding: 0.85rem; gap: 0.75rem; }
    .att-form-group { min-width: 100%; }
    .att-btn-report { width: 100%; justify-content: center; }

    .att-edit-panel { padding: 1rem; }
    .att-edit-row { flex-direction: column; align-items: stretch; gap: 0.65rem; }
    .att-edit-btn-save, .att-edit-btn-cancel { width: 100%; justify-content: center; }

    .att-download-row { flex-direction: column; }
    .att-btn-pdf, .att-btn-excel { width: 100%; justify-content: center; }

    .att-report-info { font-size: 0.75rem; flex-wrap: wrap; }

    .att-message { font-size: 0.8rem; padding: 0.7rem 1rem; }
  }

  /* 481px – 640px — iPhone XR, iPhone 12 Pro, Pixel 7, Galaxy S8+ */
  @media (min-width: 481px) and (max-width: 640px) {
    .att-root { padding: 1rem; }
    .att-header { padding: 1.4rem 1.25rem 0; }
    .att-header-title { font-size: 1.15rem; }
    .att-body { padding: 1.25rem 1rem; }
    .att-subject-grid { grid-template-columns: repeat(2, 1fr); gap: 0.75rem; }
    .att-section-head { flex-wrap: wrap; }
    .att-controls { flex-wrap: wrap; }
    .att-date-input { font-size: 0.8rem; }
    .att-table-wrap { overflow-x: auto; }
    .att-table { min-width: 540px; }
    .att-table th { padding: 0.75rem 0.9rem; }
    .att-table td { padding: 0.8rem 0.9rem; font-size: 0.82rem; }
    .att-status-btn { padding: 0.35rem 0.7rem; font-size: 0.78rem; }
    .att-report-form { padding: 1rem; }
    .att-form-group { min-width: 100%; }
    .att-btn-report { width: 100%; justify-content: center; }
  }

  /* 641px – 768px — iPhone 14 Pro Max, Galaxy S20 Ultra, Surface Duo */
  @media (min-width: 641px) and (max-width: 768px) {
    .att-root { padding: 1.25rem; }
    .att-header { padding: 1.5rem 1.5rem 0; }
    .att-header-title { font-size: 1.2rem; }
    .att-body { padding: 1.5rem 1.25rem; }
    .att-subject-grid { grid-template-columns: repeat(2, 1fr); gap: 0.85rem; }
    .att-controls { flex-wrap: wrap; }
    .att-table-wrap { overflow-x: auto; }
    .att-table { min-width: 580px; }
    .att-table th { padding: 0.8rem 1rem; }
    .att-table td { padding: 0.85rem 1rem; font-size: 0.84rem; }
    .att-status-btn { padding: 0.38rem 0.8rem; font-size: 0.79rem; }
    .att-report-form { flex-wrap: wrap; }
    .att-form-group { min-width: calc(50% - 0.5rem); }
    .att-btn-report { align-self: flex-end; }
    .att-edit-row { flex-wrap: wrap; }
  }

  /* 769px – 1024px — iPad Mini, iPad Air, iPad Pro, Surface Pro 7, Galaxy Z Fold 5 */
  @media (min-width: 769px) and (max-width: 1024px) {
    .att-root { padding: 1.5rem; }
    .att-card { max-width: 100%; }
    .att-header { padding: 1.75rem 1.75rem 0; }
    .att-body { padding: 1.75rem 1.75rem; }
    .att-subject-grid { grid-template-columns: repeat(2, 1fr); }
    .att-table th { padding: 0.85rem 1rem; }
    .att-table td { padding: 0.9rem 1rem; font-size: 0.86rem; }
    .att-status-btn { padding: 0.38rem 0.85rem; font-size: 0.8rem; }
    .att-form-group { min-width: 160px; }
    .att-edit-row { flex-wrap: wrap; }
  }

  /* 1025px – 1280px — Nest Hub, Asus Zenbook Fold, Samsung A51/71 landscape */
  @media (min-width: 1025px) and (max-width: 1280px) {
    .att-root { padding: 1.75rem; }
    .att-body { padding: 2rem 2rem; }
    .att-subject-grid { grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); }
    .att-table td { font-size: 0.86rem; }
  }
`;

/* ─── Helper ─────────────────────────────────────────────── */
const getPctClass = (pct) => {
  if (pct === null || pct === undefined) return 'pct-none';
  if (pct >= 75) return 'pct-high';
  if (pct >= 50) return 'pct-mid';
  return 'pct-low';
};

const AttendancePct = ({ pct }) => {
  const cls = getPctClass(pct);
  const display = pct !== null && pct !== undefined ? `${pct}%` : 'N/A';
  const width = pct !== null && pct !== undefined ? `${pct}%` : '0%';
  return (
    <div className="att-pct-wrap">
      <div className="att-pct-bar-bg">
        <div className={`att-pct-bar-fill ${cls}`} style={{ width }} />
      </div>
      <span className={`att-pct-badge ${cls}`}>{display}</span>
    </div>
  );
};

/* ─── Main Component ─────────────────────────────────────── */
const AttendancePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('mark');
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [students, setStudents] = useState([]);
  const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendanceDivision, setAttendanceDivision] = useState('A');
  const [reportDivision, setReportDivision] = useState('All');
  const [attendanceTimeSlot, setAttendanceTimeSlot] = useState('09:00 - 10:00');
  const [attendanceStatus, setAttendanceStatus] = useState({});
  const [loading, setLoading] = useState({ subjects: true, students: false });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Report states
  const [reportFromDate, setReportFromDate] = useState(() => {
    const d = new Date(); d.setMonth(d.getMonth() - 1);
    return d.toISOString().split('T')[0];
  });
  const [reportToDate, setReportToDate] = useState(new Date().toISOString().split('T')[0]);
  const [reportStudents, setReportStudents] = useState([]);
  const [reportTotalSessions, setReportTotalSessions] = useState(0);
  const [loadingReport, setLoadingReport] = useState(false);
  const [reportFetched, setReportFetched] = useState(false);

  // Already-marked banner state
  const [alreadyMarkedBanner, setAlreadyMarkedBanner] = useState(false);

  // Edit attendance state
  const [editingRow, setEditingRow] = useState(null); // { studentId, name, currentStatus }
  const [editDate, setEditDate] = useState('');
  const [editStatus, setEditStatus] = useState('');
  const [editSaving, setEditSaving] = useState(false);

  // Attendance percentage state
  const [attendancePct, setAttendancePct] = useState({});
  const [loadingPct, setLoadingPct] = useState(false);

  // Validate token and role on mount
  useEffect(() => {
    const token = sessionStorage.getItem('authToken');
    const role = sessionStorage.getItem('userRole');
    if (!token || role !== 'professor') {
      sessionStorage.removeItem('authToken');
      sessionStorage.removeItem('userRole');
      navigate('/');
      return;
    }
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.role !== 'professor') {
        sessionStorage.removeItem('authToken');
        sessionStorage.removeItem('userRole');
        navigate('/');
      }
    } catch (err) {
      sessionStorage.removeItem('authToken');
      sessionStorage.removeItem('userRole');
      navigate('/');
    }
  }, [navigate]);

  // Fetch subjects on mount
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const token = sessionStorage.getItem('authToken');
        const res = await axios.get('https://cms-backend-wl7u.onrender.com/api/professor/attendance/subjects', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.success) {
          setSubjects(res.data.data);
        } else {
          setMessage({ type: 'error', text: 'Failed to load subjects' });
        }
      } catch (err) {
        setMessage({ type: 'error', text: err.response?.data?.message || 'Server error' });
      } finally {
        setLoading(prev => ({ ...prev, subjects: false }));
      }
    };
    fetchSubjects();
  }, []);

  // Fetch students when subject or division is selected (for marking)
  useEffect(() => {
    if (!selectedSubject?._id) return;
    const fetchStudents = async () => {
      setLoading(prev => ({ ...prev, students: true }));
      try {
        const token = sessionStorage.getItem('authToken');
        const res = await axios.get(`https://cms-backend-wl7u.onrender.com/api/professor/attendance/subjects/${selectedSubject._id}/students`, {
          headers: { Authorization: `Bearer ${token}` },
          params: { division: attendanceDivision }
        });
        if (res.data.success) {
          const studentsData = res.data.data;
          setStudents(studentsData);
          const initialStatus = {};
          studentsData.forEach(s => { initialStatus[s._id] = 'absent'; });
          setAttendanceStatus(initialStatus);
        } else {
          setMessage({ type: 'error', text: res.data.message });
        }
      } catch (err) {
        setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to load students' });
      } finally {
        setLoading(prev => ({ ...prev, students: false }));
      }
    };
    fetchStudents();
  }, [selectedSubject, attendanceDivision]);

  // Fetch attendance percentage for all students in selected subject
  useEffect(() => {
    if (!selectedSubject?._id || students.length === 0) return;
    const fetchPct = async () => {
      setLoadingPct(true);
      try {
        const token = sessionStorage.getItem('authToken');
        const res = await axios.get(
          `https://cms-backend-wl7u.onrender.com/api/professor/attendance/subject/${selectedSubject._id}/percentage`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (res.data.success) {
          // Expected: res.data.data = [{ studentId, percentage }]
          const map = {};
          res.data.data.forEach(item => { map[item.studentId] = item.percentage; });
          setAttendancePct(map);
        }
      } catch (err) {
        // Silently fail — percentage is a nice-to-have enhancement
        console.error('Could not fetch attendance percentages:', err);
      } finally {
        setLoadingPct(false);
      }
    };
    fetchPct();
  }, [selectedSubject, students]);

  // Fetch attendance report for a subject over a date range
  const fetchAttendanceReport = async () => {
    if (!selectedSubject?._id || !reportFromDate || !reportToDate) {
      setMessage({ type: 'error', text: 'Please select a subject and both dates' });
      return;
    }
    if (reportFromDate > reportToDate) {
      setMessage({ type: 'error', text: '"From" date cannot be after "To" date' });
      return;
    }
    setLoadingReport(true);
    setReportFetched(false);
    setReportStudents([]);
    setReportTotalSessions(0);
    try {
      const token = sessionStorage.getItem('authToken');
      const res = await axios.get(
        `https://cms-backend-wl7u.onrender.com/api/professor/attendance/subject/${selectedSubject._id}/range`,
        { headers: { Authorization: `Bearer ${token}` }, params: { fromDate: reportFromDate, toDate: reportToDate, division: reportDivision } }
      );
      if (res.data.success) {
        setReportStudents(res.data.data);
        setReportTotalSessions(res.data.totalSessions);
        setReportFetched(true);
      } else {
        setMessage({ type: 'error', text: res.data.message });
      }
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to load report' });
    } finally {
      setLoadingReport(false);
    }
  };

  const handleStatusChange = (studentId, status) => {
    setAttendanceStatus(prev => ({ ...prev, [studentId]: status }));
  };

  const markAllPresent = () => {
    const allPresent = {};
    students.forEach(s => { allPresent[s._id] = 'present'; });
    setAttendanceStatus(allPresent);
  };

  const submitEdit = async () => {
    if (!editingRow || !editDate || !editStatus) return;
    setEditSaving(true);
    try {
      const token = sessionStorage.getItem('authToken');
      const res = await axios.put('https://cms-backend-wl7u.onrender.com/api/professor/attendance/edit', {
        subjectId: selectedSubject._id,
        studentId: editingRow.studentId,
        date: editDate,
        status: editStatus,
      }, { headers: { Authorization: `Bearer ${token}` } });
      if (res.data.success) {
        setMessage({ type: 'success', text: `Attendance updated for ${editingRow.name} on ${editDate}` });
        setEditingRow(null);
        // Refresh report
        fetchAttendanceReport();
      } else {
        setMessage({ type: 'error', text: res.data.message });
      }
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to update attendance' });
    } finally {
      setEditSaving(false);
    }
  };

  const submitAttendance = async () => {
    if (!selectedSubject?._id || !attendanceDate) {
      setMessage({ type: 'error', text: 'Please select a subject and date' });
      return;
    }
    if (students.length === 0) {
      setMessage({ type: 'error', text: 'No students to mark attendance for this subject.' });
      return;
    }
    const payload = {
      subjectId: selectedSubject._id,
      date: attendanceDate,
      timeSlot: attendanceTimeSlot,
      division: attendanceDivision,
      UserRole: 'professor',
      attendance: students.map(s => ({
        studentId: s._id,
        status: attendanceStatus[s._id] || 'absent',
      })),
    };
    setSaving(true);
    setMessage({ type: '', text: '' });
    setAlreadyMarkedBanner(false);
    try {
      const token = sessionStorage.getItem('authToken');
      const res = await axios.post('https://cms-backend-wl7u.onrender.com/api/professor/attendance/mark', payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        setMessage({ type: 'success', text: 'Attendance saved successfully!' });
      } else {
        setMessage({ type: 'error', text: res.data.message });
      }
    } catch (err) {
      if (err.response?.data?.alreadyMarked) {
        setAlreadyMarkedBanner(true);
      } else {
        setMessage({ type: 'error', text: err.response?.data?.message || 'Server error' });
      }
    } finally {
      setSaving(false);
    }
  };

  // ── Download PDF ──
  const downloadPDF = () => {
    const subjectName = selectedSubject?.name || 'Subject';
    const subjectCode = selectedSubject?.code || '';
    const semester = selectedSubject?.semester?.semesterName || '';
    const presentCountR = reportStudents.filter(s => s.percentage >= 75).length;

    const rows = reportStudents.map((s, i) => {
      const cls = s.percentage >= 75 ? 'pct-high' : s.percentage >= 50 ? 'pct-mid' : 'pct-low';
      return `<tr>
        <td>${String(i + 1).padStart(2, '0')}</td>
        <td>${s.enrollmentNum}</td>
        <td>${s.name}</td>
        <td>${s.presentCount} / ${reportTotalSessions}</td>
        <td class="${cls}">${s.percentage}%</td>
      </tr>`;
    }).join('');

    const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"/>
    <title>Attendance Report - ${subjectName}</title>
    <style>
      body { font-family: 'Segoe UI', sans-serif; margin: 0; padding: 32px; color: #1e1b4b; font-size: 13px; }
      .header { background: linear-gradient(135deg,#1e1b4b,#1d4ed8); color:#fff; padding: 22px 28px; border-radius: 12px; margin-bottom: 22px; }
      .header h1 { margin: 0 0 5px; font-size: 20px; letter-spacing: -0.02em; }
      .header p  { margin: 0; font-size: 12px; opacity: 0.75; }
      .meta { display: flex; gap: 12px; margin-bottom: 18px; flex-wrap: wrap; }
      .meta-pill { background: #eef2ff; border: 1.5px solid #c7d2fe; border-radius: 8px; padding: 7px 13px; font-size: 12px; font-weight: 700; color: #4338ca; }
      .sessions-info { background: #f0fdf4; border: 1.5px solid #bbf7d0; border-radius: 8px; padding: 7px 13px; font-size: 12px; font-weight: 600; color: #166534; margin-bottom: 18px; }
      table { width: 100%; border-collapse: collapse; }
      thead { background: #f8faff; }
      th { padding: 10px 13px; text-align: left; font-size: 10.5px; font-weight: 700; color: #6366f1; text-transform: uppercase; letter-spacing: 0.07em; border-bottom: 2px solid #e5e7eb; }
      td { padding: 10px 13px; border-bottom: 1px solid #f1f5f9; }
      tr:nth-child(even) td { background: #fafbff; }
      .pct-high { color: #166534; font-weight: 700; }
      .pct-mid  { color: #92400e; font-weight: 700; }
      .pct-low  { color: #991b1b; font-weight: 700; }
      .footer { margin-top: 24px; font-size: 10.5px; color: #9ca3af; display: flex; justify-content: space-between; }
      @media print { body { padding: 20px; } button { display: none; } }
    </style></head><body>
    <div class="header">
      <h1>Attendance Report — ${subjectName}</h1>
      <p>${subjectCode}${semester ? ' &nbsp;|&nbsp; ' + semester : ''} &nbsp;|&nbsp; Period: ${reportFromDate} to ${reportToDate}</p>
    </div>
    <div class="meta">
      <div class="meta-pill">Total Students: ${reportStudents.length}</div>
      <div class="meta-pill">Total Sessions: ${reportTotalSessions}</div>
      <div class="meta-pill">≥75% Attendance: ${presentCountR} students</div>
    </div>
    <div class="sessions-info">📅 ${reportTotalSessions} session${reportTotalSessions !== 1 ? 's' : ''} held from ${reportFromDate} → ${reportToDate}</div>
    <table>
      <thead><tr><th>#</th><th>Enrollment No.</th><th>Student Name</th><th>Sessions Attended</th><th>Attendance %</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
    <div class="footer">
      <span>Subject: ${subjectName} (${subjectCode})</span>
      <span>Generated on: ${new Date().toLocaleString()}</span>
    </div>
    </body></html>`;

    const win = window.open('', '_blank', 'width=950,height=720');
    win.document.write(html);
    win.document.close();
    win.focus();
    setTimeout(() => { win.print(); }, 400);
  };

  // ── Download Excel (CSV — opens natively in Excel) ──
  const downloadExcel = () => {
    const subjectName = selectedSubject?.name || 'Subject';
    const subjectCode = selectedSubject?.code || '';
    const semester = selectedSubject?.semester?.semesterName || '';
    const esc = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;

    const lines = [
      ['Attendance Report'],
      ['Subject', subjectName, 'Code', subjectCode, 'Semester', semester],
      ['Period', `${reportFromDate} to ${reportToDate}`, 'Total Sessions', reportTotalSessions],
      [],
      ['#', 'Enrollment No.', 'Student Name', 'Sessions Attended', `Out of`, 'Attendance %'],
      ...reportStudents.map((s, i) => [
        i + 1,
        s.enrollmentNum,
        s.name,
        s.presentCount,
        reportTotalSessions,
        `${s.percentage}%`,
      ]),
      [],
      ['Generated on', new Date().toLocaleString()],
    ];

    const csv = lines.map(row => row.map(esc).join(',')).join('\r\n');
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Attendance_${subjectName}_${reportFromDate}_to_${reportToDate}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Summary counts
  const presentCount = Object.values(attendanceStatus).filter(v => v === 'present').length;
  const absentCount  = Object.values(attendanceStatus).filter(v => v === 'absent').length;

  const todayFormatted = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

  return (
    <>
      <style>{styles}</style>
      <div className="att-root">
        <div className="att-card">

          {/* ── Header ── */}
          <div className="att-header">
            <div className="att-header-top">
              <div className="att-header-title">
                <BookOpen size={22} color="white" />
                Attendance <span>Portal</span>
              </div>
              <div className="att-date-badge">
                <Calendar size={12} />
                {todayFormatted}
              </div>
            </div>

            {/* ── Tabs ── */}
            <div className="att-tabs">
              <button
                onClick={() => { setActiveTab('mark'); setMessage(null); }}
                className={`att-tab ${activeTab === 'mark' ? 'active' : ''}`}
              >
                <BookOpen size={16} /> Mark Attendance
              </button>
              <button
                onClick={() => { setActiveTab('report'); setMessage(null); }}
                className={`att-tab ${activeTab === 'report' ? 'active' : ''}`}
              >
                <BarChart2 size={16} /> Attendance Report
              </button>
            </div>
          </div>

          {/* ── Body ── */}
          <div className="att-body">

            {/* ════ MARK ATTENDANCE TAB ════ */}
            {activeTab === 'mark' && (
              <>
                {/* Subject grid */}
                {loading.subjects ? (
                  <div className="att-subject-grid">
                    {[1,2,3].map(i => (
                      <div key={i} className="att-skeleton" style={{ height: 80 }} />
                    ))}
                  </div>
                ) : subjects.length === 0 ? (
                  <div className="att-empty">
                    <div className="att-empty-icon">📚</div>
                    No subjects assigned. Please contact administrator.
                  </div>
                ) : (
                  <div className="att-subject-grid">
                    {subjects.map(sub => (
                      <div
                        key={sub._id}
                        onClick={() => setSelectedSubject(sub)}
                        className={`att-subject-card ${selectedSubject?._id === sub._id ? 'active' : ''}`}
                      >
                        <div className="att-subject-card-inner">
                          <div className="att-subject-name">{sub.name}</div>
                          <div className="att-subject-meta">{sub.code}</div>
                          <span className="att-subject-chip">{sub.semester?.semesterName || 'N/A'}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Attendance Table */}
                {selectedSubject && (
                  <div>
                    {/* Section heading */}
                    <div className="att-section-head">
                      <div className="att-section-title">
                        <div className="dot" />
                        {selectedSubject.name}
                        {loading.students && <span style={{ fontSize:'0.78rem', color:'#9ca3af', fontWeight:400 }}>— loading…</span>}
                      </div>
                      <div className="att-controls">
                        <select
                          value={attendanceDivision}
                          onChange={(e) => setAttendanceDivision(e.target.value)}
                          className="att-date-input"
                        >
                          <option value="A">Div A</option>
                          <option value="B">Div B</option>
                          <option value="C">Div C</option>
                        </select>
                        <select
                          value={attendanceTimeSlot}
                          onChange={(e) => setAttendanceTimeSlot(e.target.value)}
                          className="att-date-input"
                        >
                          <option value="09:00 - 10:00">09:00 - 10:00</option>
                          <option value="10:00 - 11:00">10:00 - 11:00</option>
                          <option value="11:00 - 12:00">11:00 - 12:00</option>
                          <option value="12:00 - 01:00">12:00 - 01:00</option>
                          <option value="01:00 - 02:00">01:00 - 02:00</option>
                          <option value="02:00 - 03:00">02:00 - 03:00</option>
                          <option value="03:00 - 04:00">03:00 - 04:00</option>
                        </select>
                        <input
                          type="date"
                          value={attendanceDate}
                          min={new Date().toISOString().split('T')[0]}
                          max={new Date().toISOString().split('T')[0]}
                          onChange={(e) => setAttendanceDate(e.target.value)}
                          className="att-date-input"
                          title="Attendance can only be marked for today"
                        />
                        <button onClick={markAllPresent} className="att-btn-ghost">
                          <CheckCircle size={15} /> Mark All Present
                        </button>
                      </div>
                    </div>

                    {/* Summary pills */}
                    {students.length > 0 && (
                      <div className="att-summary">
                        <div className="att-stat-pill pill-total"><Users size={14} /> {students.length} Students</div>
                        <div className="att-stat-pill pill-present"><CheckCircle size={14} /> {presentCount} Present</div>
                        <div className="att-stat-pill pill-absent"><X size={14} /> {absentCount} Absent</div>
                      </div>
                    )}

                    {/* Empty state */}
                    {!loading.students && students.length === 0 && (
                      <div className="att-empty">
                        <div className="att-empty-icon">👥</div>
                        No students enrolled in this subject.
                      </div>
                    )}

                    {/* Table */}
                    {students.length > 0 && (
                      <div className="att-table-wrap">
                        <table className="att-table">
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Enrollment No.</th>
                              <th>Student Name</th>
                              <th>Overall Attendance</th>
                              <th className="center">Today's Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {students.map((student, idx) => (
                              <tr key={student._id}>
                                <td style={{ color:'#c7d2fe', fontFamily:"'JetBrains Mono',monospace", fontSize:'0.78rem' }}>
                                  {String(idx + 1).padStart(2, '0')}
                                </td>
                                <td><span className="att-enroll">{student.enrollmentNum}</span></td>
                                <td>
                                  <div className="att-student-name">{student.name}</div>
                                </td>
                                <td style={{ minWidth: 160 }}>
                                  {loadingPct ? (
                                    <div className="att-skeleton" style={{ height: 18, width: 120 }} />
                                  ) : (
                                    <AttendancePct pct={attendancePct[student._id] ?? null} />
                                  )}
                                </td>
                                <td className="center">
                                  <div className="att-status-wrap">
                                    <button
                                      onClick={() => handleStatusChange(student._id, 'present')}
                                      className={`att-status-btn ${attendanceStatus[student._id] === 'present' ? 'present-active' : 'present-inactive'}`}
                                    >
                                      ✓ Present
                                    </button>
                                    <button
                                      onClick={() => handleStatusChange(student._id, 'absent')}
                                      className={`att-status-btn ${attendanceStatus[student._id] === 'absent' ? 'absent-active' : 'absent-inactive'}`}
                                    >
                                      ✕ Absent
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {/* Already marked banner */}
                    {alreadyMarkedBanner && (
                      <div className="att-already-banner">
                        <div className="att-already-banner-icon">⚠️</div>
                        <div>
                          <div className="att-already-banner-title">Attendance Already Marked</div>
                          <div className="att-already-banner-sub">
                            Attendance for <strong>{selectedSubject.name}</strong> (Division {attendanceDivision}, Slot {attendanceTimeSlot}) on <strong>{attendanceDate}</strong> has already been saved.
                            To make corrections, use the <strong>Edit Attendance</strong> option in the Attendance Report tab.
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="att-save-row">
                      <button
                        onClick={submitAttendance}
                        disabled={saving || loading.students || students.length === 0}
                        className="att-btn-primary"
                      >
                        <Save size={17} />
                        {saving ? 'Saving…' : 'Save Attendance'}
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* ════ REPORT TAB ════ */}
            {activeTab === 'report' && (
              <div>
                <div className="att-section-head" style={{ marginBottom:'1.25rem' }}>
                  <div className="att-section-title"><div className="dot" />Attendance Report <span style={{fontSize:'0.78rem',color:'#9ca3af',fontWeight:400}}>— date range</span></div>
                </div>

                <div className="att-report-form">
                  <div className="att-form-group">
                    <label className="att-form-label">Subject</label>
                    <select
                      value={selectedSubject?._id || ''}
                      onChange={(e) => {
                        const sub = subjects.find(s => s._id === e.target.value);
                        setSelectedSubject(sub);
                        setReportStudents([]);
                        setReportFetched(false);
                      }}
                      className="att-form-select"
                    >
                      <option value="">Select Subject</option>
                      {subjects.map(sub => (
                        <option key={sub._id} value={sub._id}>{sub.name} ({sub.code})</option>
                      ))}
                    </select>
                  </div>
                  <div className="att-form-group">
                    <label className="att-form-label">Division</label>
                    <select
                      value={reportDivision}
                      onChange={(e) => {
                        setReportDivision(e.target.value);
                        setReportStudents([]);
                        setReportFetched(false);
                      }}
                      className="att-form-select"
                    >
                      <option value="All">All Divisions</option>
                      <option value="A">Div A</option>
                      <option value="B">Div B</option>
                      <option value="C">Div C</option>
                    </select>
                  </div>
                  <div className="att-form-group">
                    <label className="att-form-label">From Date</label>
                    <input
                      type="date"
                      value={reportFromDate}
                      onChange={(e) => setReportFromDate(e.target.value)}
                      className="att-form-date"
                    />
                  </div>
                  <div className="att-form-group">
                    <label className="att-form-label">To Date</label>
                    <input
                      type="date"
                      value={reportToDate}
                      onChange={(e) => setReportToDate(e.target.value)}
                      className="att-form-date"
                    />
                  </div>
                  <button
                    onClick={fetchAttendanceReport}
                    disabled={!selectedSubject || loadingReport}
                    className="att-btn-report"
                  >
                    <TrendingUp size={15} />
                    {loadingReport ? 'Loading…' : 'View Report'}
                  </button>
                </div>

                {/* Edit panel */}
                {editingRow && (
                  <div className="att-edit-panel">
                    <div className="att-edit-panel-title">
                      <Pencil size={14} /> Edit Attendance — {editingRow.name}
                    </div>
                    <div className="att-edit-row">
                      <div className="att-edit-group">
                        <label className="att-edit-label">Date</label>
                        <input
                          type="date"
                          value={editDate}
                          min={reportFromDate}
                          max={reportToDate}
                          onChange={(e) => setEditDate(e.target.value)}
                          className="att-edit-input"
                        />
                      </div>
                      <div className="att-edit-group">
                        <label className="att-edit-label">Status</label>
                        <select value={editStatus} onChange={(e) => setEditStatus(e.target.value)} className="att-edit-select">
                          <option value="present">Present</option>
                          <option value="absent">Absent</option>
                        </select>
                      </div>
                      <button onClick={submitEdit} disabled={editSaving || !editDate} className="att-edit-btn-save">
                        <Save size={14} /> {editSaving ? 'Saving…' : 'Save'}
                      </button>
                      <button onClick={() => setEditingRow(null)} className="att-edit-btn-cancel">Cancel</button>
                    </div>
                  </div>
                )}

                {/* Sessions info pill */}
                {reportFetched && reportTotalSessions > 0 && (
                  <div className="att-report-info">
                    <Calendar size={15} />
                    {reportTotalSessions} session{reportTotalSessions !== 1 ? 's' : ''} held between {reportFromDate} → {reportToDate}
                  </div>
                )}

                {reportStudents.length > 0 && (
                  <>
                    <div className="att-download-row">
                      <button onClick={downloadPDF} className="att-btn-pdf">
                        <FileDown size={14} /> Download PDF
                      </button>
                      <button onClick={downloadExcel} className="att-btn-excel">
                        <FileSpreadsheet size={14} /> Download Excel
                      </button>
                    </div>
                  <div className="att-table-wrap">
                    <table className="att-table">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Enrollment No.</th>
                          <th>Student Name</th>
                          <th>Sessions Attended</th>
                          <th>Attendance %</th>
                          <th className="center">Edit</th>
                        </tr>
                      </thead>
                      <tbody>
                        {reportStudents.map((student, idx) => (
                          <tr key={student._id}>
                            <td style={{ color:'#c7d2fe', fontFamily:"'JetBrains Mono',monospace", fontSize:'0.78rem' }}>
                              {String(idx + 1).padStart(2, '0')}
                            </td>
                            <td><span className="att-enroll">{student.enrollmentNum}</span></td>
                            <td><div className="att-student-name">{student.name}</div></td>
                            <td style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'0.85rem' }}>
                              {student.presentCount} / {reportTotalSessions}
                            </td>
                            <td style={{ minWidth: 150 }}>
                              <AttendancePct pct={student.percentage} />
                            </td>
                            <td className="center">
                              <button
                                className="att-edit-btn-icon"
                                title="Edit attendance for a specific date"
                                onClick={() => {
                                  setEditingRow({ studentId: student._id, name: student.name });
                                  setEditDate(reportToDate);
                                  setEditStatus('present');
                                }}
                              >
                                <Pencil size={15} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  </>
                )}

                {!loadingReport && reportFetched && reportTotalSessions === 0 && (
                  <div className="att-empty">
                    <div className="att-empty-icon">📭</div>
                    No sessions were held in this date range.
                  </div>
                )}
              </div>
            )}

            {/* Global message */}
            {message.text && (
              <div className={`att-message ${
                message.type === 'success' ? 'msg-success' :
                message.type === 'info'    ? 'msg-info'    : 'msg-error'
              }`}>
                {message.type === 'success' ? <CheckCircle size={17} /> : <AlertCircle size={17} />}
                {message.text}
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
};

export default AttendancePage;
