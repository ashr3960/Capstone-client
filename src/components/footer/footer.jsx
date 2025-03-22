import React from 'react';
import { NavLink } from 'react-router-dom';
import mainLogo from "../../../public/logos/mainlogo.png";
import mainBrand from "../../../public/logos/mainbrand.png";
import './footer.scss'; 

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__content">
        <NavLink to="/" className="footer__logo">
          <img src={mainLogo} alt="Main Logo" className="footer__image" />
          <img src={mainBrand} alt="Brand Logo" className="footer__brand" />
        </NavLink>
      </div>

      <div className="footer__text">
        <p>&copy; 2025 BuzzEvents. All rights reserved.</p>
      </div>

      <div className="footer__line"></div>
    </div>
  );
};

export default Footer;
