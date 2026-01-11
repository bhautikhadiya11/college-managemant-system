import { useState } from "react";
import { ChevronRight} from "lucide-react";
import { ChevronLeft } from "lucide-react";
import { X } from "lucide-react"; 

const ImagePreview = ({
  images,
  currentIndex,
  setCurrentIndex,
  onClose,
}) => {
  const total = images.length;
  const [zoomView, setZoomView] = useState(false);

  const prevImage = () => {
    setZoomView(false);
    setCurrentIndex((currentIndex - 1 + total) % total);
  };

  const nextImage = () => {
    setZoomView(false);
    setCurrentIndex((currentIndex + 1) % total);
  };

  return (
    <div className="fixed inset-0 bg-black/90 z-[999] flex items-center justify-center">

      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-10 right-6 text-white text-3xl  -translate-y-1/2
                   w-14 h-14 rounded-full bg-white/10 
                   flex items-center justify-center hover:bg-white/25"
      >
        <X />
      </button>

      {/* Left */}
      <button
        onClick={prevImage}
        className="absolute left-6 top-1/2 -translate-y-1/2
                   w-14 h-14 rounded-full bg-white/10 text-white
                   flex items-center justify-center hover:bg-white/25"
      >
        <ChevronLeft />
      </button>

      {/* IMAGE CONTAINER (FIXED SIZE) */}
      <div
        className={`
          flex items-center justify-center
          transition-all duration-300
          ${zoomView
            ? "w-[80vw] h-[75vh]"   //  yahin fix hai
            : "w-auto h-auto max-w-[80vw] max-h-[80vh]"
          }
        `}
      >
        <img
          src={images[currentIndex]}
          alt="preview"
          className="w-full h-full object-contain rounded-lg"
        />
      </div>

      {/* Right */}
      <button
        onClick={nextImage}
        className="absolute right-6 top-1/2 -translate-y-1/2
                   w-14 h-14 rounded-full bg-white/10 text-white
                   flex items-center justify-center hover:bg-white/25"
      >
          <ChevronRight />
      </button>

      {/* DISPLAY ZOOM TOGGLE */}
      <button
        onClick={() => setZoomView(!zoomView)}
        className="absolute bottom-6 bg-white/10 text-white px-4 py-2
                   rounded-full hover:bg-white/25 transition"
      >
        {zoomView ? "Normal View" : "Zoom View"}
      </button>
    </div>
  );
};

export default ImagePreview;
