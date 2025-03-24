import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiMenu, FiChevronDown } from "react-icons/fi"; 
import "./navbar.scss"; 

import mainLogo from "../../../public/logos/mainlogo.png";
import mainBrand from "../../../public/logos/mainbrand.png";
import profilepic from "../../../public/logos/profilelogo.png";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const dropdownRef = useRef(null);
    const mobileMenuRef = useRef(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser && storedUser.user) {
            setUser(storedUser.user);
        }

        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null);
        navigate("/login");
        setDropdownOpen(false);
        setMenuOpen(false);
    };

    const closeAllMenus = () => {
        setMenuOpen(false);
        setDropdownOpen(false);
    };

    return (
        <nav className="navbar">
            <div className="navbar__container">
                
                {/* LOGO */}
                <NavLink to="/" className="navbar__logo" onClick={closeAllMenus}>
                    <img src={mainLogo} alt="Main Logo" className="navbar__image" />
                    <img src={mainBrand} alt="Brand Logo" className="navbar__brand" />
                </NavLink>

                {/* DESKTOP NAV */}
                <div className="navbar__linkcontainer">
                    <ul className="navbar__links">
                        <li><NavLink to="/about" className="navbar__link" onClick={closeAllMenus}>About</NavLink></li>
                        <li><NavLink to="/community" className="navbar__link" onClick={closeAllMenus}>Community</NavLink></li>
                        <li><NavLink to="/create" className="navbar__link" onClick={closeAllMenus}>Browse Events</NavLink></li>
                    </ul>

                    {/* USER PROFILE / LOGIN */}
                    {user ? (
                        <div className="navbar__user" ref={dropdownRef}>
                            <span className={`navbar__username ${dropdownOpen ? "active" : ""}`} onClick={() => setDropdownOpen(!dropdownOpen)}>
                                {user.username || "Guest"} <FiChevronDown className="navbar__dropdown-icon" />
                            </span>

                            {/* Dropdown Modal */}
                            {dropdownOpen && (
                                <div className="navbar__dropdown">
                                    <NavLink to="/myevents" className="navbar__dropdown-item" onClick={closeAllMenus}>My Events</NavLink>
                                    <NavLink to="/createvent" className="navbar__dropdown-item" onClick={closeAllMenus}>Create Event</NavLink>
                                    <button onClick={handleLogout} className="navbar__dropdown-item">Logout</button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <NavLink to="/login" className="navbar__logincontainer" onClick={closeAllMenus}>
                            <img src={profilepic} alt="Profile" className="navbar__profile" />
                            <span className="navbar__login">Login</span>
                        </NavLink>
                    )}
                </div>

                {/* MOBILE MENU ICON */}
                <FiMenu 
                    className={`navbar__menu-icon ${menuOpen ? "active" : ""}`}
                    onClick={() => setMenuOpen(!menuOpen)} 
                />

                {/* MOBILE MENU */}
                {menuOpen && (
                    <div className="navbar__mobile-menu" ref={mobileMenuRef}>
                        <NavLink to="/about" onClick={closeAllMenus}>About</NavLink>
                        <NavLink to="/community" onClick={closeAllMenus}>Community</NavLink>
                        <NavLink to="/create" onClick={closeAllMenus}>Browse Events</NavLink>
                        
                        {user && (
                            <>
                                <NavLink to="/myevents" onClick={closeAllMenus}>My Events</NavLink>
                                <NavLink to="/createvent" onClick={closeAllMenus}>Create Event</NavLink>
                                <button onClick={handleLogout} className="navbar__mobile-logout">Logout</button>
                            </>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
