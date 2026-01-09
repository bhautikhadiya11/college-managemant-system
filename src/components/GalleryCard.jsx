const GalleryCard = ({ event, onClick }) => {
  return (
    <div
      onClick={() => onClick(event)}
      className="cursor-pointer bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition top-2"
    >
      <div className="aspect-4/3 overflow-hidden">
        <img
          src={event.cover}
          alt={event.title}
          className="w-full h-full object-cover hover:scale-105 transition duration-300"
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold">{event.title}</h3>
        <p className="text-sm text-gray-500">{event.date}</p>
      </div>
    </div>
  );
};

export default GalleryCard;
