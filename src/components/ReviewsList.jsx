import React from 'react';
import { Star } from 'lucide-react';
import './ReviewsList.css';

const ReviewsList = ({ reviews }) => {
    return (
        <div className="reviews-list-section">
            <h3>Reviews ({reviews})</h3>

            <div className="review-item">
                <div className="review-header">
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop" alt="User" className="reviewer-avatar" />
                    <div>
                        <h4>James Wilson</h4>
                        <div className="review-rating">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={14} fill="#FFD700" color="#FFD700" />
                            ))}
                            <span>2 days ago</span>
                        </div>
                    </div>
                </div>
                <p className="review-text">
                    Absolutely stunning vehicle! The condition was perfect and it drove like a dream.
                    The booking process was smooth and the staff was very professional. Highly recommended!
                </p>
            </div>

            <div className="review-item">
                <div className="review-header">
                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop" alt="User" className="reviewer-avatar" />
                    <div>
                        <h4>Elena Rodriguez</h4>
                        <div className="review-rating">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={14} fill="#FFD700" color="#FFD700" />
                            ))}
                            <span>1 week ago</span>
                        </div>
                    </div>
                </div>
                <p className="review-text">
                    Great experience overall. The car was clean and fueled up.
                    Will definitely rent from RideX again for my next trip.
                </p>
            </div>
        </div>
    );
};

export default ReviewsList;
