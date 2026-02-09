import React from 'react';
import { Car, Bike, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
    return (
        <section id="home" className="hero">
            <div className="hero-overlay"></div>
            <div className="container hero-container">
                <div className="hero-content animate-fade-in">
                    <h1 className="hero-title">
                        Rent Luxury Cars & <br />
                        <span className="text-gradient">Sports Bikes</span>
                    </h1>
                    <p className="hero-subtitle">
                        Premium fleet. Affordable rates. Instant booking. <br />
                        Experience the thrill of the open road with RideX.
                    </p>

                    <div className="hero-actions">
                        <Link to="/vehicles" className="btn btn-primary hero-btn">
                            <Car size={20} />
                            Rent a Car
                        </Link>
                        <Link to="/vehicles" className="btn btn-outline hero-btn">
                            <Bike size={20} />
                            Rent a Bike
                        </Link>
                    </div>

                    <div className="stats">
                        <div className="stat-item">
                            <span className="stat-num">500+</span>
                            <span className="stat-label">Vehicles</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-num">24/7</span>
                            <span className="stat-label">Support</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-num">5 Star</span>
                            <span className="stat-label">Rating</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
