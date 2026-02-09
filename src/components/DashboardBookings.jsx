import React, { useState } from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { MOCK_BOOKINGS } from '../data/mockBookings';
import './DashboardBookings.css';

const DashboardBookings = () => {
    const [filter, setFilter] = useState('all');

    const filteredBookings = MOCK_BOOKINGS.filter(booking => {
        if (filter === 'all') return true;
        return booking.status === filter;
    });

    return (
        <div className="dashboard-content">
            <div className="content-header">
                <h2>My Bookings</h2>
                <div className="tabs">
                    <button
                        className={filter === 'all' ? 'active' : ''}
                        onClick={() => setFilter('all')}
                    >
                        All
                    </button>
                    <button
                        className={filter === 'active' ? 'active' : ''}
                        onClick={() => setFilter('active')}
                    >
                        Active
                    </button>
                    <button
                        className={filter === 'completed' ? 'active' : ''}
                        onClick={() => setFilter('completed')}
                    >
                        Completed
                    </button>
                    <button
                        className={filter === 'cancelled' ? 'active' : ''}
                        onClick={() => setFilter('cancelled')}
                    >
                        Cancelled
                    </button>
                </div>
            </div>

            <div className="bookings-list">
                {filteredBookings.map(booking => (
                    <div key={booking.id} className="booking-card">
                        <img src={booking.vehicle.image} alt={booking.vehicle.name} className="booking-img" />

                        <div className="booking-info">
                            <div className="info-header">
                                <h3>{booking.vehicle.name}</h3>
                                <span className={`status-badge ${booking.status}`}>{booking.status}</span>
                            </div>

                            <div className="booking-dates">
                                <div className="date-item">
                                    <span className="label">Pickup</span>
                                    <span className="value">{booking.dates.pickup}</span>
                                </div>
                                <div className="arrow">→</div>
                                <div className="date-item">
                                    <span className="label">Return</span>
                                    <span className="value">{booking.dates.return}</span>
                                </div>
                            </div>

                            <div className="booking-meta">
                                <span><Clock size={14} /> {booking.days} Days</span>
                                <span className="booking-id">ID: {booking.id}</span>
                            </div>
                        </div>

                        <div className="booking-actions">
                            <span className="cost">₹{booking.cost}</span>
                            <button className="btn btn-outline btn-sm">View Details</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DashboardBookings;
