import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer"
import Home from "./pages/home/home";
import "./App.scss"; 

function App() {
  return (
    <Router>
      <Navbar />
      <div className="routes">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<h2>Login/Register</h2>} />
          <Route path="/carddetails/:id" element={<h2>Card Details</h2>} />
          <Route path="/about" element={<h2>About</h2>} />
          <Route path="/create" element={<h2>Create Event</h2>} />
          <Route path="/community" element={<h2>Community Threads</h2>} />
          <Route path="/admin" element={<h2>Admin Panel</h2>} />
          <Route path="*" element={<h2>404 - Page Not Found</h2>} />
        </Routes>
      </div>

      <Footer />
    </Router>
  );
}

export default App;
