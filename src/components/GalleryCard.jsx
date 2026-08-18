// src/components/GalleryCard.jsx
import { Calendar, Image as ImageIcon } from "lucide-react";

const GalleryCard = ({ event, onClick }) => {
  return (
    <div
      onClick={() => onClick(event)}
      className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-slate-100"
    >
      {/* Image Container with overlay effect */}
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <img
          src={event.cover}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        {/* Overlay gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Photo count badge */}
        {event.photos?.length > 0 && (
          <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
            <ImageIcon size={12} />
            {event.photos.length}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-slate-800 line-clamp-1 group-hover:text-indigo-600 transition">
          {event.title}
        </h3>
        <div className="flex items-center gap-1.5 mt-1 text-slate-400 text-sm">
          <Calendar size={14} />
          <span>{event.date}</span>
        </div>
      </div>
    </div>
  );
};

export default GalleryCard;
