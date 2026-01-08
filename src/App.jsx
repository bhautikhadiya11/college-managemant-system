import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";

import Gallery from "./pages/Gallery";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SignIn from "./pages/SignIn";
import StudentCorner from "./pages/StudentCorner";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar at top */}
      <Navbar />

      {/* Main content grows and pushes footer down */}
      <main className="grow pt-20">
        <Routes>
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/student-corner" element={<StudentCorner />} />
        </Routes>
      </main>

      {/* Footer sticks to bottom */}
      <Footer />
    </div>
  );
}

export default App;
