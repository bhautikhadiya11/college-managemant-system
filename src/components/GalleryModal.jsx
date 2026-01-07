import { useState } from "react";
import ImagePreview from "./ImagePreview";

const GalleryModal = ({ event, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(null);

  if (!event) return null;

  return (
    <>
      {/* Event Modal */}
      <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
        <div className="bg-white max-w-5xl w-full rounded-xl p-6 relative">

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-2xl"
          >
            ✕
          </button>

          <h2 className="text-2xl font-bold">{event.title}</h2>
          <p className="text-gray-500 mb-6">{event.date}</p>

          {/* Photos Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {event.photos.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="event"
                onClick={() => setCurrentIndex(index)}
                className="w-full h-48 object-cover rounded-lg cursor-pointer hover:scale-105 transition"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Image Preview with Slider */}
      {currentIndex !== null && (
        <ImagePreview
          images={event.photos}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          onClose={() => setCurrentIndex(null)}
        />
      )}
    </>
  );
};

export default GalleryModal;
