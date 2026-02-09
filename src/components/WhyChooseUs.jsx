import React from 'react';
import { ShieldCheck, Clock, Wallet, Headphones } from 'lucide-react';
import './WhyChooseUs.css';

const features = [
    {
        icon: <Wallet size={32} />,
        title: 'Best Price Guarantee',
        desc: 'We offer the most competitive rates in the market with no hidden charges.'
    },
    {
        icon: <ShieldCheck size={32} />,
        title: 'Verified Vehicles',
        desc: 'Every vehicle undergoes a strict 40-point quality check before rental.'
    },
    {
        icon: <Clock size={32} />,
        title: 'Instant Booking',
        desc: 'Book your dream ride in less than 2 minutes with our seamless app.'
    },
    {
        icon: <Headphones size={32} />,
        title: '24/7 Support',
        desc: 'Our dedicated support team is always available to assist you on the road.'
    }
];

const WhyChooseUs = () => {
    return (
        <section className="why-us-section">
            <div className="container">
                <h2 className="section-title">Why Choose RideX?</h2>
                <p className="section-subtitle">We don't just rent vehicles; we deliver experiences.</p>

                <div className="features-grid">
                    {features.map((feature, index) => (
                        <div key={index} className="feature-card">
                            <div className="feature-icon">{feature.icon}</div>
                            <h3>{feature.title}</h3>
                            <p>{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
