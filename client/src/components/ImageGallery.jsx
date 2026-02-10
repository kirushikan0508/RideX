import React, { useState } from 'react';
import './ImageGallery.css';

const ImageGallery = ({ images }) => {
    const [mainImage, setMainImage] = useState(images[0]);

    return (
        <div className="image-gallery">
            <div className="main-image-wrapper">
                <img src={mainImage} alt="Vehicle Detail" className="main-image animate-fade-in" />
            </div>
            <div className="thumbnail-grid">
                {images.map((img, index) => (
                    <div
                        key={index}
                        className={`thumbnail-wrapper ${mainImage === img ? 'active' : ''}`}
                        onClick={() => setMainImage(img)}
                    >
                        <img src={img} alt={`View ${index + 1}`} className="thumbnail" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageGallery;
