import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./createevents.scss";

const CreateEvent = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        event_date: "",
        location: "",
        image: null,
        host: "", // Added host field
    });
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const storedUser = JSON.parse(localStorage.getItem("user"));
    const isAuthorized = storedUser.user?.is_authorized;

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

        if (!formData.title || !formData.description || !formData.event_date || !formData.location || !formData.image || !formData.host) {
            setError("All fields are required!");
            return;
        }

        // Get the user ID from localStorage
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const userId = storedUser?.user?.id;

        if (!userId) {
            setError("User is not logged in.");
            return;
        }

        // Prepare the form data
        const formDataToSend = new FormData();
        formDataToSend.append("title", formData.title);
        formDataToSend.append("description", formData.description);
        formDataToSend.append("event_date", formData.event_date);
        formDataToSend.append("location", formData.location);
        formDataToSend.append("image", formData.image);
        formDataToSend.append("user_id", userId);
        formDataToSend.append("host", formData.host); 

        try {
            const apiUrl = isAuthorized
                ? "http://localhost:8080/api/publicevents"
                : "http://localhost:8080/api/privateevents";

            await axios.post(apiUrl, formDataToSend, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            navigate("/myevents");
        } catch (err) {
            setError(err.response?.data?.error || "An error occurred.");
        }
    };

    return (
        <div className="create-event__container">
            {error && <p className="error">{error}</p>}

            <form onSubmit={handleSubmit}>
                <h2>Create an Event</h2>

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

                <button type="submit" className="submit__btn">
                    Create Event
                </button>
            </form>
        </div>
    );
};

export default CreateEvent;
