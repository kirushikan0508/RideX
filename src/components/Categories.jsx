import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Categories.css';

const Categories = () => {
    return (
        <section id="categories" className="categories-section">
            <div className="container">
                <h2 className="section-title">Choose Your Ride</h2>
                <p className="section-subtitle">Select from our premium fleet of luxury cars and high-performance bikes.</p>

                <div className="categories-grid">
                    <Link to="/vehicles" className="category-card car-card">
                        <div className="category-content">
                            <h3>Luxury Cars</h3>
                            <p>Experience comfort and elegance.</p>
                            <button className="cat-btn">
                                View Cars <ArrowUpRight size={18} />
                            </button>
                        </div>
                    </Link>

                    <Link to="/vehicles" className="category-card bike-card">
                        <div className="category-content">
                            <h3>Sports Bikes</h3>
                            <p>Feel the adrenaline rush.</p>
                            <button className="cat-btn">
                                View Bikes <ArrowUpRight size={18} />
                            </button>
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Categories;
