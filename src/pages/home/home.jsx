import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import EventCard from "../../components/eventcard/eventcard";
import Carousel from "../../components/carousel/carousel"; 
import "./home.scss";
import mainLogo from "../../../public/logos/mainlogo.png";
import mainBrand from "../../../public/logos/mainbrand - black.png";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const videoRef = useRef(null); 

  const handleVideoClick = () => {
    setShowPopup(true);
    if (videoRef.current) {
      videoRef.current.pause(); 
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    if (videoRef.current) {
      videoRef.current.play(); 
    }
  };

  useEffect(() => {
    // Fetch events from the backend
    axios.get("http://localhost:8080/api/publicevents")
      .then((response) => setEvents(response.data))
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  return (
    <div className="home">

      {/* Hero Section */}
      <section className="hero__section">
          <div className="hero__content">
            <h1 className="hero__title">Buzzing with Excitement? So Are We!</h1>
            <p className="hero__subtitle">Keep in the loop with the hottest happenings around you.</p>
            <Link to="/login" className="cta__button">Start Buzzing!</Link>
          </div>
      </section>

      {/* Intro Section */}
      <div className="intro__section">
        <div className="left__section">
          <div className="logo">
            <h2>Welcome to</h2>
            <div className="logo__wrapper">
              <img src={mainLogo} alt="Main Logo" className="navbar__image" />
              <img src={mainBrand} alt="Brand Logo" className="navbar__brand" />
            </div>
          </div>
          <p>Your go-to platform for discovering and joining events in real-time.</p>
          <p>Stay up to date with the latest public and private events happening around you. Whether you're looking to attend a concert, a networking event, or a fun local meetup, BuzzEvents makes it easier than ever to get involved and connect with others.</p>
          <p>Join a community of like-minded individuals, engage with event organizers, and experience the excitement of events as they happen!</p>
        </div>

        <div className="right__section">
          <div className="video__container" onClick={handleVideoClick}>
            <video ref={videoRef} className="event__video" loop muted autoPlay>
              <source src="/event.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {showPopup && (
            <div className="popup">
              <div className="popup-content">
                <button className="close-btn" onClick={closePopup}>✖</button>
                <video className="popup-video" controls autoPlay>
                  <source src="/event.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Events Section */}
      <div className="events__container">
        {events.length > 0 ? (
          events.map((event) => <EventCard key={event.id} {...event} />)
        ) : (
          <p className="loading">Loading events...</p>
        )}
      </div>

      <Carousel />
    </div>
  );
};

export default Home;
