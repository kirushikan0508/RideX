const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const {
    getAnalytics,
    getAllUsers,
    updateUserRole,
    deleteUser,
    getAllReviews
} = require('../controllers/adminController');

router.route('/analytics').get(protect, admin, getAnalytics);
router.route('/users').get(protect, admin, getAllUsers);
router.route('/users/:id/role').put(protect, admin, updateUserRole);
router.route('/users/:id').delete(protect, admin, deleteUser);
router.route('/reviews').get(protect, admin, getAllReviews);

module.exports = router;
