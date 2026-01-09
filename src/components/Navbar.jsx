import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 left-0 w-full bg-gray-100 shadow-md z-50">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">

        {/* LEFT: Logo + Title */}
        <Link to="/" className="flex items-center gap-2 hover:opacity-90">
          <img
            src="/img/bgremove.png"
            alt="Campus Flow Logo"
            className="h-12 sm:h-14 md:h-16 w-auto object-contain"
          />

          <div className="flex gap-1 sm:gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-blue-950">
              CAMPUS
            </h1>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#33977d]">
              FLOW
            </h1>
          </div>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex gap-6 lg:gap-8 text-blue-950 font-medium text-lg lg:text-xl">
            {["gallery", "about", "contact", "student-corner"].map((path) => (
              <li key={path} className="relative group">
                <Link to={`/${path}`} className="relative inline-block capitalize">
                  {path.replace("-", " ")}
                  <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-blue-950 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
            ))}
          </ul>

          {/* SIGN IN BUTTON */}
          <Link
            to="/signin"
            className="relative overflow-hidden border-2 border-blue-950 text-blue-950
            px-5 py-2 rounded-lg font-medium
            transition-colors duration-300 group hover:text-white"
          >
            <span className="relative z-10">Sign In</span>
            <span
              className="absolute left-0 top-0 h-full w-0 bg-blue-950
              transition-all duration-300 group-hover:w-full"
            ></span>
          </Link>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-3xl text-blue-950"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300
        ${open ? "max-h-96" : "max-h-0"}`}
      >
        <div className="bg-gray-100 px-6 py-4">
          <ul className="flex flex-col gap-4 text-blue-950 font-medium text-lg">
            <li>
              <Link to="/gallery" onClick={() => setOpen(false)}>
                Gallery
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={() => setOpen(false)}>
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" onClick={() => setOpen(false)}>
                Contact
              </Link>
            </li>
            <li>
              <Link to="/student-corner" onClick={() => setOpen(false)}>
                Student Corner
              </Link>
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
