import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import "./carddetails.scss";

const CardDetails = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [userId, setUserId] = useState(null);
    const [rsvpStatus, setRsvpStatus] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser && storedUser.user) {
            setUserId(storedUser.user.id);
        }
        axios.get(`http://localhost:8080/api/events/${id}`)
            .then(response => setEvent(response.data))
            .catch(error => console.error("Error fetching event details:", error));
    }, [id]);

    useEffect(() => {
        if (!userId) return;
        axios.get(`http://localhost:8080/api/rsvp/${userId}`)
            .then(response => {
                const hasRsvped = response.data.some(rsvpEvent => rsvpEvent.id === id);
                setRsvpStatus(hasRsvped);
            })
            .catch(error => console.error("Error checking RSVP status:", error));
    }, [userId, id]);

    const handleRSVP = () => {
        if (userId) {
            axios.post("http://localhost:8080/api/rsvp", { userId, eventId: id })
                .then(() => {
                    alert("RSVP successful!");
                    setRsvpStatus(true);
                })
                .catch(error => alert("Error RSVP'ing to the event."));
        } else {
            setError("You must be logged in to RSVP.");
        }
    };

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this event?")) {
            axios.delete(`http://localhost:8080/api/events/${id}`)
                .then(() => {
                    alert("Event deleted successfully!");
                    navigate("/myevents");
                })
                .catch(error => alert("Error deleting event."));
        }
    };

    const handleEdit = () => {
        navigate(`/carddetails/edit/${id}`);
    };

    if (!event) {
        return <div>Loading...</div>;
    }

    const eventDate = moment(event.event_date, "YYYY-MM-DD hh:mm A").isValid()
        ? moment(event.event_date, "YYYY-MM-DD hh:mm A").format("MMMM Do [@] h:mm A")
        : "Invalid date";

    return (
        <div className="event-details">
            <div className="event-details__top">
                <img
                    src={event.image.startsWith("http") ? event.image : `http://localhost:8080/uploads/${event.image}`}
                    alt={event.title}
                    className="event-details__image"
                />
                <div className="event-details__info">
                    <h2 className="event-details__title">{event.title}</h2>
                    <p className="event-details__date">
                        <FontAwesomeIcon icon={faClock} className="icon" /> {eventDate}
                    </p>
                    <p className="event-details__location">
                        <FontAwesomeIcon icon={faMapMarkerAlt} className="icon" /> {event.location}
                    </p>
                    <p className="event-details__host">{event.host}</p>
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

                {userId === event.user_id && (
                    <>
                        <button className="edit-btn" onClick={handleEdit}>Edit Event</button>
                        <button className="delete-btn" onClick={handleDelete}>Delete Event</button>
                    </>
                )}
            </div>

            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default CardDetails;