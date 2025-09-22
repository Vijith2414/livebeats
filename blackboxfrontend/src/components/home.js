// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './css/Home.css'; // Optional: Create a CSS file for styling

const Home = () => {
    return (
        <div className="home-container">
            <h1>Welcome to LiveBeats!</h1>
            <p>Your gateway to unforgettable live music experiences!</p>
            <div className="home-description">
                <p>
                    We’re thrilled to have you here at <strong>ConcertBooking</strong>, your ultimate destination for live music! 
                    Whether you're looking to secure tickets for your favorite artist, discover new performances, or plan an unforgettable night out, you’ve come to the right place.
                </p>
                <p>
                    From intimate gigs to massive festivals, our platform connects you to the music and artists you love. 
                    Explore personalized recommendations based on your preferences, stay updated on upcoming shows in your area, 
                    and never miss the chance to be part of something extraordinary.
                </p>
                <p>
                    Your next unforgettable live experience is just a few clicks away—browse our curated selection of events or dive into new genres and venues. 
                    And if you need any help, we’re here to guide you every step of the way.
                </p>
            </div>
            <Link to="/concerts" className="explore-button">Explore Events</Link>
        </div>
    );
};

export default Home;