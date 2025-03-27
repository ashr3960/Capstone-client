import React from "react";
import { Link } from "react-router-dom"; 
import mainLogo from "../../../public/logos/mainlogo.png";
import mainBrand from "../../../public/logos/mainbrand.png";
import "./footer.scss"; 

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__top">
        <Link to="/" className="footer__logo">
          <img src={mainLogo} alt="Main Logo" className="footer__image" />
          <img src={mainBrand} alt="Brand Logo" className="footer__brand" />
        </Link>

        <div className="footer__links">
          <Link to="/about">About</Link> 
          <Link to="/events">Browse Events</Link>
        </div>
      </div>

      <div className="footer__line"></div>

      <div classNmae="footer__bottom">
        <div className="footer__text">
          <p>&copy; 2025 BuzzEvents. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
