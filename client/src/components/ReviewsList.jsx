import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import './ReviewsList.css';

const ReviewsList = ({ vehicleId }) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await fetch(`/api/reviews/${vehicleId}`);
                if (res.ok) {
                    const data = await res.json();
                    setReviews(data);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        if (vehicleId) {
            fetchReviews();
        }
    }, [vehicleId]);

    if (loading) return <div>Loading reviews...</div>;

    if (reviews.length === 0) {
        return <div className="no-reviews">No reviews yet. Be the first to rent and review!</div>;
    }

    return (
        <div className="reviews-list-section">
            <h3>Reviews ({reviews.length})</h3>

            {reviews.map((review) => (
                <div key={review._id} className="review-item">
                    <div className="review-header">
                        <img src={review.userId?.avatar || 'https://via.placeholder.com/40'} alt="User" className="reviewer-avatar" />
                        <div>
                            <h4>{review.userId?.name || 'Anonymous'}</h4>
                            <div className="review-rating">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={14}
                                        fill={i < review.rating ? "#FFD700" : "#e4e5e9"}
                                        color={i < review.rating ? "#FFD700" : "#e4e5e9"}
                                    />
                                ))}
                                <span>{new Date(review.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>
                    <p className="review-text">{review.comment}</p>
                </div>
            ))}
        </div>
    );
};

export default ReviewsList;
