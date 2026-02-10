import React, { useState } from 'react';
import { Star, X } from 'lucide-react';
import './ReviewFormModal.css';

const ReviewFormModal = ({ isOpen, onClose, vehicleId, onReviewSubmitted }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [hover, setHover] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const token = localStorage.getItem('token');
            const res = await fetch('/api/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    vehicleId,
                    rating,
                    comment
                })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Failed to submit review');
            }

            onReviewSubmitted();
            onClose();
            alert('Review submitted successfully!');
            setRating(0);
            setComment('');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content review-modal">
                <button className="close-btn" onClick={onClose}><X size={24} /></button>
                <h2>Rate your experience</h2>
                <p>How was your trip?</p>

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="star-rating">
                        {[...Array(5)].map((_, index) => {
                            const ratingValue = index + 1;
                            return (
                                <label key={index}>
                                    <input
                                        type="radio"
                                        name="rating"
                                        value={ratingValue}
                                        onClick={() => setRating(ratingValue)}
                                    />
                                    <Star
                                        className="star"
                                        size={32}
                                        color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                                        fill={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                                        onMouseEnter={() => setHover(ratingValue)}
                                        onMouseLeave={() => setHover(0)}
                                    />
                                </label>
                            );
                        })}
                    </div>

                    <div className="form-group">
                        <textarea
                            placeholder="Share your feedback..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            required
                            rows="4"
                        ></textarea>
                    </div>

                    <button type="submit" className="btn btn-primary full-width" disabled={loading || rating === 0}>
                        {loading ? 'Submitting...' : 'Submit Review'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ReviewFormModal;
