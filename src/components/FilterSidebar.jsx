import React, { useState } from 'react';
import { Filter, X } from 'lucide-react';
import './FilterSidebar.css';

const FilterSidebar = ({ isOpen, onClose, filters, setFilters }) => {
    const handleTypeChange = (type) => {
        setFilters(prev => ({
            ...prev,
            types: prev.types.includes(type)
                ? prev.types.filter(t => t !== type)
                : [...prev.types, type]
        }));
    };

    const handleTransmissionChange = (trans) => {
        setFilters(prev => ({
            ...prev,
            transmission: prev.transmission === trans ? '' : trans
        }));
    };

    return (
        <aside className={`filter-sidebar ${isOpen ? 'open' : ''}`}>
            <div className="filter-header">
                <h3><Filter size={20} /> Filters</h3>
                <button className="close-filter" onClick={onClose}><X size={20} /></button>
            </div>

            <div className="filter-group">
                <h4>Price Range (per day)</h4>
                <div className="price-inputs">
                    <input
                        type="number"
                        value={filters.minPrice}
                        onChange={(e) => setFilters({ ...filters, minPrice: Number(e.target.value) })}
                        placeholder="Min"
                    />
                    <span>-</span>
                    <input
                        type="number"
                        value={filters.maxPrice}
                        onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) })}
                        placeholder="Max"
                    />
                </div>
            </div>

            <div className="filter-group">
                <h4>Vehicle Type</h4>
                {['Luxury', 'Sports', 'SUV', 'Electric', 'Superbike'].map(type => (
                    <label key={type} className="checkbox-label">
                        <input
                            type="checkbox"
                            checked={filters.types.includes(type)}
                            onChange={() => handleTypeChange(type)}
                        />
                        {type}
                    </label>
                ))}
            </div>

            <div className="filter-group">
                <h4>Transmission</h4>
                {['Automatic', 'Manual'].map(trans => (
                    <label key={trans} className="radio-label">
                        <input
                            type="radio"
                            name="transmission"
                            checked={filters.transmission === trans}
                            onChange={() => handleTransmissionChange(trans)}
                        />
                        {trans}
                    </label>
                ))}
            </div>

            <button className="btn btn-primary apply-btn" onClick={onClose}>Apply Filters</button>
        </aside>
    );
};

export default FilterSidebar;
