import React, { useState, useEffect } from 'react';
import { Check, X, Clock } from 'lucide-react';
import './AdminVehicles.css'; // Reusing table styles

const AdminBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchBookings = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch('/api/bookings', {
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

    useEffect(() => {
        fetchBookings();
    }, []);

    const handleStatusChange = async (id, newStatus) => {
        if (confirm(`Are you sure you want to ${newStatus} this booking?`)) {
            try {
                const token = localStorage.getItem('token');
                const res = await fetch(`/api/bookings/${id}/status`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ status: newStatus })
                });

                if (res.ok) {
                    setBookings(bookings.map(b => b._id === id ? { ...b, status: newStatus } : b));
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    if (loading) return <div>Loading bookings...</div>;

    return (
        <div className="admin-content">
            <div className="admin-page-header">
                <h2>Booking Management</h2>
            </div>

            <div className="admin-table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Vehicle</th>
                            <th>Dates</th>
                            <th>Total Cost</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map(booking => (
                            <tr key={booking._id}>
                                <td>{booking._id.slice(-6).toUpperCase()}</td>
                                <td>{booking.vehicle?.name || 'Unknown'}</td>
                                <td>
                                    {new Date(booking.pickupDate).toLocaleDateString()} - <br />
                                    {new Date(booking.returnDate).toLocaleDateString()}
                                </td>
                                <td>₹{booking.totalPrice}</td>
                                <td>
                                    <span className={`badge status-${booking.status}`}>
                                        {booking.status}
                                    </span>
                                </td>
                                <td>
                                    {booking.status === 'pending' && (
                                        <div className="action-buttons">
                                            <button
                                                className="icon-btn success"
                                                title="Approve"
                                                onClick={() => handleStatusChange(booking._id, 'active')}
                                            >
                                                <Check size={18} color="#28a745" />
                                            </button>
                                            <button
                                                className="icon-btn danger"
                                                title="Reject"
                                                onClick={() => handleStatusChange(booking._id, 'cancelled')}
                                            >
                                                <X size={18} color="#dc3545" />
                                            </button>
                                        </div>
                                    )}
                                    {booking.status !== 'pending' && <span style={{ fontSize: '0.8rem', color: '#666' }}>-</span>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminBookings;
