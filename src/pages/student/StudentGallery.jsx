// src/student/StudentGallery.jsx
import { useState, useEffect } from "react";
import GalleryCard  from "../../components/GalleryCard";
import GalleryModal from "../../components/GalleryModal";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');
  .sg-root * { box-sizing: border-box; }
  .sg-root { font-family: 'Outfit', sans-serif; color: #0f172a; }

  .sg-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:1.75rem; flex-wrap:wrap; gap:1rem; }
  .sg-title    { font-size:1.5rem; font-weight:800; color:#0f172a; letter-spacing:-0.02em; }
  .sg-subtitle { font-size:0.82rem; color:#9ca3af; margin-top:0.2rem; }

  .sg-grid { display:grid; grid-template-columns:repeat(auto-fill, minmax(260px,1fr)); gap:1.25rem; }

  .sg-empty {
    background:#fff; border:1.5px solid #e8eaf0; border-radius:18px;
    padding:4rem 2rem; text-align:center; box-shadow:0 2px 12px rgba(15,23,42,0.04);
  }
  .sg-empty-icon  { font-size:3rem; margin-bottom:0.75rem; }
  .sg-empty-title { font-size:1rem; font-weight:700; color:#374151; margin-bottom:0.3rem; }
  .sg-empty-desc  { font-size:0.85rem; color:#9ca3af; }

  .sg-loading { display:flex; align-items:center; justify-content:center; min-height:50vh; }
  .sg-spinner { width:40px; height:40px; border-radius:50%; border:3px solid #e5e7eb; border-top-color:#6366f1; animation:sg-spin 0.8s linear infinite; }
  @keyframes sg-spin { to { transform:rotate(360deg); } }

  @media (max-width:640px) { .sg-grid { grid-template-columns:1fr 1fr; gap:0.75rem; } }
  @media (max-width:400px) { .sg-grid { grid-template-columns:1fr; } }
`;

const Gallery = () => {
  const [events, setEvents]           = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading]         = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/events')
      .then(r => r.json())
      .then(d => setEvents(Array.isArray(d) ? d : []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <><style>{styles}</style>
    <div className="sg-root sg-loading"><div className="sg-spinner" /></div></>
  );

  return (
    <>
      <style>{styles}</style>
      <div className="sg-root">
        <div className="sg-header">
          <div>
            <div className="sg-title">Events Gallery</div>
            <div className="sg-subtitle">
              {events.length} event{events.length !== 1 ? 's' : ''} captured · click any card to explore
            </div>
          </div>
        </div>

        {events.length === 0 ? (
          <div className="sg-empty">
            <div className="sg-empty-icon">🖼</div>
            <div className="sg-empty-title">No events yet</div>
            <div className="sg-empty-desc">Gallery events will appear here once added.</div>
          </div>
        ) : (
          <div className="sg-grid">
            {events.map(event => (
              <GalleryCard key={event._id} event={event} onClick={setSelectedEvent} />
            ))}
          </div>
        )}

        {selectedEvent && (
          <GalleryModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
        )}
      </div>
    </>
  );
};

export default Gallery;