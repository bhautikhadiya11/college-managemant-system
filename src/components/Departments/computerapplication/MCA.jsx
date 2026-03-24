import {
  BookOpen,
  GraduationCap,
  CheckCircle,
  Users,
  Trophy,
} from "lucide-react";

const MCA = () => {
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
          src="https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg"
          alt="MCA Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/45"></div>

        <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Master of Computer Applications (MCA)
            </h1>
            <p className="text-gray-200 text-lg">
              Developing advanced professionals for the digital future.
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

      {/* ================= ABOUT MCA ================= */}
      <div className="w-full flex flex-col md:flex-row">
        <div className="md:w-1/2 w-full">
          <img
            src="https://images.pexels.com/photos/34804003/pexels-photo-34804003.jpeg"
            alt="About MCA"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="md:w-1/2 w-full bg-blue-900 text-white px-10 py-16">
          <h2 className="text-3xl font-bold mb-6">About MCA</h2>

          <p className="text-gray-200 leading-relaxed mb-5">
            The Master of Computer Applications (MCA) programme is designed
            to provide advanced knowledge in computer science, software
            development, and information technology. The programme focuses
            on building strong technical, analytical, and problem-solving
            skills required in today’s technology-driven industries.
          </p>

          <p className="text-gray-200 leading-relaxed mb-5">
            The curriculum includes advanced programming, data structures,
            algorithms, databases, cloud computing, artificial intelligence,
            and emerging technologies, along with hands-on practical
            exposure through laboratories and real-world projects.
          </p>

          <p className="text-gray-200 leading-relaxed mb-5">
            Emphasis is placed on system design, application development,
            research orientation, and professional ethics to ensure
            industry relevance and global competitiveness.
          </p>

          <p className="text-gray-200 leading-relaxed">
            Graduates of the MCA programme are well-prepared for careers
            in software development, system analysis, data science,
            cloud engineering, cyber security, or higher academic
            research and doctoral studies.
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
          <li>✔ Advanced & Industry-Oriented Curriculum</li>
          <li>✔ Projects, Internships & Research Work</li>
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
              "Software Engineering",
              "Data Science & Analytics",
              "Artificial Intelligence & Machine Learning",
              "Cyber Security",
              "Cloud Computing",
              "Full Stack Development",
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
          Bachelor’s degree in Computer Applications, Computer Science,
          Information Technology, or related discipline with Mathematics
          as a subject at 10+2 or graduation level as per university norms.
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
                title: "Advanced Coding Club",
                img: "https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg",
                desc: "Enhances advanced programming skills through coding challenges, hackathons, and collaborative projects.",
              },
              {
                title: "AI & Data Science Club",
                img: "https://images.pexels.com/photos/3861964/pexels-photo-3861964.jpeg",
                desc: "Focuses on artificial intelligence, data science projects, research discussions, and innovation activities.",
              },
              {
                title: "Cyber & Cloud Club",
                img: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg",
                desc: "Promotes knowledge in cyber security, cloud platforms, ethical hacking, and emerging IT technologies.",
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
              title: "National Hackathons & Coding Challenges",
              img: "https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg",
              desc: "MCA students participated and secured top positions in national-level hackathons and coding competitions.",
            },
            {
              title: "Industry-Oriented Tech Workshops",
              img: "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg",
              desc: "Workshops conducted on cloud computing, AI tools, cyber security, and software development frameworks.",
            },
            {
              title: "Research & Innovation Projects",
              img: "https://images.pexels.com/photos/3182765/pexels-photo-3182765.jpeg",
              desc: "Students developed innovative applications and research projects addressing real-world technology challenges.",
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

export default MCA;

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
