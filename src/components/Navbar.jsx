import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [studentOpen, setStudentOpen] = useState(false);
  const [deptOpen, setDeptOpen] = useState(false);

  return (
    <nav className="sticky top-0 left-0 w-full bg-gray-100 shadow-md z-50">
      <div className="w-full mx-auto px-4 sm:px-6 md:px-8 flex items-center justify-between h-20 sm:h-24">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2 hover:opacity-90">
          <img
            src="/img/bgremove.png"
            alt="Campus Flow Logo"
            className="h-12 sm:h-25 w-auto object-contain"
          />
          <div className="flex gap-1 sm:gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-blue-950">CAMPUS</h1>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#33977d]">FLOW</h1>
          </div>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden lg:flex items-center gap-8">
          <ul className="flex gap-6 lg:gap-8 text-blue-950 font-medium text-lg lg:text-xl">

            {/* Normal Links */}
            {["gallery", "about", "contact"].map((path) => (
              <li key={path} className="relative group whitespace-nowrap">
                <Link to={`/${path}`} className="relative inline-block capitalize">
                  {path}
                  <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-blue-950 transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            ))}

            {/* DEPARTMENTS – SAME STYLE AS STUDENT CORNER */}
            <li className="relative group whitespace-nowrap">
              <span className="relative inline-block cursor-pointer">
                Departments
                <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-blue-950 transition-all duration-300 group-hover:w-full" />
              </span>

              <div className="absolute left-0 top-full mt-3 w-64 bg-white shadow-lg rounded-lg opacity-0 invisible translate-y-3 transition-all duration-300 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0">
                <ul className="py-2 text-base text-blue-900">

                  {/* Management */}
                  <li className="px-4 py-1 font-bold text-gray-700">Management</li>
                  <li><Link to="/departments/management/bba" className="block px-6 py-2 hover:bg-gray-100">BBA</Link></li>
                  <li><Link to="/departments/management/mba" className="block px-6 py-2 hover:bg-gray-100">MBA</Link></li>

                  {/* Commerce */}
                  <li className="px-4 py-1 mt-2 font-bold text-gray-700">Commerce</li>
                  <li><Link to="/departments/commerce/bcom" className="block px-6 py-2 hover:bg-gray-100">BCom</Link></li>
                  <li><Link to="/departments/commerce/mcom" className="block px-6 py-2 hover:bg-gray-100">MCom</Link></li>

                  {/* Computer Application */}
                  <li className="px-4 py-1 mt-2 font-bold text-gray-700">Computer Application</li>
                  <li><Link to="/departments/computer-application/bca" className="block px-6 py-2 hover:bg-gray-100">BCA</Link></li>
                  <li><Link to="/departments/computer-application/mca" className="block px-6 py-2 hover:bg-gray-100">MCA</Link></li>
                </ul>
              </div>
            </li>

            {/* STUDENT CORNER */}
            <li className="relative group whitespace-nowrap">
              <span className="relative inline-block cursor-pointer">
                Student Corner
                <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-blue-950 transition-all duration-300 group-hover:w-full" />
              </span>

              <div className="absolute left-0 top-full mt-3 w-48 bg-white shadow-lg rounded-lg opacity-0 invisible translate-y-3 transition-all duration-300 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0">
                <ul className="py-2 text-base text-blue-950">
                  <li><Link to="/student-corner/sports" className="block px-4 py-2 hover:bg-gray-100">Sports</Link></li>
                  <li><Link to="/student-corner/placement" className="block px-4 py-2 hover:bg-gray-100">Placement</Link></li>
                  
                </ul>
              </div>
            </li>
          </ul>

          {/* SIGN IN */}
          <Link
            to="/signin"
            className="relative overflow-hidden border-2 border-blue-950 text-blue-950 px-5 py-2 rounded-lg font-medium transition-colors duration-300 group hover:text-white whitespace-nowrap"
          >
            <span className="relative z-10">Sign In</span>
            <span className="absolute left-0 top-0 h-full w-0 bg-blue-950 transition-all duration-300 group-hover:w-full" />
          </Link>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="lg:hidden text-3xl text-blue-950"
          onClick={() => {
            setOpen(!open);
            setStudentOpen(false);
            setDeptOpen(false);
          }}
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ${open ? "max-h-[700px]" : "max-h-0"}`}>
        <div className="bg-gray-100 px-6 py-4">
          <ul className="flex flex-col gap-4 text-blue-950 font-medium text-lg">

            <Link to="/gallery" onClick={() => setOpen(false)}>Gallery</Link>
            <Link to="/about" onClick={() => setOpen(false)}>About</Link>
            <Link to="/contact" onClick={() => setOpen(false)}>Contact</Link>

            {/* DEPARTMENTS MOBILE */}
            <li>
              <button
                className="w-full flex justify-between items-center"
                onClick={() => setDeptOpen(!deptOpen)}
              >
                <span>Departments</span>
                <span className={`transition-transform ${deptOpen ? "rotate-180" : ""}`}>⌄</span>
              </button>

              <div className={`overflow-hidden transition-all duration-300 ${deptOpen ? "max-h-[500px] mt-2" : "max-h-0"}`}>
                <ul className="pl-4 flex flex-col gap-2 text-base">

                  <span className="font-semibold">Management</span>
                  <Link to="/departments/management/bba" onClick={() => setOpen(false)}>BBA</Link>
                  <Link to="/departments/management/mba" onClick={() => setOpen(false)}>MBA</Link>

                  <span className="font-semibold mt-2">Commerce</span>
                  <Link to="/departments/commerce/bcom" onClick={() => setOpen(false)}>BCom</Link>
                  <Link to="/departments/commerce/mcom" onClick={() => setOpen(false)}>MCom</Link>

                  <span className="font-semibold mt-2">Computer Application</span>
                  <Link to="/departments/computer-application/bca" onClick={() => setOpen(false)}>BCA</Link>
                  <Link to="/departments/computer-application/mca" onClick={() => setOpen(false)}>MCA</Link>

                </ul>
              </div>
            </li>

            {/* STUDENT CORNER MOBILE */}
            <li>
              <button
                className="w-full flex justify-between items-center"
                onClick={() => setStudentOpen(!studentOpen)}
              >
                <span>Student Corner</span>
                <span className={`transition-transform ${studentOpen ? "rotate-180" : ""}`}>⌄</span>
              </button>

              <div className={`overflow-hidden transition-all duration-300 ${studentOpen ? "max-h-60 mt-2" : "max-h-0"}`}>
                <ul className="pl-4 flex flex-col gap-2 text-base">
                  <li><Link to="/student-corner/sports" onClick={() => setOpen(false)}>Sports</Link></li>
                  <li><Link to="/student-corner/placement" onClick={() => setOpen(false)}>Placement</Link></li>
                  <li><Link to="/student-corner/courses" onClick={() => setOpen(false)}>Courses</Link></li>
                  <li><Link to="/student-corner/faculty" onClick={() => setOpen(false)}>Faculty</Link></li>
                </ul>
              </div>
            </li>

            <Link
              to="/signin"
              onClick={() => setOpen(false)}
              className="mt-2 bg-blue-950 text-white px-5 py-2 rounded-lg w-fit"
            >
              Sign In
            </Link>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
