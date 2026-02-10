import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Calendar, MapPin, User, CreditCard, ShieldCheck } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useVehicle } from '../hooks/useVehicles';
import { useAuth } from '../context/AuthContext';
import LocationPicker from '../components/LocationPicker';
import './BookingPage.css';

const BookingPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { vehicle, loading, error } = useVehicle(id);
    const { user } = useAuth();

    // Smooth scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        pickupDate: '',
        returnDate: '',
        pickupLocation: '',
        name: '',
        email: '',
        phone: '',
        nic: '',
        address: ''
    });
    const [locationData, setLocationData] = useState(null);
    // Prefill user data
    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || '',
                nic: user.nic || '',
                address: user.address || ''
            }));
        }
    }, [user]);

    const [errors, setErrors] = useState({});

    // Price State
    const [priceDetails, setPriceDetails] = useState({
        days: 0,
        total: 0,
        tax: 0,
        insurance: 1500,
        grandTotal: 0
    });

    const handleLocationSelect = (location) => {
        setLocationData(location);
        setFormData(prev => ({ ...prev, pickupLocation: location.address }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    // Calculate Price
    useEffect(() => {
        if (formData.pickupDate && formData.returnDate && vehicle) {
            const start = new Date(formData.pickupDate);
            const end = new Date(formData.returnDate);
            const diffTime = Math.abs(end - start);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays > 0) {
                const total = vehicle.price * diffDays;
                const tax = Math.round(total * 0.05);
                setPriceDetails({
                    days: diffDays,
                    total: total,
                    tax: tax,
                    insurance: 1500,
                    grandTotal: total + tax + 1500
                });
            } else {
                setPriceDetails(prev => ({ ...prev, days: 0, grandTotal: 0 }));
            }
        }
    }, [formData.pickupDate, formData.returnDate, vehicle]);

    const validateStep1 = () => {
        let newErrors = {};
        if (!formData.pickupLocation) newErrors.pickupLocation = "Pickup location is required";
        if (!formData.pickupDate) newErrors.pickupDate = "Pickup date is required";
        if (!formData.returnDate) newErrors.returnDate = "Return date is required";

        if (new Date(formData.pickupDate) > new Date(formData.returnDate)) {
            newErrors.returnDate = "Return date must be after pickup date";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep2 = () => {
        let newErrors = {};
        if (!formData.fullName) newErrors.fullName = "Full Name is required";
        if (!formData.nic) newErrors.nic = "NIC Number is required";
        if (!formData.phone) newErrors.phone = "Phone Number is required";
        if (!formData.email) newErrors.email = "Email is required";
        if (!formData.address) newErrors.address = "Address is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (currentStep === 1 && validateStep1()) {
            if (priceDetails.days <= 0) {
                alert("Please select valid dates");
                return;
            }
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

    const handleConfirm = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    vehicleId: vehicle._id,
                    pickupDate: formData.pickupDate,
                    returnDate: formData.returnDate,
                    pickupLocation: formData.pickupLocation,
                    pickupCoordinates: locationData ? { lat: locationData.lat, lng: locationData.lng } : null,
                    totalPrice: priceDetails.grandTotal
                })
            });

            const data = await response.json();

            if (response.ok) {
                alert("Booking Confirmed! You can view it in your dashboard.");
                navigate('/dashboard');
            } else {
                alert(data.message || "Booking Failed");
            }
        } catch (error) {
            console.error("Booking Error:", error);
            alert("An error occurred. Please try again.");
        }
    };

    if (loading) return <div className="text-center p-5">Loading vehicle...</div>;
    if (error) return <div className="text-center p-5 text-red">{error}</div>;
    if (!vehicle) return <div className="text-center p-5">Vehicle not found</div>;

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
                                    <LocationPicker
                                        onLocationSelect={handleLocationSelect}
                                        initialLocation={locationData}
                                    />
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
                                            min={new Date().toISOString().split('T')[0]}
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
                                            min={formData.pickupDate}
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
                                <img src={vehicle.images?.[0] || 'https://via.placeholder.com/150'} alt={vehicle.name} />
                                <div>
                                    <h4>{vehicle.name}</h4>
                                    <span className="badge">{vehicle.type}</span>
                                </div>
                            </div>

                            <div className="price-details">
                                <div className="detail-row">
                                    <span>Rate</span>
                                    <span>₹{vehicle.price} / day</span>
                                </div>
                                <div className="detail-row">
                                    <span>Duration</span>
                                    <span>{priceDetails.days} Days</span>
                                </div>
                                <div className="detail-row">
                                    <span>Tax & Fees</span>
                                    <span>₹{priceDetails.tax}</span>
                                </div>
                                <div className="detail-row">
                                    <span>Insurance</span>
                                    <span>₹{priceDetails.insurance}</span>
                                </div>
                                <div className="divider"></div>
                                <div className="detail-row total">
                                    <span>Total Price</span>
                                    <span>₹{priceDetails.grandTotal}</span>
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
