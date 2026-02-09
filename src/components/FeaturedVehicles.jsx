import React from 'react';
import { Star, Fuel, Gauge, Users } from 'lucide-react';
import './FeaturedVehicles.css';

const vehicles = [
    {
        id: 1,
        name: 'BMW M4 Competition',
        type: 'Luxury Coupe',
        image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop',
        price: 15000,
        rating: 5.0,
        specs: { speed: '290 km/h', fuel: 'Petrol', seats: 4 }
    },
    {
        id: 2,
        name: 'Mercedes AMG GT',
        type: 'Sports Car',
        image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2070&auto=format&fit=crop',
        price: 18000,
        rating: 4.9,
        specs: { speed: '310 km/h', fuel: 'Petrol', seats: 2 }
    },
    {
        id: 3,
        name: 'Audi RS e-tron GT',
        type: 'Electric Sport',
        image: 'https://images.unsplash.com/photo-1603584173870-7b299f589c02?q=80&w=2069&auto=format&fit=crop',
        price: 20000,
        rating: 5.0,
        specs: { speed: '250 km/h', fuel: 'Electric', seats: 4 }
    },
    {
        id: 4,
        name: 'Ducati Panigale V4',
        type: 'Superbike',
        image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=2070&auto=format&fit=crop',
        price: 8000,
        rating: 4.8,
        specs: { speed: '300 km/h', fuel: 'Petrol', seats: 1 }
    },
    {
        id: 5,
        name: 'Kawasaki Ninja ZX-10R',
        type: 'Sport Bike',
        image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c3d?q=80&w=2070&auto=format&fit=crop',
        price: 7500,
        rating: 4.7,
        specs: { speed: '295 km/h', fuel: 'Petrol', seats: 1 }
    },
    {
        id: 6,
        name: 'Harley Davidson Iron 883',
        type: 'Cruiser',
        image: 'https://images.unsplash.com/photo-1558981285-6f0c94958bb6?q=80&w=2070&auto=format&fit=crop',
        price: 6000,
        rating: 4.9,
        specs: { speed: '180 km/h', fuel: 'Petrol', seats: 1 }
    }
];

const FeaturedVehicles = () => {
    return (
        <section id="featured" className="featured-section">
            <div className="container">
                <h2 className="section-title">Featured Vehicles</h2>
                <p className="section-subtitle">Top-rated rides chosen by our customers.</p>

                <div className="vehicles-grid">
                    {vehicles.map(vehicle => (
                        <div key={vehicle.id} className="vehicle-card">
                            <div className="vehicle-image-wrapper">
                                <img src={vehicle.image} alt={vehicle.name} className="vehicle-image" />
                                <div className="vehicle-price">₹{vehicle.price}<span className="day">/day</span></div>
                            </div>
                            <div className="vehicle-details">
                                <div className="vehicle-header">
                                    <h3>{vehicle.name}</h3>
                                    <div className="rating">
                                        <Star size={16} fill="var(--primary)" color="var(--primary)" />
                                        <span>{vehicle.rating}</span>
                                    </div>
                                </div>
                                <p className="vehicle-type">{vehicle.type}</p>

                                <div className="vehicle-specs">
                                    <div className="spec-item">
                                        <Gauge size={16} /> <span>{vehicle.specs.speed}</span>
                                    </div>
                                    <div className="spec-item">
                                        <Fuel size={16} /> <span>{vehicle.specs.fuel}</span>
                                    </div>
                                    <div className="spec-item">
                                        <Users size={16} /> <span>{vehicle.specs.seats}</span>
                                    </div>
                                </div>

                                <button className="btn btn-primary btn-block">Book Now</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedVehicles;
