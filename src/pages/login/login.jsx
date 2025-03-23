import React, { useState } from "react";
import axios from "axios"; 
import { useNavigate } from "react-router-dom"; // Use navigate to redirect after login/signup
import "./login.scss";

export default function AuthPage() {
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState({ name: "", email: "", password: "", fullName: "", username: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate(); // useNavigate hook for programmatic navigation

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password || (isSignUp && (!formData.fullName || !formData.username))) {
            setError("All fields are required!");
            return;
        }
        setError("");

        try {
            if (isSignUp) {
                const response = await axios.post("http://localhost:8080/api/users", {
                    ...formData,
                });
                // After successful signup, redirect to login page
                navigate("/login");
            } else {
                const response = await axios.post("http://localhost:8080/api/users/login", {
                    email: formData.email,
                    password: formData.password,
                });
                // On successful login, store user data in localStorage
                localStorage.setItem("user", JSON.stringify(response.data)); 
                // Redirect to home or dashboard page
                navigate("/");
                window.location.reload();
            }
        } catch (err) {
            setError(err.response?.data?.error || "An error occurred.");
        }
    };

    return (
        <div className="login__container">
            <div className="login__box">
                <h2>{isSignUp ? "Sign Up" : "Login"}</h2>
                {error && <p className="error">{error}</p>}

                <form onSubmit={handleSubmit}>
                    {isSignUp && (
                        <>
                            <div className="input__group">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="input__group">
                                <label>Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                />
                            </div>
                        </>
                    )}

                    <div className="input__group">
                        <label>Email</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} />
                    </div>

                    <div className="input__group">
                        <label>Password</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} />
                    </div>

                    <button type="submit" className="submit__btn">
                        {isSignUp ? "Sign Up" : "Login"}
                    </button>
                </form>

                <p className="toggle__text" onClick={() => setIsSignUp(!isSignUp)}>
                    {isSignUp ? "Already have an account? Login" : "Don't have an account? Sign Up"}
                </p>
            </div>
        </div>
    );
}
