import {
  BookOpen,
  GraduationCap,
  CheckCircle,
  Users,
  Trophy,
} from "lucide-react";

const MCOM = () => {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full">

      {/* ================= TOP BAR WITH BACKGROUND IMAGE ================= */}
      <div className="relative w-full h-[620px] md:h-[720px]">
        <img
          src="https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg"
          alt="MCom Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/45"></div>

        <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Master of Commerce (M.Com)
            </h1>
            <p className="text-gray-200 text-lg">
              Deepening expertise in commerce, finance, and business research.
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

      {/* ================= ABOUT MCOM ================= */}
      <div className="w-full flex flex-col md:flex-row">
        <div className="md:w-1/2 w-full">
          <img
            src="https://images.pexels.com/photos/4386379/pexels-photo-4386379.jpeg"
            alt="About MCom"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="md:w-1/2 w-full bg-blue-950 text-white px-10 py-16">
          <h2 className="text-3xl font-bold mb-6">About M.Com</h2>

          <p className="text-gray-200 leading-relaxed mb-5">
            The Master of Commerce (M.Com) programme is designed for graduates
            seeking advanced knowledge in commerce, finance, accounting,
            taxation, and economic analysis. The programme strengthens
            conceptual clarity and analytical capabilities required for
            professional and academic growth.
          </p>

          <p className="text-gray-200 leading-relaxed mb-5">
            The curriculum focuses on research orientation, critical thinking,
            and advanced financial practices. Students engage in seminars,
            case-based discussions, data analysis, and project work to gain
            in-depth subject expertise.
          </p>

          <p className="text-gray-200 leading-relaxed mb-5">
            Emphasis is also placed on ethical business practices, regulatory
            frameworks, and contemporary developments in global commerce and
            financial markets.
          </p>

          <p className="text-gray-200 leading-relaxed">
            Graduates are well-prepared for careers in academics, research,
            banking, finance, taxation, corporate management, or for pursuing
            doctoral studies and professional certifications.
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
          <li>✔ Research & Theory-Oriented Curriculum</li>
          <li>✔ Projects, Seminars & Dissertation Work</li>
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
              "Advanced Accounting",
              "Corporate Finance",
              "Tax Planning & Compliance",
              "Banking & Insurance",
              "Business Economics",
              "Financial Analytics",
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
          Bachelor’s degree in Commerce or a related discipline from a
          recognized university with eligibility criteria as prescribed
          by the institution.
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
                title: "Finance & Investment Club",
                img: "https://images.pexels.com/photos/4386369/pexels-photo-4386369.jpeg",
                desc: "Focuses on financial markets, investment analysis, portfolio management, and corporate finance discussions.",
              },
              {
                title: "Research & Academic Forum",
                img: "https://images.pexels.com/photos/4386345/pexels-photo-4386345.jpeg",
                desc: "Encourages academic research, paper presentations, seminars, and scholarly discussions.",
              },
              {
                title: "Cultural & Wellness Club",
                img: "https://images.pexels.com/photos/3182796/pexels-photo-3182796.jpeg",
                desc: "Promotes balance through cultural programs, sports activities, and wellness initiatives.",
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
              title: "National Commerce Conferences",
              img: "https://images.pexels.com/photos/3184301/pexels-photo-3184301.jpeg",
              desc: "Students presented research papers and participated in national-level commerce and finance conferences.",
            },
            {
              title: "Professional Certification Workshops",
              img: "https://images.pexels.com/photos/4386372/pexels-photo-4386372.jpeg",
              desc: "Workshops conducted on CA, CS, CMA, and financial certification pathways.",
            },
            {
              title: "Industry Interaction Programs",
              img: "https://images.pexels.com/photos/3182765/pexels-photo-3182765.jpeg",
              desc: "Interactive sessions with industry experts, bankers, and finance professionals.",
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

export default MCOM;

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
