import { useState } from "react";
import GalleryCard from "../components/GalleryCard";
import GalleryModal from "../components/GalleryModal";

const Gallery = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const events = [
    {
      title: "Republic Day Celebration",
      date: "26 Jan 2026",
      cover: "https://www.avcollege.ac.in/assets/resources/2021/02/IMG-20210202-WA0021.jpg",
      photos: [
        "https://plus.unsplash.com/premium_photo-1682092645573-edbd43c0dff2?w=600",
        "https://images.unsplash.com/photo-1757045147811-894406b70635?w=600",
        "https://newhorizoncollegeofengineering.in/wp-content/uploads/2025/01/DSC07358.jpg"
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
        "https://ljku.edu.in/web/image/46433-03bcdaad/WhatsApp%20Image%202025-06-02%20at%2014.02.35_b7a1fc0f.jpg", 
        "https://images.unsplash.com/photo-1724003450406-6a7c120a26ef?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fGFubnVhbCUyMGZ1bmN0aW9uJTIwZXZlbnQlMjBjb2xsZWdlfGVufDB8fDB8fHww" 
      ] 
    },
    {
      title: "Navratri Celebration",
      date: "2 oct 2025",
      cover: "https://ljku.edu.in/web/image/52463-dd727479/baa643531c1e45749bb086d0c9a65726.jpg",
      photos: [
        "https://ljku.edu.in/web/image/52443-8bdaf92c/3692cb5f3af442d1b02914f204224845.jpg",
        "https://ljku.edu.in/web/image/52438-216b66ae/373c18c070dc41768efc99cf3aa0de1b.jpg",
        "https://silveroakuni.ac.in/_next/image?url=http%3A%2F%2Flocalhost%3A3001%2Fgallery%2Frass_rasiya%2F2023%2F13.webp&w=1200&q=75",
        "https://silveroakuni.ac.in/_next/image?url=http%3A%2F%2Flocalhost%3A3001%2Fgallery%2Frass_rasiya%2Farchive%2F19.webp&w=1200&q=75"
      ]
    },
    { title: "Holi Celebration", 
      date: "12 march 2025", 
      cover: "https://images.unsplash.com/photo-1603228254119-e6a4d095dc59?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG9saSUyMGNlbGVicmF0aW9ufGVufDB8fDB8fHww", 
      photos: [ 
        "https://images.unsplash.com/photo-1616787716164-1ddf249132f8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGhvbGklMjBjZWxlYnJhdGlvbnxlbnwwfHwwfHx8MA%3D%3D", 
        "https://images.unsplash.com/photo-1553334490-011441d86dbb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fGhvbGklMjBjZWxlYnJhdGlvbnxlbnwwfHwwfHx8MA%3D%3D", 
        "https://plus.unsplash.com/premium_photo-1664304095595-e428558e8161?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fGhvbGklMjBjZWxlYnJhdGlvbnxlbnwwfHwwfHx8MA%3D%3D" 
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
