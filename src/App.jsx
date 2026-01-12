import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Gallery from "./pages/Gallery";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import StudentCorner from "./pages/StudentCorner";
import ContactPage from "./pages/ContactPage";
import DashBoard from "./pages/DashBoard";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import VerifyOTP from "./pages/VerifyOTP";
import BBA from "./components/Departments/management/bba";
import MBA from "./components/Departments/management/mba";
import Placement from "./pages/Placement";
import Sports from "./pages/Sports";


// ✅ Departments


function App() {
  const location = useLocation();

  const hideLayout =
    location.pathname === "/signin" ||
    location.pathname === "/forgot-password" ||
    location.pathname === "/reset-password" ||
    location.pathname === "/verify-otp";

  const noPadding =
    location.pathname === "/" ||
    location.pathname === "/signin" ||
    location.pathname === "/about" ||
    location.pathname === "/forgot-password" ||
    location.pathname === "/reset-password" ||
    location.pathname === "/student-corner/placement" ||
    location.pathname === "/student-corner/sports" ||
    location.pathname === "/verify-otp";

  return (
    <div className="flex flex-col min-h-screen">
      {!hideLayout && <Navbar />}

      <main className={`grow ${noPadding ? "pt-0" : "pt-20"} bg-gray-50`}>
        <Routes>
          {/* Main Pages */}
          <Route path="/" element={<DashBoard />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/student-corner" element={<StudentCorner />} />

          <Route path="/student-corner/sports" element={<Sports />} />
          <Route path="/student-corner/placement" element={<Placement />} />  

          {/* Auth Flow */}
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />

          {/* Departments */}
          <Route path="/Departments/management/bba" element={<BBA/>} />
          <Route path="/Departments/management/mba" element={<MBA/>} />


        </Routes>
      </main>

      {!hideLayout && <Footer />}
    </div>
  );
}

export default App;
