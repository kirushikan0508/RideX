const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true }, // Car, Bike, SUV
    price: { type: Number, required: true },
    images: [{ type: String }], // Array of image URLs
    location: { type: String, required: true },
    description: { type: String },
    specs: {
        transmission: String,
        fuelType: String,
        seatingCapacity: Number,
        mileage: String
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    available: { type: Boolean, default: true },
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    reviews: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        name: { type: String, required: true },
        rating: { type: Number, required: true },
        comment: { type: String },
        createdAt: { type: Date, default: Date.now }
    }]
}, {
    timestamps: true
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle;
