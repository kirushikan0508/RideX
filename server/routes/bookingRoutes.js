const express = require('express');
const router = express.Router();
const {
    createBooking,
    getBookingById,
    getMyBookings,
    getBookings,
    updateBookingStatus,
} = require('../controllers/bookingController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').post(protect, createBooking).get(protect, admin, getBookings);
router.route('/mybookings').get(protect, getMyBookings);
router.route('/:id').get(protect, getBookingById);
router.route('/:id/status').put(protect, updateBookingStatus); // Allow admins/owners to update status

module.exports = router;
