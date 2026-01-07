const ImagePreview = ({
  images,
  currentIndex,
  setCurrentIndex,
  onClose,
}) => {
  const total = images.length;

  const prevImage = () => {
    setCurrentIndex((currentIndex - 1 + total) % total);
  };

  const nextImage = () => {
    setCurrentIndex((currentIndex + 1) % total);
  };

  return (
    <div className="fixed inset-0 bg-black/90 z-[999] flex items-center justify-center">
      
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white text-3xl hover:scale-110 transition"
      >
        ✕
      </button>

      {/* LEFT ARROW */}
      <button
        onClick={prevImage}
        className="
          absolute left-6 top-1/2 -translate-y-1/2
          w-14 h-14
          flex items-center justify-center
          rounded-full
          bg-white/10 backdrop-blur-md
          cursor-pointer
          transition
          hover:bg-white/25 hover:scale-110
          active:scale-95
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      {/* IMAGE */}
      <img
        src={images[currentIndex]}
        alt="preview"
        className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg"
      />

      {/* RIGHT ARROW */}
      <button
        onClick={nextImage}
        className="
          absolute right-6 top-1/2 -translate-y-1/2
          w-14 h-14
          flex items-center justify-center
          rounded-full
          bg-white/10 backdrop-blur-md
          cursor-pointer
          transition
          hover:bg-white/25 hover:scale-110
          active:scale-95
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6"
        >
          <path d="M9 6l6 6-6 6" />
        </svg>
      </button>
    </div>
  );
};

export default ImagePreview;
