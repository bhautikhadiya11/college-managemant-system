import {
  BookOpen,
  GraduationCap,
  CheckCircle,
  Users,
  Trophy,
} from "lucide-react";

const BBA = () => {

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
          src="https://images.pexels.com/photos/7691694/pexels-photo-7691694.jpeg"
          alt="BBA Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Bachelor of Business Administration (BBA)
            </h1>
            <p className="text-gray-200 text-lg">
              Building future-ready business professionals.
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

      {/* ================= ABOUT BBA ================= */}
      <div className="w-full flex flex-col md:flex-row">
        <div className="md:w-1/2 w-full">
          <img
            src="https://images.pexels.com/photos/5905557/pexels-photo-5905557.jpeg"
            alt="About BBA"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="md:w-1/2 w-full bg-blue-950 text-white px-10 py-16">
          <h2 className="text-3xl font-bold mb-6">About BBA</h2>
         <p className="text-gray-200 leading-relaxed mb-5">
          The programme is structured to develop analytical thinking,
          problem-solving abilities, and ethical decision-making skills
          essential for modern business environments. Students are
          continuously exposed to real-world business scenarios through
          case studies, presentations, group discussions, and industry-oriented
          assignments.
        </p>
        <p className="text-gray-200 leading-relaxed mb-5">
          Emphasis is placed on communication skills, leadership development,
          teamwork, and professional competence throughout the six semesters.
          The curriculum integrates contemporary business tools, digital
          literacy, and emerging trends such as entrepreneurship, innovation,
          and sustainability.
        </p>
        <p className="text-gray-200 leading-relaxed mb-5">
          The BBA programme also encourages holistic development through
          participation in student clubs, management fests, workshops,
          seminars, and guest lectures by industry experts. These activities
          help students build confidence, networking skills, and a strong
          professional outlook.
        </p>
        <p className="text-gray-200 leading-relaxed">
          Graduates of the programme are well-equipped to pursue higher
          education such as MBA, professional certifications, or enter
          diverse career paths in corporate organizations, startups,
          family businesses, and public sector enterprises.
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
        <ul className="grid md:grid-cols-2 gap-6 text-gray-900 ">
          <li>✔ 3 Years (6 Semesters)</li>
          <li>✔ Full-Time Programme</li>
          <li>✔ CBCS Curriculum</li>
          <li>✔ Industry Projects & Internship</li>
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
              "International Business",
              "Entrepreneurship",
              "Banking & Financial Services",
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
          Passed 10+2 from a recognized board in any stream.
        </p>
      </section>

     <section
  id="clubs"
  className="bg-gray-100 py-16 scroll-mt-32"
>
  <div className="max-w-6xl mx-auto px-6">
    <h2 className="text-3xl font-bold text-blue-900 mb-8">
      Student Clubs
    </h2>

    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">

      {/* Club 1 */}
      <div className="bg-white rounded-xl shadow hover:shadow-md transition">
        <img
          src="https://images.pexels.com/photos/3184638/pexels-photo-3184638.jpeg"
          alt="Management Club"
          className="w-full h-48 object-cover rounded-t-xl"
        />
        <div className="p-5">
          <h3 className="font-semibold text-lg text-gray-800 mb-2">
            Management Club
          </h3>
          <p className="text-gray-600 text-sm">
            The Management Club focuses on developing leadership,
            decision-making, and strategic thinking skills through
            debates, case study competitions, quizzes, and management
            workshops.
          </p>
        </div>
      </div>

      {/* Club 2 */}
      <div className="bg-white rounded-xl shadow hover:shadow-md transition">
        <img
          src="https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg"
          alt="Entrepreneurship Cell"
          className="w-full h-48 object-cover rounded-t-xl"
        />
        <div className="p-5">
          <h3 className="font-semibold text-lg text-gray-800 mb-2">
            Entrepreneurship Cell
          </h3>
          <p className="text-gray-600 text-sm">
            The Entrepreneurship Cell encourages innovation and startup
            culture by organizing idea pitch sessions, startup talks,
            mentoring programs, and interaction with successful
            entrepreneurs.
          </p>
        </div>
      </div>

      {/* Club 3 */}
      <div className="bg-white rounded-xl shadow hover:shadow-md transition">
        <img
          src="https://images.pexels.com/photos/3182796/pexels-photo-3182796.jpeg"
          alt="Cultural & Sports Club"
          className="w-full h-48 object-cover rounded-t-xl"
        />
        <div className="p-5">
          <h3 className="font-semibold text-lg text-gray-800 mb-2">
            Cultural & Sports Club
          </h3>
          <p className="text-gray-600 text-sm">
            This club promotes holistic development through cultural
            events, sports tournaments, annual fests, and recreational
            activities, fostering teamwork, creativity, and discipline.
          </p>
        </div>
      </div>

    </div>
  </div>
</section>


      <section
  id="achievements"
  className="max-w-6xl mx-auto px-6 py-16 scroll-mt-32"
>
  <h2 className="text-3xl font-bold text-blue-900 mb-8">
    Achievements & Events
  </h2>

  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">

    {/* Achievement 1 */}
    <div className="bg-white rounded-xl shadow hover:shadow-md transition">
      <img
        src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg"
        alt="Management Fest"
        className="w-full h-48 object-cover rounded-t-xl"
      />
      <div className="p-5">
        <h3 className="font-semibold text-lg text-gray-800 mb-2">
          National Level Management Fest
        </h3>
        <p className="text-gray-600 text-sm">
          BBA students actively participated and secured awards in
          inter-college management fests, showcasing leadership,
          strategy, and presentation skills at the national level.
        </p>
      </div>
    </div>

    {/* Achievement 2 */}
    <div className="bg-white rounded-xl shadow hover:shadow-md transition">
      <img
        src="https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg"
        alt="Guest Lecture"
        className="w-full h-48 object-cover rounded-t-xl"
      />
      <div className="p-5">
        <h3 className="font-semibold text-lg text-gray-800 mb-2">
          Industry Guest Lectures
        </h3>
        <p className="text-gray-600 text-sm">
          Regular expert sessions and guest lectures are conducted by
          corporate leaders and entrepreneurs, providing real-world
          business insights and career guidance to students.
        </p>
      </div>
    </div>

    {/* Achievement 3 */}
    <div className="bg-white rounded-xl shadow hover:shadow-md transition">
      <img
        src="https://images.pexels.com/photos/3182765/pexels-photo-3182765.jpeg"
        alt="Startup Event"
        className="w-full h-48 object-cover rounded-t-xl"
      />
      <div className="p-5">
        <h3 className="font-semibold text-lg text-gray-800 mb-2">
          Startup & Innovation Events
        </h3>
        <p className="text-gray-600 text-sm">
          Students participated in startup pitch events, innovation
          challenges, and entrepreneurship programs, encouraging
          creative thinking and business innovation.
        </p>
      </div>
    </div>

  </div>
</section>


    </div>
  );
};

export default BBA;

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
