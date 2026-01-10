import React, { useEffect, useState } from "react";

const About = () => {

  /* 🔢 IMPACT COUNTING STATES */
  const [students, setStudents] = useState(0);
  const [faculty, setFaculty] = useState(0);
  const [modules, setModules] = useState(0);
  const [automation, setAutomation] = useState(0);

  /* 🔁 COUNTING EFFECT */
  useEffect(() => {
    const counter = setInterval(() => {
      setStudents((p) => (p < 3200 ? p + 40 : p));
      setFaculty((p) => (p < 210 ? p + 2 : p));
      setModules((p) => (p < 48 ? p + 1 : p));
      setAutomation((p) => (p < 18 ? p + 1 : p));
    }, 40);

    return () => clearInterval(counter);
  }, []);

  return (
    <div className="w-full overflow-x-hidden">

      {/* HERO */}
      <section className="relative h-[70vh] sm:h-[80vh] lg:h-[85vh]">
        <img
          src="/img/campus.jpg"
          alt="Campus"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-4 sm:px-6">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            Campus Flow
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-200 max-w-3xl">
            A Complete College Management System Designed to Digitize
            Academic & Administrative Operations
          </p>
        </div>
      </section>

      {/* WHAT IS CAMPUS FLOW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 grid gap-10 md:grid-cols-2 items-center">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-950 mb-4 sm:mb-6">
            What is Campus Flow?
          </h2>
          <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
            Campus Flow is a web-based College Management System that
            centralizes all academic and administrative activities into a
            single digital platform.
          </p>
          <p className="mt-4 text-gray-700 leading-relaxed text-sm sm:text-base">
            The system is designed to support students, faculty, and
            administrators by enabling seamless data flow.
          </p>
        </div>
        <img
          src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1400&q=80"
          alt="System overview"
          className="rounded-xl shadow-lg w-full"
        />
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

      {/* SYSTEM IMPACT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-blue-950 mb-10 text-center">
          Impact of Campus Flow
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center">
          <div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-950">
              {students}+
            </h3>
            <p className="text-gray-600 text-sm sm:text-base">Students Managed</p>
          </div>
          <div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-purple-600">
              {faculty}+
            </h3>
            <p className="text-gray-600 text-sm sm:text-base">Faculty Records</p>
          </div>
          <div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-600">
              {modules}+
            </h3>
            <p className="text-gray-600 text-sm sm:text-base">Courses</p>
          </div>
          <div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-orange-600">
              {automation}+
            </h3>
            <p className="text-gray-600 text-sm sm:text-base">Departments</p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
