import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Calendar, MapPin, User, CreditCard, ShieldCheck } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { MOCK_VEHICLES } from '../data/mockVehicles';
import './BookingPage.css';

const BookingPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const vehicle = MOCK_VEHICLES.find(v => v.id === Number(id)) || MOCK_VEHICLES[0];

    // Smooth scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        pickupLocation: '',
        pickupDate: '',
        pickupTime: '',
        returnDate: '',
        returnTime: '',
        fullName: '',
        nic: '',
        phone: '',
        address: '',
        email: ''
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        // Clear error when user types
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const validateStep1 = () => {
        let newErrors = {};
        if (!formData.pickupLocation) newErrors.pickupLocation = "Pickup location is required";
        if (!formData.pickupDate) newErrors.pickupDate = "Pickup date is required";
        if (!formData.returnDate) newErrors.returnDate = "Return date is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep2 = () => {
        let newErrors = {};
        if (!formData.fullName) newErrors.fullName = "Full Name is required";
        if (!formData.nic) {
            newErrors.nic = "NIC Number is required";
        } else if (!/^[0-9]{9}[vVxX]|[0-9]{12}$/.test(formData.nic)) {
            newErrors.nic = "Invalid NIC Format (Old: 9 digits+V, New: 12 digits)";
        }

        if (!formData.phone) {
            newErrors.phone = "Phone Number is required";
        } else if (!/^[0-9]{10}$/.test(formData.phone)) {
            newErrors.phone = "Invalid Phone Number (10 digits)";
        }

        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Invalid Email Address";
        }

        if (!formData.address) newErrors.address = "Address is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (currentStep === 1 && validateStep1()) {
            setCurrentStep(2);
            window.scrollTo(0, 0);
        } else if (currentStep === 2 && validateStep2()) {
            setCurrentStep(3);
            window.scrollTo(0, 0);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleConfirm = () => {
        alert("Booking Confirmed! Redirecting to Home...");
        navigate('/');
    };

    // Calculation (Basic logic for demo)
    const pricePerDay = vehicle.price;
    const days = 3; // Default for demo
    const total = pricePerDay * days;
    const tax = Math.round(total * 0.05);
    const insurance = 1500;
    const grandTotal = total + tax + insurance;

    return (
        <div className="booking-page">
            <Navbar />
            <div className="container booking-container">

                {/* Progress Bar */}
                <div className="booking-progress">
                    <div className={`step-item ${currentStep >= 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}>
                        <div className="step-circle">{currentStep > 1 ? <CheckCircle size={16} /> : 1}</div>
                        <span>Rental Details</span>
                    </div>
                    <div className="step-line"></div>
                    <div className={`step-item ${currentStep >= 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''}`}>
                        <div className="step-circle">{currentStep > 2 ? <CheckCircle size={16} /> : 2}</div>
                        <span>Personal Info</span>
                    </div>
                    <div className="step-line"></div>
                    <div className={`step-item ${currentStep >= 3 ? 'active' : ''}`}>
                        <div className="step-circle">3</div>
                        <span>Confirmation</span>
                    </div>
                </div>

                <div className="booking-grid">
                    {/* Left Column: Forms */}
                    <div className="booking-form-area animate-fade-in">
                        {currentStep === 1 && (
                            <div className="step-content">
                                <h2>Rental Details</h2>
                                <p className="step-desc">Choose your pickup and return options.</p>

                                <div className="form-group">
                                    <label>Pickup Location</label>
                                    <div className="input-icon">
                                        <MapPin size={18} />
                                        <input
                                            type="text"
                                            name="pickupLocation"
                                            placeholder="Enter city, airport, or address"
                                            value={formData.pickupLocation}
                                            onChange={handleInputChange}
                                            className={errors.pickupLocation ? 'error-input' : ''}
                                        />
                                    </div>
                                    {errors.pickupLocation && <span className="error-msg">{errors.pickupLocation}</span>}
                                </div>

                                <div className="date-time-row">
                                    <div className="form-group half">
                                        <label>Pickup Date</label>
                                        <input
                                            type="date"
                                            name="pickupDate"
                                            value={formData.pickupDate}
                                            onChange={handleInputChange}
                                            className={errors.pickupDate ? 'error-input' : ''}
                                        />
                                        {errors.pickupDate && <span className="error-msg">{errors.pickupDate}</span>}
                                    </div>
                                    <div className="form-group half">
                                        <label>Time</label>
                                        <input
                                            type="time"
                                            name="pickupTime"
                                            value={formData.pickupTime}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>

                                <div className="date-time-row">
                                    <div className="form-group half">
                                        <label>Return Date</label>
                                        <input
                                            type="date"
                                            name="returnDate"
                                            value={formData.returnDate}
                                            onChange={handleInputChange}
                                            className={errors.returnDate ? 'error-input' : ''}
                                        />
                                        {errors.returnDate && <span className="error-msg">{errors.returnDate}</span>}
                                    </div>
                                    <div className="form-group half">
                                        <label>Time</label>
                                        <input
                                            type="time"
                                            name="returnTime"
                                            value={formData.returnTime}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {currentStep === 2 && (
                            <div className="step-content">
                                <h2>Personal Information</h2>
                                <p className="step-desc">We need a few details to confirm your booking.</p>

                                <div className="form-group">
                                    <label>Full Name</label>
                                    <div className="input-icon">
                                        <User size={18} />
                                        <input
                                            type="text"
                                            name="fullName"
                                            placeholder="John Doe"
                                            value={formData.fullName}
                                            onChange={handleInputChange}
                                            className={errors.fullName ? 'error-input' : ''}
                                        />
                                    </div>
                                    {errors.fullName && <span className="error-msg">{errors.fullName}</span>}
                                </div>

                                <div className="row-group">
                                    <div className="form-group half">
                                        <label>NIC Number</label>
                                        <input
                                            type="text"
                                            name="nic"
                                            placeholder="e.g 981234567V"
                                            value={formData.nic}
                                            onChange={handleInputChange}
                                            className={errors.nic ? 'error-input' : ''}
                                        />
                                        {errors.nic && <span className="error-msg">{errors.nic}</span>}
                                    </div>
                                    <div className="form-group half">
                                        <label>Phone Number</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            placeholder="0771234567"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className={errors.phone ? 'error-input' : ''}
                                        />
                                        {errors.phone && <span className="error-msg">{errors.phone}</span>}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="john@example.com"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className={errors.email ? 'error-input' : ''}
                                    />
                                    {errors.email && <span className="error-msg">{errors.email}</span>}
                                </div>

                                <div className="form-group">
                                    <label>Address</label>
                                    <input
                                        type="text"
                                        name="address"
                                        placeholder="Full Address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        className={errors.address ? 'error-input' : ''}
                                    />
                                    {errors.address && <span className="error-msg">{errors.address}</span>}
                                </div>
                            </div>
                        )}

                        {currentStep === 3 && (
                            <div className="step-content">
                                <h2>Review & Confirm</h2>
                                <p className="step-desc">Please review your booking details before proceeding.</p>

                                <div className="review-card">
                                    <h4>Rental Summary</h4>
                                    <div className="review-row">
                                        <span>Pickup</span>
                                        <strong>{formData.pickupLocation} <br /> {formData.pickupDate} {formData.pickupTime}</strong>
                                    </div>
                                    <div className="review-row">
                                        <span>Return</span>
                                        <strong>{formData.pickupLocation} <br /> {formData.returnDate} {formData.returnTime}</strong>
                                    </div>
                                </div>

                                <div className="review-card">
                                    <h4>Personal Details</h4>
                                    <div className="review-row">
                                        <span>Name</span>
                                        <strong>{formData.fullName}</strong>
                                    </div>
                                    <div className="review-row">
                                        <span>Email</span>
                                        <strong>{formData.email}</strong>
                                    </div>
                                    <div className="review-row">
                                        <span>Phone</span>
                                        <strong>{formData.phone}</strong>
                                    </div>
                                </div>

                                <div className="payment-note">
                                    <ShieldCheck size={20} className="shield-green" />
                                    <p>Your booking is secure. Payment will be collected at pickup.</p>
                                </div>
                            </div>
                        )}

                        <div className="form-actions">
                            {currentStep > 1 && (
                                <button className="btn btn-outline" onClick={handleBack}>
                                    Back
                                </button>
                            )}

                            {currentStep < 3 ? (
                                <button className="btn btn-primary next-btn" onClick={handleNext}>
                                    Next Step
                                </button>
                            ) : (
                                <button className="btn btn-primary confirm-btn" onClick={handleConfirm}>
                                    Confirm Booking
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Summary */}
                    <div className="booking-summary-sidebar">
                        <div className="summary-card">
                            <h3>Booking Summary</h3>
                            <div className="vehicle-mini-preview">
                                <img src={vehicle.image} alt={vehicle.name} />
                                <div>
                                    <h4>{vehicle.name}</h4>
                                    <span className="badge">{vehicle.type}</span>
                                </div>
                            </div>

                            <div className="price-details">
                                <div className="detail-row">
                                    <span>Rate</span>
                                    <span>₹{pricePerDay} / day</span>
                                </div>
                                <div className="detail-row">
                                    <span>Duration</span>
                                    <span>{days} Days</span>
                                </div>
                                <div className="detail-row">
                                    <span>Tax & Fees</span>
                                    <span>₹{tax}</span>
                                </div>
                                <div className="detail-row">
                                    <span>Insurance</span>
                                    <span>₹{insurance}</span>
                                </div>
                                <div className="divider"></div>
                                <div className="detail-row total">
                                    <span>Total Price</span>
                                    <span>₹{grandTotal}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default BookingPage;
