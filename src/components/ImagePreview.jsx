// src/components/ImagePreview.jsx
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from "lucide-react";
import { useState } from "react";

const ImagePreview = ({ images, currentIndex, setCurrentIndex, onClose }) => {
  const [zoom, setZoom] = useState(false);
  const total = images.length;

  const prev = () => {
    setZoom(false);
    setCurrentIndex((currentIndex - 1 + total) % total);
  };
  const next = () => {
    setZoom(false);
    setCurrentIndex((currentIndex + 1) % total);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [currentIndex]);

  return (
    <div className="fixed inset-0 bg-black/95 z-[999] flex items-center justify-center">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
      >
        <X size={22} />
      </button>

      {/* Navigation arrows */}
      <button
        onClick={prev}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
      >
        <ChevronRight size={24} />
      </button>

      {/* Image container with zoom toggle */}
      <div
        className={`transition-all duration-300 ${
          zoom ? "w-[95vw] h-[90vh]" : "w-auto max-w-[85vw] max-h-[85vh]"
        }`}
      >
        <img
          src={images[currentIndex]}
          alt="Preview"
          className="w-full h-full object-contain rounded-lg"
        />
      </div>

      {/* Zoom toggle + counter */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full text-white text-sm">
        <button onClick={() => setZoom(!zoom)} className="flex items-center gap-1 hover:text-indigo-300 transition">
          {zoom ? <ZoomOut size={16} /> : <ZoomIn size={16} />}
          {zoom ? "Normal" : "Zoom"}
        </button>
        <span className="border-l border-white/30 mx-1"></span>
        <span>
          {currentIndex + 1} / {total}
        </span>
      </div>
    </div>
  );
};

// Add useEffect for keyboard
import { useEffect } from "react";
export default ImagePreview;