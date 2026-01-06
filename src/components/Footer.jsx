import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-blue-950 text-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

        {/* BRAND */}
        <div className="text-center md:text-left">
          {/* Logo + Text same line */}
          <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
            <img
              src="/img/whitelogo2-removebg-preview.png"
              alt="Campus Flow"
              className="h-16 w-16 object-contain"
            />
            <h3 className="text-white font-semibold text-lg">
              CAMPUS FLOW
            </h3>
          </div>

          <p className="text-sm text-gray-200 max-w-xs mx-auto md:mx-0">
            Campus Flow is a modern college management system designed
            to simplify student and admin activities.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div className="text-center md:text-left">
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/about" className="hover:underline">About</Link></li>
            <li><Link to="/gallery" className="hover:underline">Gallery</Link></li>
            <li><Link to="/contact" className="hover:underline">Contact</Link></li>
          </ul>
        </div>

        {/* STUDENT */}
        <div className="text-center md:text-left">
          <h3 className="text-white font-semibold mb-4">Student</h3>
          <ul className="space-y-2 text-sm">
            <li>Student Login</li>
            <li>Attendance</li>
            <li>Fees</li>
            <li>Profile</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div className="text-center md:text-left">
          <h3 className="text-white font-semibold mb-4">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li>Email: campusflow@gmail.com</li>
            <li>Phone: +91 98765 43210</li>
            <li>Location: India</li>
          </ul>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-white/20 py-4 text-center text-sm text-gray-200">
        © {new Date().getFullYear()} Campus Flow
      </div>
    </footer>
  );
};

export default Footer;
