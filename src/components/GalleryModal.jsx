// src/components/GalleryModal.jsx
import { useState } from "react";
import ImagePreview from "./ImagePreview";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');
  .gm-overlay {
    position: fixed; inset: 0; z-index: 50;
    background: rgba(15,23,42,0.65); backdrop-filter: blur(6px);
    display: flex; align-items: center; justify-content: center; padding: 1rem;
  }
  .gm-modal {
    font-family: 'Outfit', sans-serif;
    background: #fff; border-radius: 24px; width: 100%; max-width: 860px;
    max-height: 92vh; display: flex; flex-direction: column; overflow: hidden;
    box-shadow: 0 24px 64px rgba(15,23,42,0.25);
  }
  .gm-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 1.25rem 1.75rem; border-bottom: 1.5px solid #f1f5f9; flex-shrink: 0;
  }
  .gm-header-left { flex: 1; min-width: 0; }
  .gm-title { font-size: 1.15rem; font-weight: 800; color: #0f172a; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .gm-date  { font-size: 0.78rem; color: #9ca3af; margin-top: 0.15rem; }
  .gm-count-pill {
    display: inline-flex; align-items: center; gap: 0.35rem;
    background: linear-gradient(135deg, #eef2ff, #f0f9ff);
    border: 1.5px solid #c7d2fe; color: #4338ca;
    font-size: 0.75rem; font-weight: 700;
    padding: 0.25rem 0.75rem; border-radius: 50px; margin: 0 1rem; flex-shrink: 0;
  }
  .gm-close {
    width: 36px; height: 36px; border-radius: 10px;
    border: 1.5px solid #e8eaf0; background: #fff;
    cursor: pointer; display: flex; align-items: center; justify-content: center;
    color: #6b7280; font-size: 1.1rem; transition: all 0.15s; flex-shrink: 0;
  }
  .gm-close:hover { background: #fee2e2; border-color: #fecdd3; color: #dc2626; }

  .gm-body { padding: 1.5rem 1.75rem; overflow-y: auto; flex: 1; }

  .gm-desc { font-size: 0.875rem; color: #6b7280; margin-bottom: 1.25rem; line-height: 1.6; }

  /* masonry-style columns */
  .gm-grid {
    columns: 3; column-gap: 0.75rem;
  }
  .gm-grid-item {
    break-inside: avoid; margin-bottom: 0.75rem;
    border-radius: 12px; overflow: hidden; cursor: zoom-in;
    border: 1.5px solid #e8eaf0; transition: all 0.25s cubic-bezier(0.34,1.56,0.64,1);
    display: block;
  }
  .gm-grid-item:hover { transform: scale(1.02); box-shadow: 0 8px 24px rgba(99,102,241,0.18); border-color: #c7d2fe; z-index: 1; }
  .gm-grid-item img { width: 100%; height: auto; display: block; }

  .gm-no-photos { text-align: center; padding: 3rem 1rem; color: #9ca3af; font-size: 0.9rem; }

  @media (max-width: 700px) { .gm-grid { columns: 2; } .gm-body { padding: 1rem; } .gm-header { padding: 1rem 1.25rem; } }
  @media (max-width: 420px) { .gm-grid { columns: 1; } }
`;

const GalleryModal = ({ event, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(null);
  if (!event) return null;

  // Normalize photos array — support both event.photos (old) and event.images (new API)
  const photos = event.photos || event.images?.map(i => i.url) || [];

  return (
    <>
      <style>{styles}</style>
      <div className="gm-overlay" onClick={onClose}>
        <div className="gm-modal" onClick={e => e.stopPropagation()}>
          <div className="gm-header">
            <div className="gm-header-left">
              <div className="gm-title">{event.title}</div>
              {event.date && <div className="gm-date">📅 {event.date}</div>}
            </div>
            {photos.length > 0 && (
              <span className="gm-count-pill">📸 {photos.length} photo{photos.length !== 1 ? 's' : ''}</span>
            )}
            <button className="gm-close" onClick={onClose}>✕</button>
          </div>

          <div className="gm-body">
            {event.description && <div className="gm-desc">{event.description}</div>}

            {photos.length === 0 ? (
              <div className="gm-no-photos">No photos for this event yet.</div>
            ) : (
              <div className="gm-grid">
                {photos.map((src, idx) => (
                  <div key={idx} className="gm-grid-item" onClick={() => setCurrentIndex(idx)}>
                    <img src={src} alt={`${event.title} ${idx + 1}`} loading="lazy" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {currentIndex !== null && (
        <ImagePreview
          images={photos}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          onClose={() => setCurrentIndex(null)}
        />
      )}
    </>
  );
};

export default GalleryModal;
