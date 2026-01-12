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
import BCOM from "./components/Departments/commerce/B.com";
import MCOM from "./components/Departments/commerce/M.com";
import BCA from "./components/Departments/computerapplication/BCA";
import MCA from "./components/Departments/computerapplication/MCA";

// ✅ Departments


function App() {
  const location = useLocation();

  const hideLayout =
    location.pathname === "/signin" ||
    location.pathname === "/forgot-password" ||
    location.pathname === "/reset-password" ||
    location.pathname === "/verify-otp";


  return (
    <div className="flex flex-col min-h-screen">
      {!hideLayout && <Navbar />}

      <main className="grow bg-gray-50">
        <Routes>
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
          <Route path="/Departments/management/bba" element={<BBA />} />
          <Route path="/Departments/management/mba" element={<MBA />} />
          <Route path="/Departments/commerce/bcom" element={<BCOM />} />
          <Route path="/Departments/commerce/mcom" element={<MCOM />} />
          <Route path="/Departments/computer-application/bca" element={<BCA/>} />
          <Route path="/Departments/computer-application/mca" element={<MCA/>} />



        </Routes>
      </main>

      {!hideLayout && <Footer />}
    </div>
  );
}


export default App;
