const express = require('express');
const router = express.Router();
const { getVehicles, getVehicleById, createVehicle, deleteVehicle } = require('../controllers/vehicleController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(getVehicles).post(protect, createVehicle);
router.route('/:id').get(getVehicleById).delete(protect, deleteVehicle);

module.exports = router;
