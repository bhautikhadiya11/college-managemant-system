import {
  BookOpen,
  GraduationCap,
  CheckCircle,
  Users,
  Trophy,
} from "lucide-react";

const BCA = () => {
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
          src="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg"
          alt="BCA Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/45"></div>

        <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Bachelor of Computer Applications (BCA)
            </h1>
            <p className="text-gray-200 text-lg">
              Building skilled professionals for the digital world.
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

      {/* ================= ABOUT BCA ================= */}
      <div className="w-full flex flex-col md:flex-row">
        <div className="md:w-1/2 w-full">
          <img
            src="https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg"
            alt="About BCA"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="md:w-1/2 w-full bg-blue-900 text-white px-10 py-16">
          <h2 className="text-3xl font-bold mb-6">About BCA</h2>

          <p className="text-gray-200 leading-relaxed mb-5">
            The Bachelor of Computer Applications (BCA) programme is designed
            to provide students with strong foundations in computer science,
            software development, and information technology. The programme
            prepares students to meet the growing demands of the IT industry.
          </p>

          <p className="text-gray-200 leading-relaxed mb-5">
            The curriculum covers programming languages, data structures,
            databases, operating systems, networking, and web technologies,
            combined with hands-on laboratory work and real-world projects.
          </p>

          <p className="text-gray-200 leading-relaxed mb-5">
            Emphasis is placed on problem-solving, logical thinking,
            application development, and modern computing tools to ensure
            industry relevance and technical competence.
          </p>

          <p className="text-gray-200 leading-relaxed">
            Graduates of the BCA programme are well-equipped to pursue careers
            in software development, IT services, data analytics, web
            technologies, or higher education such as MCA and professional
            certifications.
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
          <li>✔ Industry-Oriented IT Curriculum</li>
          <li>✔ Practical Labs, Projects & Internships</li>
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
              "Software Development",
              "Web & Mobile Applications",
              "Data Science & Analytics",
              "Cyber Security",
              "Cloud Computing",
              "Artificial Intelligence",
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
          Passed 10+2 examination from a recognized board with Mathematics
          or Computer-related subjects as per university norms.
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
                title: "Coding & Development Club",
                img: "https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg",
                desc: "Enhances programming skills through coding challenges, hackathons, and project-based learning.",
              },
              {
                title: "Cyber & Tech Club",
                img: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg",
                desc: "Focuses on cyber security awareness, ethical hacking sessions, and emerging technology discussions.",
              },
              {
                title: "Innovation & Robotics Club",
                img: "https://images.pexels.com/photos/256381/pexels-photo-256381.jpeg",
                desc: "Encourages creativity, innovation, robotics projects, and tech-based problem solving.",
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
              title: "National Coding Competitions",
              img: "https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg",
              desc: "BCA students participated and secured top ranks in inter-college coding and hackathon events.",
            },
            {
              title: "Industry Tech Workshops",
              img: "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg",
              desc: "Hands-on workshops conducted on web development, cloud platforms, and modern technologies.",
            },
            {
              title: "Startup & Innovation Events",
              img: "https://images.pexels.com/photos/3182765/pexels-photo-3182765.jpeg",
              desc: "Students showcased innovative ideas and software solutions in startup and innovation programs.",
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

export default BCA;

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
