import React, { useState, useCallback, useRef } from 'react';
import { GoogleMap, LoadScript, Marker, Autocomplete } from '@react-google-maps/api';
import { MapPin, Search } from 'lucide-react';
import './LocationPicker.css';

const libraries = ['places'];

const mapContainerStyle = {
    width: '100%',
    height: '400px',
    borderRadius: '8px'
};

const defaultCenter = {
    lat: 28.6139, // Delhi
    lng: 77.2090
};

const LocationPicker = ({ onLocationSelect, initialLocation }) => {
    const [center, setCenter] = useState(initialLocation || defaultCenter);
    const [markerPosition, setMarkerPosition] = useState(initialLocation || null);
    const [address, setAddress] = useState('');
    const autocompleteRef = useRef(null);

    const onMapClick = useCallback((e) => {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();

        setMarkerPosition({ lat, lng });

        // Reverse geocode to get address
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ location: { lat, lng } }, (results, status) => {
            if (status === 'OK' && results[0]) {
                setAddress(results[0].formatted_address);
                onLocationSelect({
                    address: results[0].formatted_address,
                    lat,
                    lng
                });
            }
        });
    }, [onLocationSelect]);

    const onPlaceChanged = () => {
        if (autocompleteRef.current) {
            const place = autocompleteRef.current.getPlace();

            if (place.geometry) {
                const lat = place.geometry.location.lat();
                const lng = place.geometry.location.lng();

                setCenter({ lat, lng });
                setMarkerPosition({ lat, lng });
                setAddress(place.formatted_address);

                onLocationSelect({
                    address: place.formatted_address,
                    lat,
                    lng
                });
            }
        }
    };

    return (
        <div className="location-picker">
            <LoadScript
                googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY'}
                libraries={libraries}
            >
                <div className="search-box">
                    <Search size={20} className="search-icon" />
                    <Autocomplete
                        onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
                        onPlaceChanged={onPlaceChanged}
                    >
                        <input
                            type="text"
                            placeholder="Search for a location..."
                            className="location-search-input"
                        />
                    </Autocomplete>
                </div>

                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={center}
                    zoom={13}
                    onClick={onMapClick}
                >
                    {markerPosition && <Marker position={markerPosition} />}
                </GoogleMap>

                {address && (
                    <div className="selected-location">
                        <MapPin size={16} />
                        <span>{address}</span>
                    </div>
                )}
            </LoadScript>
        </div>
    );
};

export default LocationPicker;
