import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <a href="#" className="footer-logo">Ride<span className="text-primary">X</span></a>
                        <p>Premium car and bike rentals for those who value quality, comfort, and speed.</p>
                        <div className="social-links">
                            <a href="#"><Facebook size={20} /></a>
                            <a href="#"><Twitter size={20} /></a>
                            <a href="#"><Instagram size={20} /></a>
                            <a href="#"><Linkedin size={20} /></a>
                        </div>
                    </div>

                    <div className="footer-links">
                        <h3>Quick Links</h3>
                        <ul>
                            <li><a href="#home">Home</a></li>
                            <li><a href="#categories">Categories</a></li>
                            <li><a href="#featured">Fleet</a></li>
                            <li><a href="#reviews">Reviews</a></li>
                            <li><a href="/admin" style={{ color: '#ffc107' }}>Admin</a></li>
                        </ul>
                    </div>

                    <div className="footer-links">
                        <h3>Support</h3>
                        <ul>
                            <li><a href="#">Help Center</a></li>
                            <li><a href="#">Terms of Service</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">FAQs</a></li>
                        </ul>
                    </div>

                    <div className="footer-contact">
                        <h3>Contact Us</h3>
                        <ul>
                            <li><MapPin size={18} /> <span>123 Luxury Lane, Beverly Hills, CA</span></li>
                            <li><Phone size={18} /> <span>+1 (555) 123-4567</span></li>
                            <li><Mail size={18} /> <span>contact@ridex.com</span></li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; 2026 RideX Rentals. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
