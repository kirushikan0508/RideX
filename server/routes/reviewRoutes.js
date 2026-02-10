const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const { getVehicleReviews, addReview, deleteReview } = require('../controllers/reviewController');

router.route('/:vehicleId').get(getVehicleReviews);
router.route('/').post(protect, addReview);
router.route('/:id').delete(protect, deleteReview);

module.exports = router;
