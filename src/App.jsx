import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Gallery from "./pages/Gallery";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import StudentCorner from "./pages/StudentCorner";
import ContactPage from "./pages/ContactPage";
import DashBoard from "./pages/DashBoard";

function App() {
  const location = useLocation();

  //  Navbar/Footer hide only on signin
  const hideLayout = location.pathname === "/signin";

  //  Padding remove on dashboard & signin
  const noPadding =
    location.pathname === "/" || location.pathname === "/signin" || location.pathname === "/ContactPage.jsx";

  return (
    <div className="flex flex-col min-h-screen">
      {!hideLayout && <Navbar />}

      <main className={`grow ${hideLayout ? 'pt-0': 'bg-gray-50'}`}>
      <main className={`grow ${noPadding ? "pt-0" : "pt-20"}`}>
        <Routes>
          <Route path="/" element={<DashBoard />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/student-corner" element={<StudentCorner />} />
        </Routes>
      </main>
      </main>

      {!hideLayout && <Footer />}
    </div>
  );
}

export default App;
