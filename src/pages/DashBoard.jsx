import React, { useEffect, useState } from "react";

/* 🎓 College Campus Slider Images */
const sliderImages = [
  // Main Campus
  "https://images.unsplash.com/photo-1592930954854-7d00c87d0cf4",
  "https://images.unsplash.com/photo-1611074182055-4ac85bad8bb6",
  "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
  "https://images.unsplash.com/photo-1562774053-701939374585",
  
];

const DashBoard = () => {
  const [index, setIndex] = useState(0);

  const [students, setStudents] = useState(0);
  const [courses, setCourses] = useState(0);
  const [faculty, setFaculty] = useState(0);
  const [departments, setDepartments] = useState(0);

  /* 🔁 Image auto change every 5 sec */
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % sliderImages.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  /* 🔢 Count animation */
  useEffect(() => {
    const counter = setInterval(() => {
      setStudents((p) => (p < 3200 ? p + 40 : p));
      setCourses((p) => (p < 48 ? p + 1 : p));
      setFaculty((p) => (p < 210 ? p + 2 : p));
      setDepartments((p) => (p < 18 ? p + 1 : p));
    }, 40);

    return () => clearInterval(counter);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <main className="grow pt-0">

        {/* 🖼 COLLEGE IMAGE SLIDER */}
        <div className="w-full h-[625px] overflow-hidden relative">
          <img
            src={sliderImages[index]}
            alt="College Campus"
            className="w-full h-full object-cover transition-all duration-1000"
          />
        </div>

        {/* 📊 COLLEGE INFO SECTION */}
        <section className="px-10 py-14">
          <h1 className="text-3xl font-bold text-center mb-10">
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

      </main>
    </div>
  );
};

export default DashBoard;
