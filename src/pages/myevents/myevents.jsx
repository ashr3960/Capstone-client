import React, { useState, useEffect } from "react";
import axios from "axios";
import EventCard from "../../components/eventcard/eventcard";
import "./myevents.scss";

const MyEvents = () => {
    const [events, setEvents] = useState([]);
    const [rsvpEvents, setRsvpEvents] = useState([]); // Add state for RSVP'ed events
    const [userName, setUserName] = useState("");
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
      
        if (storedUser && storedUser.user) {
            setUserName(storedUser.user.username);
            setUserId(storedUser.user.id);
        }
      
        if (!storedUser?.user?.id) {
            console.error("User ID not found");
            return;
        }
      
        const fetchEvents = async () => {
            try {
                const [userEventsResponse, rsvpEventsResponse] = await Promise.all([
                    axios.get(`http://localhost:8080/api/users/events/${storedUser.user.id}`),
                    axios.get(`http://localhost:8080/api/rsvp/${storedUser.user.id}`)
                ]);
        
                const userEvents = userEventsResponse.data.publicEvents || userEventsResponse.data.privateEvents || [];
                const rsvpedEvents = rsvpEventsResponse.data || []; // Ensure it's not undefined
        
                setEvents(userEvents);
                setRsvpEvents(rsvpedEvents); // Fix the error by setting RSVP events properly
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };
      
        fetchEvents();
    }, []);      

    return (
        <div className="myevents">
          <h1>Welcome, {userName || "Guest"}!</h1>
      
          {/* User's Own Events */}
          <h2>Your Events</h2>
          <div className="events__container">
            {events.length > 0 ? (
              events.map((event) => (
                <EventCard 
                  key={event.id} 
                  id={event.id}
                  title={event.title}
                  location={event.location}
                  image={event.image}
                  host={event.host}
                  date={event.event_date} 
                />
              ))
            ) : (
              <p className="loading">No events found.</p>
            )}
          </div>
      
          {/* RSVP'ed Events */}
          <h2>Your RSVP'ed Events</h2>
          <div className="events__container">
            {rsvpEvents.length > 0 ? (
              rsvpEvents.map((event) => (
                <EventCard 
                  key={event.id} 
                  id={event.id}
                  title={event.title}
                  location={event.location}
                  image={event.image}
                  host={event.host}
                  date={event.event_date} 
                />
              ))
            ) : (
              <p className="loading">No RSVP'ed events found.</p>
            )}
          </div>
        </div>
    );
};

export default MyEvents;

