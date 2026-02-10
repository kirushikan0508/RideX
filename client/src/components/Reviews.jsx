import React from 'react';
import { Star, Quote } from 'lucide-react';
import './Reviews.css';

const reviews = [
    {
        id: 1,
        name: 'Alex Draganov',
        rating: 5,
        comment: 'The best rental service I\'ve ever used. The BMW M4 was in pristine condition and the booking was seamless.',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop'
    },
    {
        id: 2,
        name: 'Sarah Mitchell',
        rating: 5,
        comment: 'Smooth booking process and excellent customer support. They delivered the car right to my hotel.',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop'
    },
    {
        id: 3,
        name: 'Mike Turner',
        rating: 4,
        comment: 'Rented a Harley for a weekend trip. Unforgettable experience. Good rates and friendly staff.',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop'
    }
];

const Reviews = () => {
    return (
        <section id="reviews" className="reviews-section">
            <div className="container">
                <h2 className="section-title">Client Stories</h2>
                <p className="section-subtitle">Read what our happy customers have to say.</p>

                <div className="reviews-grid">
                    {reviews.map(review => (
                        <div key={review.id} className="review-card">
                            <Quote size={40} className="quote-icon" />
                            <div className="review-content">
                                <p>"{review.comment}"</p>
                            </div>
                            <div className="review-footer">
                                <img src={review.image} alt={review.name} className="reviewer-img" />
                                <div className="reviewer-info">
                                    <h4>{review.name}</h4>
                                    <div className="rating">
                                        {[...Array(review.rating)].map((_, i) => (
                                            <Star key={i} size={14} fill="var(--primary)" color="var(--primary)" />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Reviews;
