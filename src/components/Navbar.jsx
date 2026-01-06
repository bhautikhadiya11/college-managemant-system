import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="top-0 left-0 w-full -mt-3 bg-gray-100 shadow-md z-50">
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
            <li><Link to="/gallery" className="hover:underline">Gallery</Link></li>
            <li><Link to="/about" className="hover:underline">About</Link></li>
            <li><Link to="/contact" className="hover:underline">Contact</Link></li>
            <li><Link to="/student-corner" className="hover:underline">Student Corner</Link></li>
          </ul>

          <Link
            to="/signin"
            className="bg-blue-950 text-white px-4 py-2 rounded-lg"
          >
            Sign In
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
