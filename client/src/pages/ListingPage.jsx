import React, { useState, useEffect } from 'react';
import { Filter } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FilterSidebar from '../components/FilterSidebar';
import VehicleGrid from '../components/VehicleGrid';
import { useVehicles } from '../hooks/useVehicles';
import './ListingPage.css';

const ListingPage = () => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filters, setFilters] = useState({
        minPrice: 0,
        maxPrice: 20000,
        types: [],
        transmission: ''
    });

    const { vehicles: filteredVehicles, loading, error } = useVehicles({
        type: filters.types.length > 0 ? filters.types[0] : 'all', // Simplified for now, hook needs array support or single type
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
        location: '', // Add location filter to state if needed
    });

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    // Pagination Logic
    // Reset page when filters change (implicitly when vehicles change)
    useEffect(() => {
        setCurrentPage(1);
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
                            Showing {Math.min(startIndex + 1, filteredVehicles.length)}-{Math.min(startIndex + itemsPerPage, filteredVehicles.length)} of {filteredVehicles.length} results
                        </div>

                        {loading ? (
                            <div className="text-center p-5">Loading fleet...</div>
                        ) : error ? (
                            <div className="text-center p-5 text-red">{error}</div>
                        ) : (
                            <VehicleGrid vehicles={paginatedVehicles} />
                        )}

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
