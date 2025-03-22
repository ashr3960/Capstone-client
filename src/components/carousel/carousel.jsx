import React, { useState, useRef, useEffect } from 'react';
import { events } from './data';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './carousel.scss';

export default function Carousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const carouselRef = useRef(null);

    const handleNext = () => {
        if (!carouselRef.current) return;

        const itemWidth = carouselRef.current.offsetWidth / 3 + 8;
        const maxIndex = events.length - 3;

        let newIndex = currentIndex + 1.5;
        if (newIndex > maxIndex) {
            newIndex = 0; 
        }
        
        setCurrentIndex(newIndex);
        carouselRef.current.style.transition = "transform 1.5s ease-in-out";
        carouselRef.current.style.transform = `translateX(-${(newIndex + 1) * itemWidth}px)`;
    };

    const handlePrev = () => {
        if (!carouselRef.current) return;

        const itemWidth = carouselRef.current.offsetWidth / 3;

        let newIndex = currentIndex - 1.5;
        if (newIndex < 0) {
            newIndex = events.length - 3; 
        }

        setCurrentIndex(newIndex);
        carouselRef.current.style.transition = "transform 1s ease-in-out";
        carouselRef.current.style.transform = `translateX(-${newIndex * itemWidth}px)`;
    };

    useEffect(() => {
        let interval;
        if (!isHovered) {
            interval = setInterval(handleNext, 3000); 
        } else {
            clearInterval(interval); 
        }

        return () => clearInterval(interval); 
    }, [currentIndex, isHovered]);

    return (
        <div className="carousel-page">
            <div
                className="carousel-container"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {isHovered && currentIndex > 0 && (
                    <button className="nav-button nav-button-left" onClick={handlePrev}>
                        <ChevronLeft size={24} />
                    </button>
                )}

                {isHovered && currentIndex < events.length - 5 && (
                    <button className="nav-button nav-button-right" onClick={handleNext}>
                        <ChevronRight size={24} />
                    </button>
                )}

                <div className="carousel-wrapper">
                    <div ref={carouselRef} className="carousel-track">
                        {events.map((event) => (
                            <div className="carousel-item" key={event.id}>
                                <div className="event-card">
                                    <img
                                        src={event.img}
                                        alt={event.title}
                                        className="event-image"
                                    />
                                    <div className="event-overlay">
                                        <div className="event-info">
                                            <h3 className="event-title">{event.title}</h3>
                                            <p className="event-category">{event.category}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
