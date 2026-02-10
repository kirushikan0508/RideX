import React, { useState, useEffect } from 'react';
import { Star, Trash2, Search, AlertCircle } from 'lucide-react';

const AdminReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch('/api/admin/reviews', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
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

    const handleDeleteReview = async (reviewId) => {
        if (!confirm('Are you sure you want to delete this review?')) return;

        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`/api/reviews/${reviewId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (res.ok) {
                fetchReviews();
                alert('Review deleted successfully');
            }
        } catch (error) {
            console.error(error);
            alert('Failed to delete review');
        }
    };

    const filteredReviews = reviews.filter(review =>
        review.userId?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.vehicleId?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.comment.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div className="admin-content"><p>Loading reviews...</p></div>;

    return (
        <div className="admin-content">
            <div className="admin-page-header">
                <h2>Review Moderation</h2>
                <div className="search-box">
                    <Search size={18} />
                    <input
                        type="text"
                        placeholder="Search reviews..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="reviews-list">
                {filteredReviews.map((review) => (
                    <div key={review._id} className="review-card">
                        <div className="review-header">
                            <div className="review-user">
                                <strong>{review.userId?.name || 'Unknown User'}</strong>
                                <span className="review-vehicle">on {review.vehicleId?.name || 'Unknown Vehicle'}</span>
                            </div>
                            <div className="review-actions">
                                <div className="rating-stars">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={14}
                                            fill={i < review.rating ? '#ffc107' : '#e4e5e9'}
                                            color={i < review.rating ? '#ffc107' : '#e4e5e9'}
                                        />
                                    ))}
                                </div>
                                <button
                                    className="btn-icon btn-danger"
                                    onClick={() => handleDeleteReview(review._id)}
                                    title="Delete review"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                        <p className="review-comment">{review.comment}</p>
                        <span className="review-date">{new Date(review.createdAt).toLocaleString()}</span>
                    </div>
                ))}

                {filteredReviews.length === 0 && (
                    <div className="empty-state">
                        <AlertCircle size={48} />
                        <p>No reviews found</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminReviews;
