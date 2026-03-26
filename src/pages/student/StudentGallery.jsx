import { useState, useEffect } from "react";
import GalleryCard from "../../components/GalleryCard";   // adjust path if needed
import GalleryModal from "../../components/GalleryModal";

const Gallery = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/events');
        const data = await res.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  if (loading) return <div>Loading gallery...</div>;

  return (
    <div className="text-center bg-gray-50 pt-20">
      <h1 className="font-bold text-blue-950 text-4xl">Events Gallery</h1>
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <GalleryCard
              key={event._id}
              event={event}
              onClick={setSelectedEvent}
            />
          ))}
        </div>
        {selectedEvent && (
          <GalleryModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
        )}
      </section>
    </div>
  );
};

export default Gallery;