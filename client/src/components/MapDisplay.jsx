import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { MapPin } from 'lucide-react';
import './MapDisplay.css';

const mapContainerStyle = {
    width: '100%',
    height: '300px',
    borderRadius: '8px'
};

const MapDisplay = ({ coordinates, address }) => {
    if (!coordinates || !coordinates.lat || !coordinates.lng) {
        return (
            <div className="map-placeholder">
                <MapPin size={32} />
                <p>No location selected</p>
            </div>
        );
    }

    return (
        <div className="map-display">
            <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY'}>
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={coordinates}
                    zoom={14}
                >
                    <Marker position={coordinates} />
                </GoogleMap>
            </LoadScript>
            {address && (
                <div className="map-address">
                    <MapPin size={16} />
                    <span>{address}</span>
                </div>
            )}
        </div>
    );
};

export default MapDisplay;
