import React from "react";
import { logos } from "../assets/logos";
import { TrendingUp, Users, Award, Briefcase } from "lucide-react";

const stats = [
  { icon: <Award />, value: "₹18 LPA", label: "Highest Package" },
  { icon: <TrendingUp />, value: "₹5.2 LPA", label: "Average Package" },
  { icon: <Users />, value: "92%", label: "Placement Rate" },
  { icon: <Briefcase />, value: "120+", label: "Recruiters" },
];

// NEW: Course-wise Placement Outcomes
const placementOutcomes = [
  {
    course: "BCA",
    company: "Wipro",
    batch: "2025",
    text:
      "After completing BCA, I was placed at Wipro. Aptitude training and mock interviews helped me clear the campus recruitment process.",
  },
  {
    course: "MCA",
    company: "Infosys",
    batch: "2025",
    text:
      "The MCA curriculum and technical training sessions helped me secure a placement at Infosys with confidence.",
  },
  {
    course: "MBA",
    company: "Deloitte",
    batch: "2024",
    text:
      "MBA placement guidance and soft-skill training played a key role in my selection at Deloitte.",
  },
  {
    course: "BBA",
    company: "Accenture",
    batch: "2024",
    text:
      "Through structured placement support, I successfully secured a role at Accenture after completing BBA.",
  },
];

const PlacementPage = () => {
  return (
    <div className="bg-white text-gray-800">

      {/* HERO */}
      <section className="bg-gradient-to-r text-blue-950 pt-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Placements & Careers</h1>
        <p className="max-w-2xl mx-auto text-lg opacity-90">
          Transforming students into industry-ready professionals.
        </p>
      </section>

      {/* STATS */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((item, i) => (
            <div
              key={i}
              className="bg-white border rounded-xl p-6 text-center shadow-sm"
            >
              <div className="text-indigo-600 mb-3 flex justify-center text-2xl">
                {item.icon}
              </div>
              <h3 className="text-3xl font-bold">{item.value}</h3>
              <p className="text-gray-500">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* RECRUITING PARTNERS */}
      <section className="py-20 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-12">
          Recruiting Partners
        </h2>

        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-10">
          {logos.map((logo, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm flex items-center justify-center"
            >
              <img
                src={logo}
                alt="Company Logo"
                className="max-h-10 object-contain"
                onError={(e) => {
                  e.target.src = "/logo-placeholder.png";
                }}
              />
            </div>
          ))}
        </div>
      </section>

     {/*  UPDATED PLACEMENT OUTCOMES */}
<section className="py-20">
  <div className="max-w-6xl mx-auto px-6">
    <h2 className="text-3xl font-bold text-center mb-12">
      Placement Outcomes
    </h2>

    <div className="grid md:grid-cols-2 gap-8">
      {placementOutcomes.map((item, index) => (
        <div
          key={index}
          className="bg-gray-100 p-8 rounded-xl"
        >
          <p className="italic text-gray-700 mb-6">
            “{item.text}”
          </p>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#9ca3af"
                className="w-6 h-6"
              >
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
              </svg>
            </div>

            <div>
              <h4 className="font-semibold">
                {item.course} Student
              </h4>
              <p className="text-sm text-gray-600">
                Placed at {item.company} • Batch {item.batch}
              </p>
            </div>
          </div>

        </div>
      ))}
    </div>

  </div>
</section>


    </div>
  );
};

export default PlacementPage;
