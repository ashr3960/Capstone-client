import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css"; 
import Navbar from "./components/navbar/navbar";
import EventCard from "./components/eventcard/eventcard";

const sampleEvent = {
  title: "Tech Conference 2025",
  date: "April 15, 2025",
  location: "New York, USA",
  image: "../../../public/images/download.jpeg",
  host: "Chatham Kent Allaincs"
};

function App() {
  return (
    <Router>
      <Navbar/>
      <div className="routes">
        <Routes>
          <Route path="/" element={ 
            <>
              <h2>Home - Browse Public Events</h2>
              <EventCard {...sampleEvent} />
            </>
          } />

          <Route path="/login" element={<h2>Login/Register</h2>} />
          <Route path="/carddetails" element={<h2>CardDetails</h2>}/>
          <Route path="/about" element={<h2>About</h2>} />
          <Route path="/create" element={<h2>Create Event</h2>} />
          <Route path="/community" element={<h2>Community Threads</h2>} />
          <Route path="/admin" element={<h2>Admin Panel</h2>} />
          <Route path="*" element={<h2>404 - Page Not Found</h2>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
