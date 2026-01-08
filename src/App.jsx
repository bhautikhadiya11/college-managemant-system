import { Routes, Route, useLocation } from "react-router-dom"; // 1. Added useLocation
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Gallery from "./pages/Gallery";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SignIn from "./pages/SignIn";
import StudentCorner from "./pages/StudentCorner";

function App() {
  const location = useLocation(); // 2. Initialize location

  // 3. Define the paths where you DON'T want the Navbar/Footer
  const hideLayout = location.pathname === "/signin";

  return (
    <div className="flex flex-col min-h-screen">
      {/* 4. Only show Navbar if hideLayout is false */}
      {!hideLayout && <Navbar />}

      <main className={`grow ${hideLayout ? 'pt-0' : 'pt-20'}`}>
        <Routes>
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/student-corner" element={<StudentCorner />} />
        </Routes>
      </main>

      {/* 5. Only show Footer if hideLayout is false */}
      {!hideLayout && <Footer />}
    </div>
  );
}

export default App;