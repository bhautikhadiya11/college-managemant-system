import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const About = () => {
  const location = useLocation();
  const fromLearnMore = location.state?.fromLearnMore;

  const [animate, setAnimate] = useState(false);

  /*  IMPACT COUNTING STATES */
  const [students, setStudents] = useState(0);
  const [faculty, setFaculty] = useState(0);
  const [modules, setModules] = useState(0);
  const [automation, setAutomation] = useState(0);

  /*  COUNTING EFFECT */
  useEffect(() => {
    const counter = setInterval(() => {
      setStudents((p) => (p < 3200 ? p + 40 : p));
      setFaculty((p) => (p < 210 ? p + 2 : p));
      setModules((p) => (p < 48 ? p + 1 : p));
      setAutomation((p) => (p < 18 ? p + 1 : p));
    }, 40);

    return () => clearInterval(counter);
  }, []);

  /* 🎬 ENTRY ANIMATION */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    if (fromLearnMore) {
      setTimeout(() => setAnimate(true), 50);
    } else {
      setAnimate(true);
    }
  }, [fromLearnMore]);

  return (
    <div
      className={`w-full overflow-x-hidden transition-all duration-700 ease-out
      ${fromLearnMore && !animate ? "opacity-0 translate-y-6" : "opacity-100 translate-y-0"}`}
    >

      {/* ABOUT INTRO SECTION */}
{/* ABOUT US INTRO SECTION */}
<section className="bg-blue-950 text-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">

    {/* CENTER HEADING */}
    <h1 className="text-xl sm:text-4xl font-bold text-center mb-12">
      About Us
    </h1>

    {/* TOP CONTENT */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-10">

      {/* LEFT TEXT */}
      <div className="leading-relaxed text-sm sm:text-base space-y-6 text-gray-100">
        <p>
          Campus Flow is committed to offering an ideal and innovative digital
          learning environment while upholding the core values of academic
          excellence. It is designed to digitize academic and administrative
          operations for modern educational institutions.
        </p>

        <p>
          The platform connects students, faculty, and administrators through a
          centralized system that ensures seamless access to academic records,
          attendance management, communication tools, and institutional
          resources.
        </p>

        <p>
          Campus Flow emphasizes transparency, efficiency, and scalability,
          enabling institutions to manage campus operations effectively in a
          technology-driven academic landscape.
        </p>
      </div>

      {/* RIGHT IMAGE (NEW WORKING IMAGE) */}
      <div>
        <img
          src="https://images.pexels.com/photos/1370296/pexels-photo-1370296.jpeg"
          alt="Students Collaboration"
          className="rounded-xl shadow-2xl w-full object-cover"
        />
      </div>

    </div>

    {/* BOTTOM CONTINUED TEXT */}
    <div className="leading-relaxed text-sm sm:text-base space-y-6 text-gray-100">
      <p>
        By integrating technology with academic workflows, Campus Flow reduces
        manual processes, improves data accuracy, and strengthens collaboration
        across departments. The system supports informed decision-making and
        streamlined campus operations.
      </p>

      <p>
        Campus Flow creates a connected campus ecosystem that nurtures
        innovation, accountability, and student success while empowering
        faculty and administrators with efficient digital tools.
      </p>
    </div>

  </div>
</section>


      {/* WHY NEEDED */}
      <section className="bg-gray-100 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid gap-10 md:grid-cols-2 items-center">
          <img
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
            alt="Problems"
            className="rounded-xl shadow-lg w-full"
          />
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-blue-950 mb-4 sm:mb-6">
              Why Campus Flow is Needed
            </h2>
            <ul className="space-y-3 text-gray-700 text-sm sm:text-base">
              <li>• Manual attendance and record maintenance</li>
              <li>• Delayed communication between departments</li>
              <li>• Lack of centralized academic data</li>
              <li>• Inefficient administrative workflows</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CORE MODULES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-blue-950 mb-10 text-center">
          Core Modules of Campus Flow
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Student Management", img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f" },
            { title: "Faculty Management", img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df" },
            { title: "Attendance System", img: "https://images.unsplash.com/photo-1509062522246-3755977927d7" },
            { title: "Notice & Communication", img: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2" },
            { title: "Academic Planning", img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4" },
            { title: "Admin Dashboard", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71" },
          ].map((m, i) => (
            <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <img src={m.img} alt={m.title} className="h-40 sm:h-44 w-full object-cover" />
              <div className="p-5 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-blue-950 text-center">
                  {m.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      


      {/* HOW IT WORKS */}
      <section className="bg-blue-950 text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid gap-10 md:grid-cols-2 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
              How Campus Flow Works
            </h2>
            <ol className="space-y-3 text-gray-200 list-decimal list-inside text-sm sm:text-base">
              <li>Role-based secure login</li>
              <li>Dedicated dashboards</li>
              <li>Real-time data updates</li>
              <li>Data-driven decisions</li>
            </ol>
          </div>
          <img
            src="https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1600&q=80"
            alt="Workflow"
            className="rounded-xl shadow-lg w-full"
          />
        </div>
      </section>

      {/* MISSION & VISION */}
<section className="bg-gray-100 py-16 sm:py-20">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-20">

    {/* MISSION */}
    <div className="grid gap-12 md:grid-cols-2 items-center">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-blue-950 mb-6">
          Mission
        </h2>

        <ul className="space-y-3 text-gray-700 text-sm sm:text-base">
          <li>• To digitize academic and administrative operations efficiently</li>
          <li>• To promote transparency through centralized campus systems</li>
          <li>• To reduce manual workload using smart automation</li>
          <li>• To empower students and faculty with real-time digital access</li>
          <li>• To enhance operational accuracy and institutional efficiency</li>
        </ul>
      </div>

      <img
        src="https://images.pexels.com/photos/7666429/pexels-photo-7666429.jpeg"
        alt="Mission Campus Flow"
        className="rounded-xl shadow-lg w-full object-cover"
      />
    </div>

    {/* VISION */}
    <div className="grid gap-12 md:grid-cols-2 items-center">
      <img
        src="https://images.pexels.com/photos/355952/pexels-photo-355952.jpeg"
        alt="Vision Campus Flow"
        className="rounded-xl shadow-lg w-full object-cover"
      />

      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-blue-950 mb-6">
          Vision
        </h2>

        <ul className="space-y-3 text-gray-700 text-sm sm:text-base">
          <li>• To build a future-ready digital campus ecosystem</li>
          <li>• To support innovation-driven education environments</li>
          <li>• To enable data-driven academic decision-making</li>
          <li>• To create a scalable and secure campus platform</li>
          <li>• To transform institutions through technology-led excellence</li>
        </ul>
      </div>
    </div>

  </div>
</section>

      

    </div>
  );
};

export default About;
