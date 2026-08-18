import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

/* Your original slider images */
const sliderImages = [
  "https://images.unsplash.com/photo-1592930954854-7d00c87d0cf4",
  "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3",
  "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
  "https://plus.unsplash.com/premium_photo-1684713510655-e6e31536168d",
];

const DashBoard = () => {
  const navigate = useNavigate();

  const [index, setIndex] = useState(0);
  const [students, setStudents] = useState(0);
  const [courses, setCourses] = useState(0);
  const [faculty, setFaculty] = useState(0);
  const [departments, setDepartments] = useState(0);

  // Auto slider
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % sliderImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Counting animation
  useEffect(() => {
    const counter = setInterval(() => {
      setStudents((p) => (p < 2200 ? p + 40 : p));
      setCourses((p) => (p < 24 ? p + 1 : p));
      setFaculty((p) => (p < 60 ? p + 2 : p));
      setDepartments((p) => (p < 6 ? p + 1 : p));
    }, 40);
    return () => clearInterval(counter);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <main className="grow">
        {/* SLIDER SECTION – always visible, no scroll effect */}
        <div className="relative w-full h-[625px] overflow-hidden">
          <img
            src={sliderImages[index]}
            alt="College Campus"
            className="w-full h-full object-cover"
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/40"></div>

          {/* Slogan Text – left side, middle */}
          <div className="absolute inset-0 flex items-center h-full px-8 md:px-16">
            <div className="max-w-xl text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg">
                Manage Your <span className="text-amber-300">Campus</span> Smarter
              </h1>
              <p className="text-lg md:text-xl text-white/90 mt-4 leading-relaxed">
                A complete College Management System – connecting students, faculty, and administration seamlessly.
              </p>
            </div>
          </div>

          {/* Slider dots */}
          <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-10">
            {sliderImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === index ? "w-6 bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>

        {/* ========== REST OF YOUR PAGE (COMPLETELY UNCHANGED) ========== */}
        <section className="px-10 py-14">
          <h1 className="text-3xl font-bold text-blue-950 text-center mb-10">
            Our College at a Glance
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-4xl font-bold text-blue-600">{students}+</h2>
              <p className="mt-2 font-medium">Students</p>
            </div>
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-4xl font-bold text-green-600">{courses}+</h2>
              <p className="mt-2 font-medium">Courses</p>
            </div>
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-4xl font-bold text-purple-600">{faculty}+</h2>
              <p className="mt-2 font-medium">Faculty Members</p>
            </div>
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-4xl font-bold text-orange-600">{departments}+</h2>
              <p className="mt-2 font-medium">Departments</p>
            </div>
          </div>
        </section>

        <section className="px-10 py-16 bg-white">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <img
              src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f"
              alt="Campus Flow"
              className="rounded-xl shadow-lg w-full"
            />
            <div>
              <h2 className="text-3xl font-bold text-blue-950 mb-4">About Campus Flow</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Campus Flow reflects the dynamic academic environment, modern infrastructure,
                and collaborative learning culture of our university. It connects students,
                faculty, and innovation into one seamless educational journey.
              </p>
              <button
                onClick={() => navigate("/about")}
                className="inline-block bg-blue-950 text-white px-6 py-3 rounded-lg font-medium hover:scale-[1.03] transition cursor-pointer"
              >
                Read More
              </button>
            </div>
          </div>
        </section>

        <section className="px-10 py-20 bg-gray-50">
          <h2 className="text-4xl font-bold text-center text-blue-950 mb-16">Best in Campus Flow</h2>
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            <div className="space-y-10 text-right">
              <div>
                <h3 className="text-xl font-semibold text-blue-900">Student-Driven Digital Experience</h3>
                <p className="text-gray-600 mt-2">Campus Flow empowers students with real-time academic updates, digital services, and seamless access to campus resources.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-blue-900">Centralized Academic Management</h3>
                <p className="text-gray-600 mt-2">Attendance, notices, courses, and performance data managed from a single unified platform.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-blue-900">Smart & Secure System</h3>
                <p className="text-gray-600 mt-2">Role-based access ensures data security while maintaining transparency across departments.</p>
              </div>
            </div>
            <div className="flex justify-center">
              <img src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6" alt="Campus Flow User" className="rounded-xl shadow-xl w-[300px] md:w-[340px]" />
            </div>
            <div className="space-y-10">
              <div>
                <h3 className="text-xl font-semibold text-blue-900">Faculty-Friendly Interface</h3>
                <p className="text-gray-600 mt-2">Faculty can manage attendance, academic records, and communication effortlessly.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-blue-900">Automation-Driven Efficiency</h3>
                <p className="text-gray-600 mt-2">Reduces manual workload through automated workflows and smart dashboards.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-blue-900">Scalable & Future-Ready</h3>
                <p className="text-gray-600 mt-2">Designed to grow with institutional needs and future technological advancements.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <img
                src="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b"
                alt="Campus Life Event"
                onClick={() => navigate("/gallery", { state: { scrollTop: true } })}
                className="w-full h-[320px] object-cover rounded-2xl shadow-md cursor-pointer hover:scale-[1.02] transition"
              />
              <img
                src="https://images.pexels.com/photos/6146978/pexels-photo-6146978.jpeg"
                alt="Student Interaction"
                onClick={() => navigate("/gallery", { state: { scrollTop: true } })}
                className="w-full h-[320px] object-cover rounded-2xl shadow-md cursor-pointer hover:scale-[1.02] transition"
              />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-950 mb-7">Life at Campus Flow</h2>
            <p className="text-gray-700 leading-relaxed text-base md:text-lg">
              Life at Campus Flow is a blend of academic excellence, innovation, and vibrant student engagement.
              The platform supports a dynamic campus environment by enabling seamless communication, digital collaboration,
              and real-time access to academic and extracurricular activities. <br /><br />
              Through Campus Flow, students stay connected with events, workshops, discussions, and campus initiatives,
              while faculty and administrators ensure a well-organized and inclusive academic ecosystem.
              Campus Flow nurtures creativity, collaboration, and a strong sense of community, preparing students for
              success in a digitally connected world.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DashBoard;
