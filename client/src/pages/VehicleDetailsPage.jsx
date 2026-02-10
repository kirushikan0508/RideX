import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Shield, MapPin, Gauge, Fuel, Users, Zap, MessageCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ImageGallery from '../components/ImageGallery';
import BookingSidebar from '../components/BookingSidebar';
import ReviewsList from '../components/ReviewsList';
import { useVehicle } from '../hooks/useVehicles';
import './VehicleDetailsPage.css';

const VehicleDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { vehicle, loading, error } = useVehicle(id);

    const handleChat = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        try {
            const res = await fetch('/api/chat/conversation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ userId: vehicle.owner })
            });

            if (res.ok) {
                navigate('/chat');
            }
        } catch (error) {
            console.error(error);
        }
    };

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (loading) return <div className="text-center p-5">Loading vehicle details...</div>;
    if (error) return <div className="text-center p-5 text-red">{error}</div>;
    if (!vehicle) return <div className="text-center p-5">Vehicle not found</div>;

    return (
        <div className="details-page">
            <Navbar />

            <div className="container details-container">
                <Link to="/vehicles" className="back-link">
                    <ArrowLeft size={20} /> Back to Fleet
                </Link>

                <div className="details-layout">
                    <div className="details-content">
                        <ImageGallery images={vehicle.gallery} />

                        <div className="vehicle-info-header">
                            <div className="title-section">
                                <h1>{vehicle.name}</h1>
                                <div className="sub-info">
                                    <div className="rating-pill">
                                        <Star size={16} fill="var(--primary)" color="var(--primary)" />
                                        <strong>{vehicle.rating}</strong> ({vehicle.reviews} reviews)
                                    </div>
                                    <span className="location"><MapPin size={16} /> {vehicle.location}</span>
                                </div>
                            </div>

                            <div className="owner-badge">
                                <img src={vehicle.owner.avatar} alt={vehicle.owner.name} />
                                <div>
                                    <span className="subtitle">Hosted by</span>
                                    <strong>{vehicle.owner.name}</strong>
                                </div>
                            </div>
                        </div>

                        <div className="divider"></div>

                        <div className="features-grid">
                            <div className="feature">
                                <Gauge size={24} />
                                <span>{vehicle.specs.speed}</span>
                                <small>Top Speed</small>
                            </div>
                            <div className="feature">
                                <Zap size={24} />
                                <span>{vehicle.specs.power}</span>
                                <small>Power</small>
                            </div>
                            <div className="feature">
                                <Fuel size={24} />
                                <span>{vehicle.specs.fuel}</span>
                                <small>Fuel Type</small>
                            </div>
                            <div className="feature">
                                <Users size={24} />
                                <span>{vehicle.specs.seats} Seats</span>
                                <small>Capacity</small>
                            </div>
                        </div>

                        <div className="divider"></div>

                        <div className="description-section">
                            <h3>About this vehicle</h3>
                            <p>{vehicle.description}</p>
                        </div>

                        <div className="specs-section">
                            <h3>Technical Specifications</h3>
                            <div className="specs-table">
                                <div className="spec-row">
                                    <span>Engine</span>
                                    <span>{vehicle.specs.engine}</span>
                                </div>
                                <div className="spec-row">
                                    <span>Transmission</span>
                                    <span>{vehicle.specs.transmission}</span>
                                </div>
                                <div className="spec-row">
                                    <span>0-60 mph</span>
                                    <span>3.8s</span>
                                </div>
                            </div>
                        </div>

                        <div className="owner-card">
                            <div className="owner-info">
                                <img src={vehicle.owner.avatar} alt={vehicle.owner.name} />
                                <div>
                                    <h4>{vehicle.owner.name}</h4>
                                    <div className="rating">
                                        <Star size={14} fill="#ffc107" color="#ffc107" /> {vehicle.owner.rating} ({vehicle.owner.reviews} reviews)
                                    </div>
                                </div>
                            </div>
                            <button className="btn btn-outline full-width" onClick={handleChat}>
                                <MessageCircle size={18} /> Chat with Owner
                            </button>
                        </div>

                        <div className="insurance-section">
                            <Shield size={24} className="shield-icon" />
                            <div>
                                <h4>{vehicle.insurance}</h4>
                                <p>Drive with peace of mind. Comprehensive insurance covers theft and collision.</p>
                            </div>
                        </div>

                        <ReviewsList vehicleId={vehicle._id} />
                    </div>

                    <div className="sidebar-column">
                        <BookingSidebar price={vehicle.price} />
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default VehicleDetailsPage;
