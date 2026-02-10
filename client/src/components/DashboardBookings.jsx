import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, Star } from 'lucide-react';
import './DashboardBookings.css';
import ReviewFormModal from './ReviewFormModal';

const DashboardBookings = () => {
    const [filter, setFilter] = useState('all');
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    // Review Modal State
    const [isReviewOpen, setIsReviewOpen] = useState(false);
    const [selectedVehicleId, setSelectedVehicleId] = useState(null);

    const openReviewModal = (vehicleId) => {
        setSelectedVehicleId(vehicleId);
        setIsReviewOpen(true);
    };

    useEffect(() => {
        const fetchBookings = async () => {
            const token = localStorage.getItem('token');
            try {
                const res = await fetch('/api/bookings/mybookings', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (res.ok) {
                    const data = await res.json();
                    setBookings(data);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchBookings();
    }, []);

    const filteredBookings = bookings.filter(booking => {
        if (filter === 'all') return true;
        return booking.status === filter;
    });

    if (loading) return <div className="text-center p-5">Loading bookings...</div>;

    return (
        <div className="dashboard-content">
            <div className="content-header">
                <h2>My Bookings</h2>
                <div className="tabs">
                    {['all', 'active', 'completed', 'cancelled'].map(status => (
                        <button
                            key={status}
                            className={filter === status ? 'active' : ''}
                            onClick={() => setFilter(status)}
                        >
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            <div className="bookings-list">
                {filteredBookings.length === 0 ? (
                    <div className="text-center p-5 text-gray">No bookings found.</div>
                ) : (
                    filteredBookings.map(booking => (
                        <div key={booking._id} className="booking-card">
                            <img src={booking.vehicle.images?.[0] || 'https://via.placeholder.com/150'} alt={booking.vehicle.name} className="booking-img" />

                            <div className="booking-info">
                                <div className="info-header">
                                    <h3>{booking.vehicle.name}</h3>
                                    <span className={`status-badge ${booking.status}`}>{booking.status}</span>
                                </div>

                                <div className="booking-dates">
                                    <div className="date-item">
                                        <span className="label">Pickup</span>
                                        <span className="value">{new Date(booking.pickupDate).toLocaleDateString()}</span>
                                    </div>
                                    <div className="arrow">→</div>
                                    <div className="date-item">
                                        <span className="label">Return</span>
                                        <span className="value">{new Date(booking.returnDate).toLocaleDateString()}</span>
                                    </div>
                                </div>

                                <div className="booking-meta">
                                    <span><Clock size={14} /> {Math.ceil(Math.abs(new Date(booking.returnDate) - new Date(booking.pickupDate)) / (1000 * 60 * 60 * 24))} Days</span>
                                    <span className="booking-id">ID: {booking._id.slice(-6).toUpperCase()}</span>
                                </div>
                            </div>

                            <div className="booking-actions">
                                <span className="cost">₹{booking.totalPrice}</span>
                                {booking.status === 'completed' && (
                                    <button
                                        className="btn btn-sm btn-primary"
                                        style={{ marginRight: '10px' }}
                                        onClick={() => openReviewModal(booking.vehicle._id)}
                                    >
                                        <Star size={14} className="mr-1" /> Rate
                                    </button>
                                )}
                                <button className="btn btn-outline btn-sm">View Details</button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <ReviewFormModal
                isOpen={isReviewOpen}
                onClose={() => setIsReviewOpen(false)}
                vehicleId={selectedVehicleId}
                onReviewSubmitted={() => {
                    // Optionally refresh bookings or show success
                }}
            />
        </div>
    );
};

export default DashboardBookings;
