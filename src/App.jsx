import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css"; 
import Navbar from "./components/navbar/navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="content">
        <h1>Welcome to OneVoice Events</h1>
        <p>Browse and create events that create moments lasting a lifetime.</p>

        {/* Define Routes for Different Pages */}
        <Routes>
          <Route path="/" element={<h2>Home - Browse Public Events</h2>} />
          <Route path="/login" element={<h2>Login/Register</h2>} />
          <Route path="/events" element={<h2>Event Details</h2>} />
          <Route path="/create" element={<h2>Create Event</h2>} />
          <Route path="/dashboard" element={<h2>User Dashboard</h2>} />
          <Route path="/community" element={<h2>Community Threads</h2>} />
          <Route path="/admin" element={<h2>Admin Panel</h2>} />
          <Route path="*" element={<h2>404 - Page Not Found</h2>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
