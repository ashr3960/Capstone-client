import React, { useState, useEffect } from "react";
import axios from "axios";
import EventCard from "../../components/eventcard/eventcard";
import Carousel from "../../components/carousel/carousel"; 
import "./home.scss";

const Home = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch events from the backend
    axios.get("http://localhost:8080/api/publicevents")
      .then((response) => setEvents(response.data))
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  return (
    <div className="home">
      {/* Hero Section */}
      <Carousel />

      {/* Events Section */}
      <div className="events-container">
        {events.length > 0 ? (
          events.map((event) => <EventCard key={event.id} {...event} />)
        ) : (
          <p className="loading">Loading events...</p>
        )}
      </div>
    </div>
  );
};

export default Home;
