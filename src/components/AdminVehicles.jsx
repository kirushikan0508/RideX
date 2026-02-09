import React, { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { MOCK_VEHICLES } from '../data/mockVehicles';
import './AdminVehicles.css';

const AdminVehicles = () => {
    const [vehicles, setVehicles] = useState(MOCK_VEHICLES);

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this vehicle?")) {
            setVehicles(vehicles.filter(v => v.id !== id));
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
                            <tr key={vehicle.id}>
                                <td>
                                    <img src={vehicle.image} alt={vehicle.name} className="table-img" />
                                </td>
                                <td>{vehicle.name}</td>
                                <td>{vehicle.type}</td>
                                <td>₹{vehicle.price}</td>
                                <td><span className="badge badge-success">Available</span></td>
                                <td>
                                    <div className="action-buttons">
                                        <button className="icon-btn edit"><Edit2 size={16} /></button>
                                        <button className="icon-btn delete" onClick={() => handleDelete(vehicle.id)}><Trash2 size={16} /></button>
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
