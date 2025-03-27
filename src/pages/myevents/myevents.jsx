import React, { useState, useEffect } from "react";
import axios from "axios";
import EventCard from "../../components/eventcard/eventcard";
import "./myevents.scss";

const MyEvents = () => {
    const [events, setEvents] = useState([]);
    const [rsvpEvents, setRsvpEvents] = useState([]); 
    const [userName, setUserName] = useState("");
    const [userId, setUserId] = useState(null);
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
    
        if (storedUser?.user) {
            setUserName(storedUser.user.username);
            setUserId(storedUser.user.id);
            setIsAuthorized(storedUser.user.isAuthorized || false);
        }
    
        if (!storedUser?.user?.id) {
            console.error("User ID not found");
            return;
        }
    
        const fetchEvents = async () => {
            try {
                // Fetch user's events
                const endpoint = storedUser.user.is_authorized
                    ? `http://localhost:8080/api/publicevents/user/${storedUser.user.id}`
                    : `http://localhost:8080/api/privateevents/user/${storedUser.user.id}`;
    
                const response = await axios.get(endpoint);
                setEvents(response.data);
    
                // Fetch RSVP'ed events
                const rsvpEndpoint = `http://localhost:8080/api/rsvp/${storedUser.user.id}`;
                const rsvpResponse = await axios.get(rsvpEndpoint);
                setRsvpEvents(rsvpResponse.data);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };
    
        fetchEvents();
    }, [isAuthorized]);
    

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
