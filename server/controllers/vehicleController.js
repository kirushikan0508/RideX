const Vehicle = require('../models/VehicleModel');

// @desc    Fetch all vehicles
// @route   GET /api/vehicles
// @access  Public
const getVehicles = async (req, res) => {
    const { type, minPrice, maxPrice, search, location } = req.query;

    let query = {};

    if (type && type !== 'all') {
        query.type = type;
    }

    if (minPrice || maxPrice) {
        query.price = {};
        if (minPrice) query.price.$gte = Number(minPrice);
        if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (search) {
        query.name = { $regex: search, $options: 'i' };
    }

    if (location) {
        query.location = { $regex: location, $options: 'i' };
    }

    const vehicles = await Vehicle.find(query).populate('owner', 'name nic phone');
    res.json(vehicles);
};

// @desc    Fetch single vehicle
// @route   GET /api/vehicles/:id
// @access  Public
const getVehicleById = async (req, res) => {
    const vehicle = await Vehicle.findById(req.params.id);

    if (vehicle) {
        res.json(vehicle);
    } else {
        res.status(404).json({ message: 'Vehicle not found' });
    }
};

// @desc    Create a vehicle
// @route   POST /api/vehicles
// @access  Private/Owner/Admin
const createVehicle = async (req, res) => {
    const { name, type, price, description, specs, images, location } = req.body;

    const vehicle = new Vehicle({
        name,
        type,
        price,
        description,
        specs,
        images,
        location,
        owner: req.user._id,
    });

    const createdVehicle = await vehicle.save();
    res.status(201).json(createdVehicle);
};

// @desc    Delete a vehicle
// @route   DELETE /api/vehicles/:id
// @access  Private/Owner/Admin
const deleteVehicle = async (req, res) => {
    const vehicle = await Vehicle.findById(req.params.id);

    if (vehicle) {
        if (vehicle.owner.toString() === req.user._id.toString() || req.user.role === 'admin') {
            await vehicle.deleteOne();
            res.json({ message: 'Vehicle removed' });
        } else {
            res.status(401).json({ message: 'Not authorized to delete this vehicle' });
        }
    } else {
        res.status(404).json({ message: 'Vehicle not found' });
    }
};

module.exports = { getVehicles, getVehicleById, createVehicle, deleteVehicle };
