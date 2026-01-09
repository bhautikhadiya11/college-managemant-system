import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="top-0 left-0 w-full -mt-3 bg-gray-100 shadow-md z-50 ">
      <div className="w-full mx-auto pl-2 pr-6 flex items-center justify-between">

        {/* LEFT: Logo + Title */}
        <div className="flex whitespace-nowrap">
          <Link to="/" className="flex items-center hover:opacity-85">
            <img
              src="/img/bgremove.png"
              alt="Campus Flow Logo"
              className="h-30 pt-2.5 w-full object-contain"
            />

            <div className="flex gap-2">
              <h1 className="text-4xl font-bold text-blue-950">
                CAMPUS
              </h1>
              <h1 className="text-4xl font-bold text-[#33977d]">
                FLOW
              </h1>
            </div>
          </Link>
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex gap-8 text-blue-950 font-medium text-2xl">
            <li className="relative group">
            <Link
                  to="/gallery"
                  className="relative inline-block"
            >
                  Gallery
          <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-blue-950 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            </li>

            <li className="relative group">
            <Link
                  to="/about"
                  className="relative inline-block"
            >
                  About
          <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-blue-950 transition-all duration-300 group-hover:w-full"></span>
            </Link></li>
            <li className="relative group">
              <Link
                  to="/contact"
                  className="relative inline-block"
            >
                  Contact
          <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-blue-950 transition-all duration-300 group-hover:w-full"></span>
            </Link>
              
            </li>
            <li className="relative group"><Link to="/student-corner" className="relative inline-block">Student Corner
            <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-blue-950 transition-all duration-300 group-hover:w-full"></span>
            </Link></li>
          </ul>

       <Link
  to="/signin"
  className="relative overflow-hidden border-2 border-blue-950 text-blue-950 px-5 py-2 rounded-lg font-medium
  transition-colors duration-300 group hover:text-white"
>
  <span className="relative z-10">Sign In</span>

  <span className="absolute left-0 top-0 h-full w-0 bg-blue-950
  transition-all duration-300 group-hover:w-full"></span>
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
      {open && (
        <div className="md:hidden bg-gray-100 px-6 pb-4">
          <ul className="flex flex-col gap-4 text-blue-950 font-medium text-xl">
            <li><Link to="/gallery" onClick={() => setOpen(false)}>Gallery</Link></li>
            <li><Link to="/about" onClick={() => setOpen(false)}>About</Link></li>
            <li><Link to="/contact" onClick={() => setOpen(false)}>Contact</Link></li>
            <li><Link to="/student-corner" onClick={() => setOpen(false)}>Student Corner</Link></li>
            <Link
              to="/signin"
              onClick={() => setOpen(false)}
              className="bg-blue-950 text-white px-4 py-2 rounded-lg w-fit"
            >
              Sign In
            </Link>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
