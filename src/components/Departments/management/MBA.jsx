import {
  BookOpen,
  GraduationCap,
  CheckCircle,
  Users,
  Trophy,
} from "lucide-react";

const MBA = () => {

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full">

      {/* ================= TOP BAR WITH BACKGROUND IMAGE ================= */}
      <div className="relative w-full h-[625px] md:h-[725px]">
        <img
          src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg"
          alt="MBA Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Master of Business Administration (MBA)
            </h1>
            <p className="text-gray-200 text-lg">
              Shaping strategic leaders for the global business world.
            </p>
          </div>
        </div>
      </div>

      {/* ================= ICON NAVIGATION ================= */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-5">

          <NavCard icon={<BookOpen />} label="Program Details" onClick={() => scrollToSection("program")} />
          <NavCard icon={<GraduationCap />} label="Specializations" onClick={() => scrollToSection("specializations")} />
          <NavCard icon={<CheckCircle />} label="Eligibility" onClick={() => scrollToSection("eligibility")} />
          <NavCard icon={<Users />} label="Clubs" onClick={() => scrollToSection("clubs")} />
          <NavCard icon={<Trophy />} label="Achievements & Events" onClick={() => scrollToSection("achievements")} />

        </div>
      </div>

      {/* ================= ABOUT MBA ================= */}
      <div className="w-full flex flex-col md:flex-row">
        <div className="md:w-1/2 w-full">
          <img
            src="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg"
            alt="About MBA"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="md:w-1/2 w-full bg-blue-950 text-white px-10 py-16">
          <h2 className="text-3xl font-bold mb-6">About MBA</h2>

          <p className="text-gray-200 leading-relaxed mb-5">
            The Master of Business Administration (MBA) programme is
            designed to develop strategic thinking, leadership
            capabilities, and advanced managerial skills required in
            today’s competitive business environment.
          </p>

          <p className="text-gray-200 leading-relaxed mb-5">
            The curriculum emphasizes analytical decision-making,
            innovation, ethical leadership, and global business
            perspectives through case studies, simulations, live
            projects, and industry interactions.
          </p>

          <p className="text-gray-200 leading-relaxed mb-5">
            Students gain hands-on exposure through internships,
            corporate projects, workshops, seminars, and expert
            sessions delivered by experienced industry professionals.
          </p>

          <p className="text-gray-200 leading-relaxed">
            The programme prepares graduates for senior management
            roles, entrepreneurship, consulting, and leadership
            positions across diverse industries.
          </p>
        </div>
      </div>

      {/* ================= PROGRAM DETAILS ================= */}
      <section
        id="program"
        className="max-w-6xl mx-auto px-6 py-16 scroll-mt-32"
      >
        <h2 className="text-3xl font-bold text-blue-900 mb-6">
          Program Details
        </h2>
        <ul className="grid md:grid-cols-2 gap-6 text-gray-900">
          <li>✔ Duration: 2 Years (4 Semesters)</li>
          <li>✔ Full-Time Postgraduate Programme</li>
          <li>✔ Industry-Oriented Curriculum</li>
          <li>✔ Summer Internship & Live Projects</li>
        </ul>
      </section>

      {/* ================= SPECIALIZATIONS ================= */}
      <section
        id="specializations"
        className="bg-gray-100 py-16 scroll-mt-32"
      >
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-blue-900 mb-6">
            Specializations Offered
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              "Marketing Management",
              "Finance",
              "Human Resource Management",
              "Operations Management",
              "International Business",
              "Entrepreneurship & Innovation",
            ].map((spec, i) => (
              <div key={i} className="bg-white p-5 rounded-lg shadow">
                <h3 className="font-semibold">{spec}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= ELIGIBILITY ================= */}
      <section
        id="eligibility"
        className="max-w-6xl mx-auto px-6 py-16 scroll-mt-32"
      >
        <h2 className="text-3xl font-bold text-blue-900 mb-4">
          Eligibility Criteria
        </h2>
        <p className="text-gray-700 max-w-3xl">
          Graduation in any discipline from a recognized university with
          minimum eligibility criteria as prescribed by the institution.
        </p>
      </section>

      {/* ================= CLUBS ================= */}
      <section
        id="clubs"
        className="bg-gray-100 py-16 scroll-mt-32"
      >
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-blue-900 mb-8">
            Student Clubs
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              {
                title: "Leadership & Management Club",
                img: "https://images.pexels.com/photos/3184638/pexels-photo-3184638.jpeg",
                desc: "Enhances leadership, communication, and managerial skills through activities and competitions.",
              },
              {
                title: "Entrepreneurship Cell",
                img: "https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg",
                desc: "Promotes startup culture through idea pitching, mentoring, and innovation challenges.",
              },
              {
                title: "Cultural & Sports Club",
                img: "https://images.pexels.com/photos/3182796/pexels-photo-3182796.jpeg",
                desc: "Encourages holistic development through cultural events, sports, and team-building activities.",
              },
            ].map((club, i) => (
              <div key={i} className="bg-white rounded-xl shadow">
                <img
                  src={club.img}
                  alt={club.title}
                  className="w-full h-48 object-cover rounded-t-xl"
                />
                <div className="p-5">
                  <h3 className="font-semibold text-lg mb-2">
                    {club.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{club.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= ACHIEVEMENTS ================= */}
      <section
        id="achievements"
        className="max-w-6xl mx-auto px-6 py-16 scroll-mt-32"
      >
        <h2 className="text-3xl font-bold text-blue-900 mb-8">
          Achievements & Events
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[
            {
              title: "National Case Study Competitions",
              img: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg",
              desc: "MBA students secured top positions in national-level case study and management competitions.",
            },
            {
              title: "Corporate Guest Lectures",
              img: "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg",
              desc: "Regular expert talks by industry leaders to bridge the gap between academia and industry.",
            },
            {
              title: "Startup & Innovation Summits",
              img: "https://images.pexels.com/photos/3182765/pexels-photo-3182765.jpeg",
              desc: "Students actively participated in startup summits, innovation challenges, and business conclaves.",
            },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-xl shadow">
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-48 object-cover rounded-t-xl"
              />
              <div className="p-5">
                <h3 className="font-semibold text-lg mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default MBA;

/* ================= NAV CARD ================= */

const NavCard = ({ icon, label, onClick }) => (
  <div
    onClick={onClick}
    className="flex items-center gap-4 p-5 border rounded-xl bg-white shadow-sm hover:shadow-md cursor-pointer transition"
  >
    <div className="text-blue-700">{icon}</div>
    <span className="font-semibold text-gray-800">{label}</span>
  </div>
);
