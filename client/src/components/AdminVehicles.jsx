import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import './AdminVehicles.css';

const AdminVehicles = () => {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchVehicles = async () => {
        try {
            const res = await fetch('/api/vehicles');
            const data = await res.json();
            setVehicles(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVehicles();
    }, []);

    const handleDelete = async (id) => {
        if (confirm("Are you sure you want to delete this vehicle?")) {
            try {
                const token = localStorage.getItem('token');
                const res = await fetch(`/api/vehicles/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (res.ok) {
                    setVehicles(vehicles.filter(v => v._id !== id));
                } else {
                    alert('Failed to delete vehicle');
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <div className="admin-content">
            <div className="admin-page-header flex-between">
                <h2>Vehicle Management</h2>
                <button className="btn btn-primary flex-center">
                    <Plus size={18} /> Add Vehicle
                </button>
            </div>

            <div className="admin-table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Price/Day</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vehicles.map(vehicle => (
                            <tr key={vehicle._id}>
                                <td>
                                    <img src={vehicle.images?.[0] || 'https://via.placeholder.com/50'} alt={vehicle.name} className="table-img" />
                                </td>
                                <td>{vehicle.name}</td>
                                <td>{vehicle.type}</td>
                                <td>₹{vehicle.price}</td>
                                <td><span className="badge badge-success">Available</span></td>
                                <td>
                                    <div className="action-buttons">
                                        <button className="icon-btn edit"><Edit2 size={16} /></button>
                                        <button className="icon-btn delete" onClick={() => handleDelete(vehicle._id)}><Trash2 size={16} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminVehicles;
