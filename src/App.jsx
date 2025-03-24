import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer"
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import MyEvents from "./pages/myevents/myevents";
import CreateEvent from "./pages/createevents/createevents"
import CardDetails from "./pages/carddetails/carddetails"
import Events from "./pages/events/events"
import "./App.scss"; 

function App() {
  return (
    <Router>
      <Navbar />
      <div className="routes">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/myevents" element={<MyEvents/>} />
          <Route path="/createvent" element={<CreateEvent/>} />
          <Route path="/carddetails/:id" element={<CardDetails/>} />
          <Route path="/events" element={<Events/>} />
          {/* <Route path="/about" element={<h2>About</h2>} />
          <Route path="/community" element={<h2>Community Threads</h2>} /> */}
          <Route path="*" element={<h2>404 - Page Not Found</h2>} />
        </Routes>
      </div>

      <Footer />
    </Router>
  );
}

export default App;
