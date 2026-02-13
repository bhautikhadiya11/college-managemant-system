import React from "react";  

const Sports = () => {
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    const navbarOffset = 120;
    const y =
      section.getBoundingClientRect().top +
      window.pageYOffset -
      navbarOffset;

    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <div className="w-full bg-white">

      {/* ===== HEADING ===== */}
      <section className="py-24 md:py-32 text-center px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-[#0B1F44] mb-4">
          Sports & Student Life
        </h1>
        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed text-sm md:text-base">
          Sports at our campus are not just activities — they are a way of life.
          They build discipline, leadership, teamwork, resilience, and a winning
          mindset that stays with students far beyond college and reflects in
          their professional and personal journeys.
        </p>
      </section>

      {/* ===== SPORTS NAV CARDS ===== */}
      <section className="max-w-6xl mx-auto px-6 mb-32">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 text-center">

          {[
            { id: "cricket", name: "Cricket", img: "https://images.pexels.com/photos/11204757/pexels-photo-11204757.jpeg" },
            { id: "football", name: "Football", img: "https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg" },
            { id: "tennis", name: "Tennis", img: "https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg" },
            { id: "badminton", name: "Badminton", img: "https://images.pexels.com/photos/3660204/pexels-photo-3660204.jpeg" },
            { id: "athletics", name: "Athletics", img: "https://images.pexels.com/photos/414029/pexels-photo-414029.jpeg" },
          ].map((sport) => (
            <button
              key={sport.id}
              onClick={() => scrollToSection(sport.id)}
              className="group transition"
            >
              <img
                src={sport.img}
                className="rounded-xl h-36 md:h-40 w-full object-cover transition-transform duration-300 group-hover:scale-105 group-hover:shadow-lg cursor-pointer"
              />
              <p className="mt-2 font-semibold text-sm md:text-base group-hover:text-[#0B1F44]">
                {sport.name}
              </p>
            </button>
          ))}

        </div>
      </section>

      {/* ===== CRICKET ===== */}
      <section id="cricket" className="max-w-6xl mx-auto px-6 py-24 mb-32">
        <SportBlock
          title="Cricket"
          img="https://images.pexels.com/photos/11204757/pexels-photo-11204757.jpeg"
          reverse={false}
          content={[
            "Cricket is the backbone of our campus sports culture, engaging students throughout the academic year with structured practice sessions and competitive matches.",
            "Students are trained not only in technical skills but also in discipline, match temperament, leadership, and strategic decision-making.",
          ]}
          points={[
            "Regular inter-department cricket leagues fostering healthy competition",
            "Consistent participation in inter-college and university-level tournaments",
            "Multiple students shortlisted for district and zonal teams",
            "Focus on teamwork, fitness, sports ethics, and mental resilience",
            "Annual flagship cricket tournament with wide student participation",
          ]}
        />
      </section>

      {/* ===== FOOTBALL ===== */}
      <section id="football" className="max-w-6xl mx-auto px-6 py-24 mb-32">
        <SportBlock
          title="Football"
          img="https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg"
          reverse={true}
          content={[
            "Football on campus represents unity, stamina, and tactical excellence, encouraging students to perform under pressure.",
            "Training sessions emphasize endurance, coordination, teamwork, and match awareness.",
          ]}
          points={[
            "Champions of Annual Sports Week football tournament",
            "Participation in zonal and inter-college competitions",
            "Recognition for fair play and team coordination",
            "Strong emphasis on physical conditioning and discipline",
            "Promotes leadership and decision-making under pressure",
          ]}
        />
      </section>

      {/* ===== TENNIS ===== */}
      <section id="tennis" className="max-w-6xl mx-auto px-6 py-24 mb-32">
        <SportBlock
          title="Tennis"
          img="https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg"
          reverse={false}
          content={[
            "Tennis builds individual excellence, mental toughness, and sharp reflexes among students.",
            "The sport helps students develop focus, agility, and self-discipline through structured training routines.",
          ]}
          points={[
            "Inter-college singles and doubles tournament participation",
            "Regular campus tennis league matches",
            "Improvement in agility, precision, and mental endurance",
            "Encourages independent confidence and competitive spirit",
            "Access to quality courts and guided practice sessions",
          ]}
        />
      </section>

      {/* ===== BADMINTON ===== */}
      <section id="badminton" className="max-w-6xl mx-auto px-6 py-24 mb-32">
        <SportBlock
          title="Badminton"
          img="https://images.pexels.com/photos/3660204/pexels-photo-3660204.jpeg"
          reverse={true}
          content={[
            "Badminton enhances speed, balance, and reflexes while keeping students physically active.",
            "Fast-paced matches improve coordination, concentration, and stamina.",
          ]}
          points={[
            "Inter-department badminton champions",
            "Active participation in college-level indoor tournaments",
            "Strong indoor sports culture with year-round engagement",
            "Focus on agility, footwork, and endurance",
            "Inclusive participation across academic years",
          ]}
        />
      </section>

      {/* ===== ATHLETICS ===== */}
      <section id="athletics" className="max-w-6xl mx-auto px-6 py-24 mb-24">
        <SportBlock
          title="Athletics"
          img="https://images.pexels.com/photos/414029/pexels-photo-414029.jpeg"
          reverse={false}
          content={[
            "Athletics form the foundation of physical fitness on campus, promoting strength, endurance, and perseverance.",
            "Track and field events motivate students to push personal boundaries and build long-term fitness habits.",
          ]}
          points={[
            "Annual athletics meet with strong student participation",
            "Representation in zonal and inter-college events",
            "Structured endurance and strength training programs",
            "Encourages goal-setting and self-improvement",
            "Builds resilience, consistency, and physical confidence",
          ]}
        />
      </section>

    </div>
  );
};



/* ===== REUSABLE SPORT BLOCK ===== */
const SportBlock = ({ title, img, content, points, reverse }) => (
  <div className={`grid md:grid-cols-2 gap-12 items-center ${reverse ? "md:flex-row-reverse" : ""}`}>
    <div>
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      {content.map((text, i) => (
        <p key={i} className="text-gray-700 mb-4 text-sm md:text-base">
          {text}
        </p>
      ))}
      <ul className="space-y-2 text-gray-700 text-sm md:text-base">
        {points.map((p, i) => (
          <li key={i}>• {p}</li>
        ))}
      </ul>
    </div>

    <img
      src={img}
      className="rounded-xl h-64 md:h-72 w-full object-cover"
    />

    
  </div>



);

export default Sports;
