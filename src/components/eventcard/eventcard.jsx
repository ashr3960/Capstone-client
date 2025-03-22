import React from "react";
import { useNavigate } from "react-router-dom";
import "./eventcard.scss";

const EventCard = ({ id, title, date, location, image, host }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/carddetails/${id}`);
    };

    return (
        <div className="card" onClick={handleClick}>
            <div className="card__container">
                <div className="card__top">
                    <img src={image} alt={title} className="card__image" />
                </div>
                <div className="card__bottom">
                    <h3 className="card__bottom__title">{title}</h3>
                    <p className="card__bottom__date">{date}</p>
                    <p className="card__bottom__location">{location}</p>
                    <p className="card__bottom__host">{host}</p>
                </div>
            </div>
        </div>
    );
};

export default EventCard;
