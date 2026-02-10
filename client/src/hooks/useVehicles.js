import { useState, useEffect } from 'react';

export const useVehicles = (filters = {}) => {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVehicles = async () => {
            setLoading(true);
            try {
                const queryParams = new URLSearchParams();
                if (filters.type && filters.type !== 'all') queryParams.append('type', filters.type);
                if (filters.minPrice) queryParams.append('minPrice', filters.minPrice);
                if (filters.maxPrice) queryParams.append('maxPrice', filters.maxPrice);
                if (filters.search) queryParams.append('search', filters.search);
                if (filters.location) queryParams.append('location', filters.location);

                const response = await fetch(`/api/vehicles?${queryParams.toString()}`);
                if (!response.ok) throw new Error('Failed to fetch vehicles');

                const data = await response.json();
                setVehicles(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchVehicles();
    }, [JSON.stringify(filters)]);

    return { vehicles, loading, error };
};

export const useVehicle = (id) => {
    const [vehicle, setVehicle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVehicle = async () => {
            if (!id) return;
            setLoading(true);
            try {
                const response = await fetch(`/api/vehicles/${id}`);
                if (!response.ok) throw new Error('Failed to fetch vehicle');

                const data = await response.json();
                setVehicle(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchVehicle();
    }, [id]);

    return { vehicle, loading, error };
};
