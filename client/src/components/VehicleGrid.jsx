import React from 'react';
import VehicleCard from './VehicleCard';
import './VehicleGrid.css';

const VehicleGrid = ({ vehicles }) => {
    if (vehicles.length === 0) {
        return (
            <div className="no-results">
                <h3>No vehicles found</h3>
                <p>Try adjusting your filters or search criteria.</p>
            </div>
        );
    }

    return (
        <div className="vehicle-list-grid">
            {vehicles.map(vehicle => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
        </div>
    );
};

export default VehicleGrid;
