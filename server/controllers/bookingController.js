const Booking = require('../models/BookingModel');
const Vehicle = require('../models/VehicleModel');
const User = require('../models/UserModel');
const { sendBookingConfirmation, sendBookingCancellation, sendOwnerNewBookingAlert } = require('../utils/emailService');

// @desc    Create a new booking
// @route   POST /api/bookings
// @access  Private
const createBooking = async (req, res) => {
    const { vehicleId, pickupDate, returnDate, pickupLocation, totalPrice, paymentId } = req.body;

    try {
        const vehicle = await Vehicle.findById(vehicleId).populate('owner');

        if (!vehicle) {
            res.status(404).json({ message: 'Vehicle not found' });
            return;
        }

        // Check availability
        const overlappingBooking = await Booking.findOne({
            vehicle: vehicleId,
            status: { $in: ['pending', 'active'] },
            $or: [
                { pickupDate: { $lt: new Date(returnDate) }, returnDate: { $gt: new Date(pickupDate) } }
            ]
        });

        if (overlappingBooking) {
            res.status(400).json({ message: 'Vehicle is not available for these dates' });
            return;
        }

        const booking = new Booking({
            user: req.user._id,
            vehicle: vehicleId,
            pickupDate,
            returnDate,
            pickupLocation,
            totalPrice,
            paymentId,
            status: 'pending'
        });

        const createdBooking = await booking.save();

        // Send Email Notifications (Async - don't await/block response)
        sendBookingConfirmation(req.user, createdBooking, vehicle).catch(console.error);
        sendOwnerNewBookingAlert(vehicle.owner, createdBooking, vehicle).catch(console.error);

        res.status(201).json(createdBooking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get booking by ID
// @route   GET /api/bookings/:id
// @access  Private
const getBookingById = async (req, res) => {
    const booking = await Booking.findById(req.params.id).populate('user', 'name email').populate('vehicle');

    if (booking) {
        res.json(booking);
    } else {
        res.status(404).json({ message: 'Booking not found' });
    }
};

// @desc    Get logged in user bookings
// @route   GET /api/bookings/mybookings
// @access  Private
const getMyBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user._id }).populate('vehicle').sort({ createdAt: -1 });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all bookings (Admin/Owner)
// @route   GET /api/bookings
// @access  Private/Admin
const getBookings = async (req, res) => {
    try {
        let query = {};
        // If owner, only show bookings for their vehicles
        if (req.user.role === 'owner') {
            const vehicles = await Vehicle.find({ owner: req.user._id });
            const vehicleIds = vehicles.map(v => v._id);
            query = { vehicle: { $in: vehicleIds } };
        }

        const bookings = await Booking.find(query)
            .populate('user', 'name email')
            .populate('vehicle', 'name images')
            .sort({ createdAt: -1 });

        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update booking status
// @route   PUT /api/bookings/:id/status
// @access  Private/Admin
const updateBookingStatus = async (req, res) => {
    const { status } = req.body;

    try {
        const booking = await Booking.findById(req.params.id)
            .populate('user')
            .populate('vehicle');

        if (!booking) {
            res.status(404).json({ message: 'Booking not found' });
            return;
        }

        // Authorization check (simplistic for now)
        // In real app: check if req.user is admin or owner of the vehicle

        booking.status = status;
        const updatedBooking = await booking.save();

        // Send Email if Cancelled
        if (status === 'cancelled') {
            sendBookingCancellation(booking.user, updatedBooking, booking.vehicle).catch(console.error);
        }
        // Send Email if Active (Approved)
        if (status === 'active') {
            const subject = `RideX Booking Approved!`;
            const html = `<p>Your booking for ${booking.vehicle.name} has been approved!</p>`;
            require('../utils/emailService').sendBookingConfirmation(booking.user, updatedBooking, booking.vehicle); // Re-using confirm for now or create generic 'Status User' email
        }

        res.json(updatedBooking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createBooking,
    getBookingById,
    getMyBookings,
    getBookings,
    updateBookingStatus,
};
