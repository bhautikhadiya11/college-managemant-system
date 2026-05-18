import ScrollToTop from "./components/ScrollToTop.js";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Gallery from "./pages/Gallery";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
// import StudentCorner from "./pages/StudentCorner";
import ContactPage from "./pages/ContactPage";
import DashBoard from "./pages/DashBoard";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import VerifyOTP from "./pages/VerifyOTP";
import ChangePassword from "./components/ChangePassword";

import BBA from "./components/Departments/management/BBA.jsx";
import MBA from "./components/Departments/management/MBA.jsx";
import BCOM from "./components/Departments/commerce/B.com";
import MCOM from "./components/Departments/commerce/M.com";
import BCA from "./components/Departments/computerapplication/BCA";
import MCA from "./components/Departments/computerapplication/MCA";
import Placement from "./pages/Placement";
import Sports from "./pages/Sports";

import StudentLayout from "./pages/student/StudentLayout.jsx";
import StudentHome from "./pages/student/StudentHome.jsx";
import StudentAttendance from "./pages/student/StudentAttendance.jsx";
import StudentSyllabus from "./pages/student/StudentSyllabus.jsx";
import Notifications from "./pages/student/Notifications.jsx";
import StudentGallery from "./pages/student/StudentGallery.jsx";
import StudentAssignment from "./pages/student/StudentAssignment.jsx";  
import Fees from "./pages/student/Fees.jsx";

import ProfessorLayout from "./pages/professor/ProfessorLayout.jsx";
import ProfessorHome from "./pages/professor/ProfessorHome.jsx";
import Attendance from "./pages/professor/Attendance.jsx";
import Syllabus from "./pages/professor/Syllabus.jsx";
import Assignment from "./pages/professor/Assignment.jsx";

  
function App() {
  const location = useLocation();

const hideLayout =
  location.pathname === "/signin" ||
  location.pathname === "/forgot-password" ||
  location.pathname === "/reset-password" ||
  location.pathname === "/verify-otp" ||
  location.pathname.startsWith("/student")||
  location.pathname.startsWith("/professor") ;


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
          {/* <Route path="/student-corner" element={<StudentCorner />} /> */}


          <Route path="/Student-corner/sports" element={<Sports />} />
          <Route path="/Student-corner/placement" element={<Placement />} />
          
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

         {/* ================= STUDENT DASHBOARD ================= */}

        <Route path="/student" element={<StudentLayout />}>
          <Route index element={<StudentHome />} />
          <Route path="attendance" element={<StudentAttendance />} />
          <Route path="change-password" element={<ChangePassword />} />
          <Route path="syllabus" element={<StudentSyllabus />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="gallery" element={<StudentGallery />} />
          <Route path="assignments" element={<StudentAssignment />} />
          <Route path="fees" element={<Fees />} />
        </Route>

        {/* ================= PROFESSOR DASHBOARD ================= */}

        <Route path="/professor" element={<ProfessorLayout />}>
          <Route index element={<ProfessorHome />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="syllabus" element={<Syllabus />} />
          <Route path="assignments" element={<Assignment />} />
          <Route path="change-password" element={<ChangePassword />} />
        </Route>
        
        </Routes>

        <ScrollToTop />
      </main>

      {!hideLayout && <Footer />}
    </div>
  );
}


export default App;
