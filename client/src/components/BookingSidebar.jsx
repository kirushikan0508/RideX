import React, { useState } from 'react';
import { Calendar, MapPin, Info } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import './BookingSidebar.css';

const BookingSidebar = ({ price }) => {
    const [days, setDays] = useState(1);
    const navigate = useNavigate();
    const { id } = useParams();

    const total = price * days;
    const serviceFee = Math.round(total * 0.05);
    const insurance = 50 * days;
    const grandTotal = total + serviceFee + insurance;

    return (
        <div className="booking-sidebar">
            <div className="booking-header">
                <span className="price">₹{price}</span>
                <span className="unit">/ day</span>
            </div>

            <div className="booking-form">
                <div className="form-group">
                    <label><MapPin size={16} /> Pickup Location</label>
                    <input type="text" placeholder="Enter zip code or city" />
                </div>

                <div className="date-group">
                    <div className="form-group">
                        <label>Pickup Date</label>
                        <input type="date" />
                    </div>
                    <div className="form-group">
                        <label>Return Date</label>
                        <input type="date" />
                    </div>
                </div>

                <div className="form-group">
                    <label>Duration (Days)</label>
                    <input
                        type="number"
                        value={days}
                        min="1"
                        onChange={(e) => setDays(Number(e.target.value))}
                    />
                </div>

                <button className="book-btn" onClick={() => navigate(`/booking/${id}`)}>Book Now</button>
            </div>

            <div className="price-breakdown">
                <div className="price-row">
                    <span>₹{price} x {days} days</span>
                    <span>₹{total}</span>
                </div>
                <div className="price-row">
                    <span>Insurance</span>
                    <span>₹{insurance}</span>
                </div>
                <div className="price-row">
                    <span>Service Fee</span>
                    <span>₹{serviceFee}</span>
                </div>
                <div className="divider"></div>
                <div className="price-row total">
                    <span>Total</span>
                    <span>₹{grandTotal}</span>
                </div>
            </div>

            <p className="no-charge-note">
                <Info size={14} /> You won't be charged yet
            </p>
        </div>
    );
};

export default BookingSidebar;
