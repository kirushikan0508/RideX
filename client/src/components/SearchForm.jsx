import React from 'react';
import { MapPin, Calendar, Search } from 'lucide-react';
import './SearchForm.css';

const SearchForm = () => {
    return (
        <div className="search-wrapper container animate-fade-in">
            <div className="search-form">
                <div className="search-group">
                    <label><MapPin size={16} className="text-primary" /> Pick-up Location</label>
                    <input type="text" placeholder="City, Airport, or Address" />
                </div>

                <div className="search-divider"></div>

                <div className="search-group">
                    <label><Calendar size={16} className="text-primary" /> Pick-up Date</label>
                    <input type="datetime-local" />
                </div>

                <div className="search-divider"></div>

                <div className="search-group">
                    <label><Calendar size={16} className="text-primary" /> Return Date</label>
                    <input type="datetime-local" />
                </div>

                <button className="search-btn">
                    <Search size={20} />
                    Search
                </button>
            </div>
        </div>
    );
};

export default SearchForm;
