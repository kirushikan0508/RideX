import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, Phone, CreditCard, MapPin, AlertCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './AuthPage.css';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        nic: '',
        address: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            await register(formData);
            navigate('/dashboard');
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="auth-page">
                <div className="auth-card register">
                    <h2>Create Account</h2>
                    <p className="auth-subtitle">Join RideX today for premium rentals</p>

                    {error && <div className="auth-error"><AlertCircle size={18} /> {error}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Full Name</label>
                            <div className="input-with-icon">
                                <User size={18} />
                                <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="John Doe" />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Email Address</label>
                            <div className="input-with-icon">
                                <Mail size={18} />
                                <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="john@example.com" />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <div className="input-with-icon">
                                <Lock size={18} />
                                <input type="password" name="password" value={formData.password} onChange={handleChange} required placeholder="Min 6 characters" />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Phone Number</label>
                                <div className="input-with-icon">
                                    <Phone size={18} />
                                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="+1 234 567 890" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>NIC Number</label>
                                <div className="input-with-icon">
                                    <CreditCard size={18} />
                                    <input type="text" name="nic" value={formData.nic} onChange={handleChange} required placeholder="National ID" />
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Address</label>
                            <div className="input-with-icon">
                                <MapPin size={18} />
                                <input type="text" name="address" value={formData.address} onChange={handleChange} required placeholder="Your full address" />
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary btn-block" disabled={isLoading}>
                            {isLoading ? 'Creating Account...' : 'Sign Up'}
                        </button>
                    </form>

                    <div className="auth-footer">
                        Already have an account? <Link to="/login">Sign In</Link>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default RegisterPage;
