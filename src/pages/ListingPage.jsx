import React, { useState, useEffect } from 'react';
import { Filter } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FilterSidebar from '../components/FilterSidebar';
import VehicleGrid from '../components/VehicleGrid';
import './ListingPage.css';

// Mock Data
const MOCK_VEHICLES = Array.from({ length: 12 }).map((_, i) => ({
    id: i + 1,
    name: i % 2 === 0 ? `Luxury Car ${i + 1}` : `Superbike ${i + 1}`,
    type: i % 2 === 0 ? 'Luxury' : 'Sport Bike',
    image: i % 2 === 0
        ? 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop'
        : 'https://images.unsplash.com/photo-1558981806-ec527fa84c3d?q=80&w=2070&auto=format&fit=crop',
    price: 5000 + (i * 1000),
    rating: (4 + Math.random()).toFixed(1),
    reviews: Math.floor(Math.random() * 100),
    specs: {
        speed: `${200 + i * 10} km/h`,
        fuel: i % 3 === 0 ? 'Electric' : 'Petrol',
        seats: i % 2 === 0 ? 4 : 1,
        transmission: i % 3 === 0 ? 'Automatic' : 'Manual'
    }
}));

const ListingPage = () => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filters, setFilters] = useState({
        minPrice: 0,
        maxPrice: 20000,
        types: [],
        transmission: ''
    });
    const [filteredVehicles, setFilteredVehicles] = useState(MOCK_VEHICLES);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    // Filter Logic
    useEffect(() => {
        let result = MOCK_VEHICLES;

        if (filters.minPrice > 0) {
            result = result.filter(v => v.price >= filters.minPrice);
        }
        if (filters.maxPrice > 0) {
            result = result.filter(v => v.price <= filters.maxPrice);
        }
        if (filters.types.length > 0) {
            result = result.filter(v => filters.types.includes(v.type));
        }
        if (filters.transmission) {
            result = result.filter(v => v.specs.transmission === filters.transmission);
        }

        setFilteredVehicles(result);
        setCurrentPage(1); // Reset to page 1 on filter change
    }, [filters]);

    // Pagination Logic
    const totalPages = Math.ceil(filteredVehicles.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedVehicles = filteredVehicles.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="listing-page">
            <Navbar />

            <div className="listing-header-section">
                <div className="container">
                    <h1>Explore Our Fleet</h1>
                    <p>Find the perfect ride for your journey.</p>
                </div>
            </div>

            <div className="container listing-container">
                <button className="mobile-filter-btn" onClick={() => setIsFilterOpen(true)}>
                    <Filter size={18} /> Filters
                </button>

                <div className="listing-layout">
                    <FilterSidebar
                        isOpen={isFilterOpen}
                        onClose={() => setIsFilterOpen(false)}
                        filters={filters}
                        setFilters={setFilters}
                    />

                    <div className="listing-content-area">
                        <div className="results-count">
                            Showning {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredVehicles.length)} of {filteredVehicles.length} results
                        </div>

                        <VehicleGrid vehicles={paginatedVehicles} />

                        {totalPages > 1 && (
                            <div className="pagination">
                                <button
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage(p => p - 1)}
                                >
                                    Previous
                                </button>
                                {[...Array(totalPages)].map((_, i) => (
                                    <button
                                        key={i}
                                        className={currentPage === i + 1 ? 'active' : ''}
                                        onClick={() => setCurrentPage(i + 1)}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                                <button
                                    disabled={currentPage === totalPages}
                                    onClick={() => setCurrentPage(p => p + 1)}
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default ListingPage;
