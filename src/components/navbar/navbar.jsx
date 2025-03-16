import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiMenu } from "react-icons/fi"; 
import "./Navbar.scss"; 

import mainLogo from "../../../public/logos/mainlogo.png";
import mainBrand from "../../../public/logos/mainbrand.png";
import profilepic from "../../../public/logos/profilelogo.png";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false); 

    return (
        <nav className="navbar">
            <div className="navbar__container">
                
                {/* LOGO */}
                <NavLink to="/" className="navbar__logo">
                    <img src={mainLogo} alt="Main Logo" className="navbar__image" />
                    <img src={mainBrand} alt="Brand Logo" className="navbar__brand" />
                </NavLink>

                {/* NAV LINKS */}
                <ul className="navbar__links">
                    <li><NavLink to="/about" className="navbar__link">About</NavLink></li>
                    <li><NavLink to="/community" className="navbar__link">Community</NavLink></li>
                    <li><NavLink to="/create" className="navbar__link">Create Event</NavLink></li>
                    <li>
                        {/* LOGIN CONTAINER */}
                        <NavLink to="/login" className="navbar__logincontainer">
                            <img src={profilepic} alt="Profile" className="navbar__profile" />
                            <span className="navbar__login">Login</span>
                        </NavLink>
                    </li>
                </ul>

                {/* MENU ICON */}
                <FiMenu 
                    className={`navbar__menu-icon ${menuOpen ? "active" : ""}`}
                    onClick={() => setMenuOpen(!menuOpen)} 
                />


                {/* MOBILE MENU */}
                {menuOpen && (
                    <div className="navbar__mobile-menu">
                        <NavLink to="/about" onClick={() => setMenuOpen(false)}>About</NavLink>
                        <NavLink to="/community" onClick={() => setMenuOpen(false)}>Community</NavLink>
                        <NavLink to="/create" onClick={() => setMenuOpen(false)}>Create Event</NavLink>
                        <NavLink to="/login" onClick={() => setMenuOpen(false)}>Login</NavLink>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
