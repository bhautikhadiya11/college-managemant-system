import {
  BookOpen,
  GraduationCap,
  CheckCircle,
  Users,
  Trophy,
} from "lucide-react";

const BCOM = () => {

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
          src="https://images.pexels.com/photos/4386367/pexels-photo-4386367.jpeg"
          alt="BCOM Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Bachelor of Commerce (B.Com)
            </h1>
            <p className="text-gray-200 text-lg">
              Building strong foundations in commerce, finance, and business.
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

      {/* ================= ABOUT BCOM ================= */}
      <div className="w-full flex flex-col md:flex-row">
        <div className="md:w-1/2 w-full">
          <img
            src="https://images.pexels.com/photos/4386373/pexels-photo-4386373.jpeg"
            alt="About BCOM"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="md:w-1/2 w-full bg-blue-950 text-white px-10 py-16">
          <h2 className="text-3xl font-bold mb-6">About B.Com</h2>

          <p className="text-gray-200 leading-relaxed mb-5">
            The Bachelor of Commerce (B.Com) programme is designed to
            provide students with a strong academic foundation in
            commerce, accounting, finance, taxation, and economics.
            The programme prepares students to understand the
            functioning of business organizations and financial systems.
          </p>

          <p className="text-gray-200 leading-relaxed mb-5">
            Emphasis is placed on analytical skills, numerical ability,
            financial literacy, and ethical business practices.
            Students are exposed to practical learning through case
            studies, projects, presentations, and industry-oriented
            assignments.
          </p>

          <p className="text-gray-200 leading-relaxed mb-5">
            The curriculum integrates modern business tools, digital
            accounting practices, and regulatory frameworks to ensure
            industry relevance and professional competence.
          </p>

          <p className="text-gray-200 leading-relaxed">
            Graduates of the B.Com programme are well-equipped to pursue
            professional courses such as CA, CS, CMA, MBA, or careers
            in banking, finance, accounting, taxation, and corporate
            management.
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
          <li>✔ Duration: 3 Years (6 Semesters)</li>
          <li>✔ Full-Time Undergraduate Programme</li>
          <li>✔ Commerce & Finance Focused Curriculum</li>
          <li>✔ Projects, Internships & Practical Training</li>
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
              "Accounting & Auditing",
              "Banking & Finance",
              "Taxation",
              "Business Economics",
              "Financial Management",
              "Corporate Accounting",
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
          Passed 10+2 from a recognized board (Commerce stream preferred)
          as per university norms.
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
                title: "Commerce & Finance Club",
                img: "https://images.pexels.com/photos/4386371/pexels-photo-4386371.jpeg",
                desc: "Focuses on accounting practices, financial analysis, stock market awareness, and commerce-based activities.",
              },
              {
                title: "Entrepreneurship Cell",
                img: "https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg",
                desc: "Encourages innovation, startup ideas, and entrepreneurial mindset through workshops and mentoring.",
              },
              {
                title: "Cultural & Sports Club",
                img: "https://images.pexels.com/photos/3182796/pexels-photo-3182796.jpeg",
                desc: "Promotes holistic development through cultural programs, sports events, and inter-college competitions.",
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
              title: "Inter-College Commerce Competitions",
              img: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg",
              desc: "B.Com students participated and won awards in accounting quizzes and commerce competitions.",
            },
            {
              title: "Industry & Banking Guest Lectures",
              img: "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg",
              desc: "Guest lectures by finance professionals, bankers, and chartered accountants.",
            },
            {
              title: "Financial Literacy & Tax Workshops",
              img: "https://images.pexels.com/photos/5915230/pexels-photo-5915230.jpeg",
              desc: "Workshops conducted on taxation, investment planning, and financial awareness.",
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

export default BCOM;

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
