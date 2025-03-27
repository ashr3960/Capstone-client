import React from "react";
import "./about.scss"; 

const AboutPage = () => {
    return (
        <div className="aboutpage">
            <div className="topsection">
                <div className="top">
                    <img 
                        src="https://www.adondexportar.com/wp-content/uploads/2024/02/Travel-and-tourism-trade-fair-1.jpg" 
                        alt="About BuzzEvents"
                        className="image1"
                    />
                    <div className="toptext">
                        <h1 className="title">About BuzzEvents</h1>
                        <p className="description">
                            BuzzEvents is your go-to platform for discovering and sharing amazing events.  
                            Our mission is to connect people through unforgettable experiences and celebrations.  
                            Whether you're looking for local festivals, corporate conferences, or social gatherings, we make it easy to find the perfect event.  
                            We believe that events bring people together, fostering new friendships, professional connections, and lifelong memories.  
                            Our platform curates a diverse range of events, ensuring that there is something for everyone.  
                            From music concerts and cultural fairs to networking meetups and tech expos, we cover it all.  
                            We strive to create a seamless experience for both event organizers and attendees.  
                            With our user-friendly interface, you can effortlessly browse, register, and stay updated on upcoming events.  
                            Our goal is to make event planning and discovery as convenient and enjoyable as possible.  
                            Join us on this journey to explore new experiences, build communities, and celebrate life's most exciting moments together.  
                        </p>

                        <p className="description">
                            From music concerts and cultural fairs to networking meetups and tech expos, we cover it all.  
                            We strive to create a seamless experience for both event organizers and attendees.  
                            With our user-friendly interface, you can effortlessly browse, register, and stay updated on upcoming events.  
                            Our goal is to make event planning and discovery as convenient and enjoyable as possible.  
                            Join us on this journey to explore new experiences, build communities, and celebrate life's most exciting moments together.    
                        </p>
                    </div>
                </div>
                <div className="bottom">
                    <img 
                        src="https://www.vacationsmadeeasy.com/images/TheBLT/5Minnesota-State-Fair.jpg" 
                        alt="Minnesota State Fair"
                        className="image2"
                    />
                    <img 
                        src="https://www.mybucketlistevents.com/wp-content/uploads/2019/04/chinese-new-year-photo.jpg" 
                        alt="Chinese New Year Celebration"
                        className="image3"
                    />
                </div>
            </div>


            {/* Past Events Section */}

            <h2 className="pastevents__title">Past Events</h2>
            <div className="past-events">
                <div className="event-grid">
                    <div className="event-card">
                        <img 
                            src="https://www.ticketfairy.com/blog/wp-content/uploads/2023/02/How-to-plan-a-music-event-from-the-ground-up-with-ticket-fairy-learn-blog.jpg" 
                            alt="Music Festival" 
                        />
                        <h3>Summer Music Fest 2023</h3>
                        <p>A grand celebration of music and culture featuring top artists and an incredible crowd.</p>
                    </div>
                    <div className="event-card">
                        <img 
                            src="https://i.ytimg.com/vi/TY9-l1S_4Pg/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGFEgVChlMA8=&rs=AOn4CLCuNxEfHCPznNXygo_r6cufGXsDMA" 
                            alt="Tech Conference" 
                        />
                        <h3>Global Tech Conference 2023</h3>
                        <p>Innovators and industry leaders shared insights on the future of technology and AI.</p>
                    </div>
                    <div className="event-card">
                        <img 
                            src="https://lp-cms-production.imgix.net/2022-08/GettyImages-1078390306.jpg?auto=format,compress&q=72&w=1440&h=810&fit=crop" 
                            alt="Oktoberfest" 
                        />
                        <h3>Oktoberfest 2023</h3>
                        <p>A vibrant festival with traditional food, drinks, and exciting performances.</p>
                    </div>
                    <div className="event-card">
                        <img 
                            src="https://www.vmcdn.ca/f/files/villagelife/images/life/weatherseasonal/fall/events/willkommen-platz-jvt.jpeg;w=960" 
                            alt="Food Festival" 
                        />
                        <h3>International Food Expo 2023</h3>
                        <p>A culinary experience featuring dishes from around the world.</p>
                    </div>
                    <div className="event-card">
                        <img 
                            src="https://cdn-imgix.headout.com/media/images/bc785783a9d768bd0062289b476d25e9-617-new-york-top-of-the-rock-observation-deck-tickets-01.jpg?auto=format&w=1222.3999999999999&h=687.6&q=90&fit=crop&ar=16%3A9&crop=faces" 
                            alt="Rock Concert" 
                        />
                        <h3>Rock Night Live 2023</h3>
                        <p>Rock legends performing in an electrifying atmosphere.</p>
                    </div>
                    <div className="event-card">
                        <img 
                            src="https://londonfashionweek.co.uk/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhero.2cae77d0.png&w=2048&q=75" 
                            alt="Fashion Week" 
                        />
                        <h3>London Fashion Week 2023</h3>
                        <p>Showcasing the latest trends in fashion with top designers.</p>
                    </div>
                    <div className="event-card">
                        <img 
                            src="https://i.ytimg.com/vi/qAZXhcbBTy4/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCWMcIn4YdnhjpRLFOemghLTPcvPg" 
                            alt="Japanese Festival" 
                        />
                        <h3>Tokyo Matsuri 2023</h3>
                        <p>A cultural festival celebrating traditional Japanese heritage.</p>
                    </div>
                    <div className="event-card">
                        <img 
                            src="https://i.natgeofe.com/n/afed8e9e-e199-4f29-a4a2-846ea2ebe432/albuquerque-balloon-festival-new-mexico.jpg" 
                            alt="Balloon Festival" 
                        />
                        <h3>Balloon Fiesta 2023</h3>
                        <p>A breathtaking display of colorful hot air balloons in the sky.</p>
                    </div>
                    <div className="event-card">
                        <img 
                            src="https://media.cnn.com/api/v1/images/stellar/prod/230424111422-01-sifan-hassan-london-marathon-042323.jpg?c=16x9&q=h_833,w_1480,c_fill" 
                            alt="Marathon" 
                        />
                        <h3>New York Marathon 2023</h3>
                        <p>Runners from around the world competing in the iconic race.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
