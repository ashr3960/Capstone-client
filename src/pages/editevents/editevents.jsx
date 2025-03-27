import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./editevents.scss";

const EditEvent = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        event_date: "",
        location: "",
        image: null,
        host: "",
    });
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        // Fetch event details to prefill the form
        axios
            .get(`http://localhost:8080/api/events/${id}`)
            .then((response) => {
                const event = response.data;
                // Convert event date to local time
                const eventDate = new Date(event.event_date);
                const localDate = new Date(eventDate.getTime() - eventDate.getTimezoneOffset() * 60000);
                const formattedDate = localDate.toISOString().slice(0, 16); // YYYY-MM-DDTHH:MM
                setFormData({
                    title: event.title,
                    description: event.description,
                    event_date: formattedDate,
                    location: event.location,
                    host: event.host,
                    image: event.image,
                });
            })
            .catch((error) => {
                console.error("Error fetching event details:", error);
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            image: e.target.files[0],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title || !formData.description || !formData.event_date || !formData.location || !formData.host) {
            setError("All fields are required!");
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append("title", formData.title);
        formDataToSend.append("description", formData.description);
        formDataToSend.append("event_date", formData.event_date);
        formDataToSend.append("location", formData.location);
        if (formData.image) formDataToSend.append("image", formData.image);
        formDataToSend.append("host", formData.host);

        try {
            await axios.put(`http://localhost:8080/api/events/${id}`, formDataToSend, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            navigate("/myevents"); // Redirect to the event details page after successful update
        } catch (err) {
            setError(err.response?.data?.error || "An error occurred.");
        }
    };

    // Handle cancel button click
    const handleCancel = () => {
        navigate("/myevents"); 
    };

    return (
        <div className="create-event__container">
            {error && <p className="error">{error}</p>}

            <form onSubmit={handleSubmit}>
                <h2>Edit Event</h2>

                <div className="input__group">
                    <label>Event Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                    />
                </div>

                <div className="input__group">
                    <label>Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    ></textarea>
                </div>

                <div className="input__group">
                    <label>Event Date</label>
                    <input
                        type="datetime-local"
                        name="event_date"
                        value={formData.event_date}
                        onChange={handleChange}
                    />
                </div>

                <div className="input__group">
                    <label>Location</label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                    />
                </div>

                <div className="input__group">
                    <label>Event Image</label>
                    <input
                        type="file"
                        name="image"
                        onChange={handleFileChange}
                    />
                </div>

                <div className="input__group">
                    <label>Host of Event</label>
                    <input
                        type="text"
                        name="host"
                        value={formData.host}
                        onChange={handleChange}
                    />
                </div>

                <div className="buttons">
                    <button type="submit" className="submit__btn">
                        Save Changes
                    </button>
                    <button type="button" className="cancel__btn" onClick={handleCancel}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditEvent;
