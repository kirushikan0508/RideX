const Review = require('../models/ReviewModel');
const Vehicle = require('../models/VehicleModel');
const Booking = require('../models/BookingModel');

// @desc    Get reviews for a vehicle
// @route   GET /api/reviews/:vehicleId
// @access  Public
const getVehicleReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ vehicleId: req.params.vehicleId })
            .populate('userId', 'name avatar')
            .sort({ createdAt: -1 });
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add a review
// @route   POST /api/reviews
// @access  Private
const addReview = async (req, res) => {
    const { vehicleId, rating, comment } = req.body;

    try {
        // 1. Check if user has a completed booking for this vehicle
        const hasBooking = await Booking.findOne({
            user: req.user._id,
            vehicle: vehicleId,
            status: 'completed'
        });

        if (!hasBooking) {
            return res.status(400).json({ message: 'You can only review vehicles you have rented and completed trips with.' });
        }

        // 2. Check if user already reviewed this vehicle
        const alreadyReviewed = await Review.findOne({
            userId: req.user._id,
            vehicleId
        });

        if (alreadyReviewed) {
            return res.status(400).json({ message: 'You have already reviewed this vehicle.' });
        }

        // 3. Create review
        const review = await Review.create({
            userId: req.user._id,
            vehicleId,
            rating,
            comment
        });

        // 4. Update Vehicle Rating
        const reviews = await Review.find({ vehicleId });
        const avgRating = reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;

        await Vehicle.findByIdAndUpdate(vehicleId, {
            rating: avgRating.toFixed(1),
            numReviews: reviews.length
        });

        res.status(201).json(review);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a review
// @route   DELETE /api/reviews/:id
// @access  Private/Admin
const deleteReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        // Check if user is admin or review owner (optional, but requirement says Admin can delete)
        if (req.user.role !== 'admin' && review.userId.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await review.deleteOne();

        // Recalculate Rating
        const reviews = await Review.find({ vehicleId: review.vehicleId });
        let avgRating = 0;
        if (reviews.length > 0) {
            avgRating = reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;
        }

        await Vehicle.findByIdAndUpdate(review.vehicleId, {
            rating: avgRating.toFixed(1),
            numReviews: reviews.length
        });

        res.json({ message: 'Review removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getVehicleReviews,
    addReview,
    deleteReview
};
