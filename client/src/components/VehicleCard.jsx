import React from 'react';
import { Star, Fuel, Gauge, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './VehicleCard.css';

const VehicleCard = ({ vehicle }) => {
    return (
        <div className="listing-card">
            <div className="listing-image-wrapper">
                <img src={vehicle.images?.[0] || vehicle.image || 'https://via.placeholder.com/300'} alt={vehicle.name} loading="lazy" />
                <div className="listing-price">₹{vehicle.price}<small>/day</small></div>
                <div className="listing-rating">
                    <Star size={14} fill="currentColor" /> {vehicle.rating || 0} ({vehicle.numReviews || 0})
                </div>
            </div>

            <div className="listing-content">
                <div className="listing-header">
                    <h3>{vehicle.name}</h3>
                    <span className="listing-type">{vehicle.type}</span>
                </div>

                <div className="listing-specs">
                    <div className="listing-spec">
                        <Gauge size={16} /> {vehicle.specs?.mileage || 'N/A'}
                    </div>
                    <div className="listing-spec">
                        <Fuel size={16} /> {vehicle.specs?.fuelType || 'Petrol'}
                    </div>
                    <div className="listing-spec">
                        <Users size={16} /> {vehicle.specs?.seatingCapacity || 2}
                    </div>
                    <div className="listing-spec">
                        <span className="transmission-badge">{vehicle.specs?.transmission || 'Auto'}</span>
                    </div>
                </div>

                <div className="listing-footer">
                    <div className="owner-info">
                        <img src={vehicle.owner?.avatar || "https://i.pravatar.cc/100"} alt="Owner" className="owner-avatar" />
                        <span>{vehicle.owner?.name || 'RideX Fleet'}</span>
                    </div>
                    <Link to={`/vehicles/${vehicle._id}`} className="btn btn-outline btn-sm">
                        Details <ArrowRight size={16} />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default VehicleCard;
