const StudentGallery = () => {
  const images = [
    "https://source.unsplash.com/random/400x300?college",
    "https://source.unsplash.com/random/401x300?students",
    "https://source.unsplash.com/random/402x300?classroom",
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Gallery</h2>

      <div className="grid md:grid-cols-3 gap-4">
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            className="rounded shadow hover:scale-105 transition"
          />
        ))}
      </div>
    </div>
  );
};

export default StudentGallery;