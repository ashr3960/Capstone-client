import React, { useState, useEffect } from "react";
import axios from "axios";
import EventCard from "../../components/eventcard/eventcard";
import "./events.scss";

const Events = () => {
    const [events, setEvents] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); 

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/publicevents");
                setEvents(response.data); 
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        fetchEvents();
    }, []);

    // Filter events based on search term (search by title or location)
    const filteredEvents = events.filter((event) =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="events">
            <h1>Upcoming Events</h1>

            {/* Search Bar */}
            <div className="events__search">
                <input
                    type="text"
                    placeholder="Search events by title or location"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="events__search-input"
                />
            </div>

            <div className="events__container">
                {filteredEvents.length > 0 ? (
                    filteredEvents.map((event) => (
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
        </div>
    );
};

export default Events;
