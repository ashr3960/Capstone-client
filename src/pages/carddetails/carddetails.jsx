import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import "./carddetails.scss";

const CardDetails = () => {
    const { id } = useParams(); 
    const [event, setEvent] = useState(null);
    const [userId, setUserId] = useState(null);
    const [rsvpStatus, setRsvpStatus] = useState(false);

    useEffect(() => {
        const storedUserId = localStorage.getItem("userId"); 
        if (storedUserId) {
            setUserId(storedUserId); // Set the userId from localStorage
        } else {
            console.error("User not logged in or userId not available.");
        }

        // Fetch the event details
        axios
            .get(`http://localhost:8080/api/publicevents/${id}`)
            .then((response) => {
                setEvent(response.data);
            })
            .catch((error) => {
                console.error("Error fetching event details:", error);
            });

        // Check if the user has already RSVP'd
        if (userId) {
            axios
                .get(`http://localhost:8080/api/rsvp/${userId}/${id}`)
                .then((response) => {
                    if (response.data.length > 0) {
                        setRsvpStatus(true);
                    }
                })
                .catch((error) => {
                    console.error("Error checking RSVP status:", error);
                });
        }
    }, [id, userId]);

    const handleRSVP = () => {
        if (userId) {
            // Send RSVP request
            axios
                .post("http://localhost:8080/api/rsvp", { userId, eventId: id })
                .then((response) => {
                    alert("RSVP successful!");
                    setRsvpStatus(true);
                })
                .catch((error) => {
                    console.error("Error RSVP'ing:", error);
                    alert("Error RSVP'ing to the event.");
                });
        } else {
            console.error("No user logged in. Unable to RSVP.");
        }
    };

    if (!event) {
        return <div>Loading...</div>;
    }

    return (
        <div className="event-details">
            <div className="event-details__top">
                <img
                    src={`http://localhost:8080/uploads/${event.image}`}
                    alt={event.title}
                    className="event-details__image"
                />
                <div className="event-details__info">
                    <h2 className="event-details__title">{event.title}</h2>
                    <p className="event-details__date">
                        {moment(event.date).format("MMMM Do [@] h:mm A")}
                    </p>
                    <p className="event-details__location">{event.location}</p>
                    <p className="event-details__host">Host: {event.host}</p>
                    <p className="event-details__description">{event.description}</p>
                </div>
            </div>

            <div className="event-details__bottom">
                {rsvpStatus ? (
                    <button className="rsvp-btn" disabled>
                        You've RSVP'd to this event
                    </button>
                ) : (
                    <button className="rsvp-btn" onClick={handleRSVP}>
                        RSVP to this Event
                    </button>
                )}
            </div>
        </div>
    );
};

export default CardDetails;
