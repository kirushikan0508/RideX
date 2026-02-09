import React, { useState } from 'react';
import { Check, X, Clock } from 'lucide-react';
import { MOCK_BOOKINGS } from '../data/mockBookings';
import './AdminVehicles.css'; // Reusing table styles

const AdminBookings = () => {
    const [bookings, setBookings] = useState([
        ...MOCK_BOOKINGS,
        // Add some pending ones for demo
        {
            id: 'BK-9988',
            vehicle: { name: "Luxury Car 2", image: "" },
            dates: { pickup: "Nov 01, 2026", return: "Nov 05, 2026" },
            status: "pending",
            days: 5,
            cost: 25000
        }
    ]);

    const handleStatusChange = (id, newStatus) => {
        setBookings(bookings.map(b =>
            b.id === id ? { ...b, status: newStatus } : b
        ));
    };

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
                            <tr key={booking.id}>
                                <td>{booking.id}</td>
                                <td>{booking.vehicle.name}</td>
                                <td>{booking.dates.pickup} - {booking.dates.return}</td>
                                <td>₹{booking.cost}</td>
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
                                                onClick={() => handleStatusChange(booking.id, 'active')}
                                            >
                                                <Check size={18} color="#28a745" />
                                            </button>
                                            <button
                                                className="icon-btn danger"
                                                title="Reject"
                                                onClick={() => handleStatusChange(booking.id, 'cancelled')}
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
