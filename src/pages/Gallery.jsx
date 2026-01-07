import { useState } from "react";
import GalleryCard from "../components/GalleryCard";
import GalleryModal from "../components/GalleryModal";

const Gallery = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const events = [
    {
      title: "Republic Day Celebration",
      date: "26 Jan 2026",
      cover: "https://t4.ftcdn.net/jpg/03/66/20/07/240_F_366200775_XfF8W9VKgHVneocETpNpvW7kyr57kBQ8.jpg",
      photos: [
        "https://plus.unsplash.com/premium_photo-1682092645573-edbd43c0dff2?w=600",
        "https://images.unsplash.com/photo-1757045147811-894406b70635?w=600",
        "https://old.ldce.ac.in/gallery/373/thumb/republic-day-celebration-2024-qKt43PbW31.jpg"
      ]
    },
    {
      title: "Group Day Event",
      date: "3 Feb 2025",
      cover: "https://plus.unsplash.com/premium_photo-1714397546773-4890ebcba935?w=600",
      photos: [
        "https://t3.ftcdn.net/jpg/04/92/47/92/240_F_492479287_LnwG377C8CoYpQ6vxnSj09Ulzs7VBXPN.jpg",
        "https://t3.ftcdn.net/jpg/16/07/18/08/240_F_1607180897_5ZgI2RMcTjgvdoBxAb41PUp877S4Vs14.jpg",
        "https://t4.ftcdn.net/jpg/02/07/79/17/240_F_207791780_FEdPfDqxU2ApLRPaHGrQov6WdGGZg9jm.jpg"
      ]
    },
    { title: "Annual Function", 
      date: "20 Mar 2025", 
      cover: "https://images.unsplash.com/photo-1724390265310-a4814e561d38?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fGFubnVhbCUyMGZ1bmN0aW9uJTIwZXZlbnQlMjBjb2xsZWdlfGVufDB8fDB8fHww", 
      photos: [ 
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30", 
        "https://images.unsplash.com/photo-1506157786151-b8491531f063", 
        "https://images.unsplash.com/photo-1724003450406-6a7c120a26ef?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fGFubnVhbCUyMGZ1bmN0aW9uJTIwZXZlbnQlMjBjb2xsZWdlfGVufDB8fDB8fHww" 
      ] 
    },
     {
      title: "Traditional Day",
      date: "2 Feb 2025",
      cover: "https://t4.ftcdn.net/jpg/03/66/20/07/240_F_366200775_XfF8W9VKgHVneocETpNpvW7kyr57kBQ8.jpg",
      photos: [
        "https://plus.unsplash.com/premium_photo-1682092645573-edbd43c0dff2?w=600",
        "https://images.unsplash.com/photo-1757045147811-894406b70635?w=600",
        "https://old.ldce.ac.in/gallery/373/thumb/republic-day-celebration-2024-qKt43PbW31.jpg"
      ]
    },
    {
      title: "Navratri Celebration",
      date: "2 oct 2025",
      cover: "https://plus.unsplash.com/premium_photo-1714397546773-4890ebcba935?w=600",
      photos: [
        "https://t3.ftcdn.net/jpg/04/92/47/92/240_F_492479287_LnwG377C8CoYpQ6vxnSj09Ulzs7VBXPN.jpg",
        "https://t3.ftcdn.net/jpg/16/07/18/08/240_F_1607180897_5ZgI2RMcTjgvdoBxAb41PUp877S4Vs14.jpg",
        "https://t4.ftcdn.net/jpg/02/07/79/17/240_F_207791780_FEdPfDqxU2ApLRPaHGrQov6WdGGZg9jm.jpg"
      ]
    },
    { title: "Holi Celebration", 
      date: "12 march 2025", 
      cover: "https://images.unsplash.com/photo-1724390265310-a4814e561d38?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fGFubnVhbCUyMGZ1bmN0aW9uJTIwZXZlbnQlMjBjb2xsZWdlfGVufDB8fDB8fHww", 
      photos: [ 
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30", 
        "https://images.unsplash.com/photo-1506157786151-b8491531f063", 
        "https://images.unsplash.com/photo-1724003450406-6a7c120a26ef?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fGFubnVhbCUyMGZ1bmN0aW9uJTIwZXZlbnQlMjBjb2xsZWdlfGVufDB8fDB8fHww" 
      ] 
    }  
    
  ];




  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event, index) => (
          <GalleryCard
            key={index}
            event={event}
            onClick={setSelectedEvent}
          />
        ))}
      </div>

      {selectedEvent && (
        <GalleryModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </section>
  );
};

export default Gallery;
