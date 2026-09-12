// src/pages/Gallery.jsx
import { useState, useEffect } from "react";
import GalleryCard from "../components/GalleryCard";
import GalleryModal from "../components/GalleryModal";
import { Calendar, Image as ImageIcon, AlertCircle, Loader2, ChevronLeft, ChevronRight } from "lucide-react";

const Gallery = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("https://cms-backend-wl7u.onrender.com/api/events");
        if (!res.ok) throw new Error("Failed to load gallery");
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-indigo-500 animate-spin mx-auto mb-4" />
          <p className="text-slate-500">Loading memories...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-800">Unable to load gallery</h3>
          <p className="text-slate-500 text-sm mt-2">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-5 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ImageIcon className="w-10 h-10 text-slate-400" />
          </div>
          <h3 className="text-xl font-semibold text-slate-700">No events yet</h3>
          <p className="text-slate-400">Check back later for campus memories.</p>
        </div>
      </div>
    );
  }

  // Pagination logic
  const totalPages = Math.ceil(events.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentEvents = events.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-950 to-blue-950">
            Moments That Matter
          </h1>
          <p className="text-slate-500 mt-3 max-w-md mx-auto">
            Explore campus life through our event gallery.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-950 to-blue-500 rounded-full mx-auto mt-4"></div>
        </div>

        {/* Responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr mb-10">
          {currentEvents.map((event) => (
            <GalleryCard
              key={event._id}
              event={event}
              onClick={setSelectedEvent}
            />
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mt-8">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`p-2 rounded-lg flex items-center justify-center transition-all ${
                currentPage === 1 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-white text-indigo-600 shadow-md hover:bg-indigo-50 cursor-pointer'
              }`}
            >
              <ChevronLeft size={20} />
            </button>
            
            <div className="flex items-center space-x-1">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-10 h-10 rounded-lg font-semibold text-sm transition-all cursor-pointer ${
                    currentPage === i + 1
                    ? 'bg-indigo-600 text-white shadow-md transform scale-105'
                    : 'bg-white text-gray-600 shadow-sm hover:bg-gray-50'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-lg flex items-center justify-center transition-all ${
                currentPage === totalPages 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-white text-indigo-600 shadow-md hover:bg-indigo-50 cursor-pointer'
              }`}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}

        {/* Modal */}
        {selectedEvent && (
          <GalleryModal
            event={selectedEvent}
            onClose={() => setSelectedEvent(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Gallery;
