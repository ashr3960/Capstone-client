import React, { useState, useRef } from 'react';
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
    
        if (currentIndex < maxIndex) {
            const newIndex = currentIndex + 1.5;
            setCurrentIndex(newIndex);
            carouselRef.current.style.transform = `translateX(-${(newIndex+ 1) * itemWidth}px)`;
        }
    };
    
    const handlePrev = () => {
        if (!carouselRef.current) return;
    
        const itemWidth = carouselRef.current.offsetWidth / 3;  
    
        if (currentIndex > 0) {
            const newIndex = currentIndex - 1.5;
            setCurrentIndex(newIndex);
            carouselRef.current.style.transform = `translateX(-${newIndex * itemWidth}px)`;
        }
    };
    

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
