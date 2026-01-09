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
    location.pathname === "/ContactPage.jsx" ||
    location.pathname === "/ForgotPassword.jsx" ||
    location.pathname === "/ResetPassword.jsx" ||
    location.pathname === "/VerifyOTP.jsx";
    

  return (
    <div className="flex flex-col min-h-screen">
      {!hideLayout && <Navbar />}

      <main className={`grow ${noPadding ? "pt-0" : "pt-20"} bg-gray-50`}>
        <Routes>
          <Route path="/" element={<DashBoard />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/student-corner" element={<StudentCorner />} />

          {/* 🔐 Forgot Password Flow */}
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
        </Routes>
      </main>

      {!hideLayout && <Footer />}
    </div>
  );
}

export default App;
