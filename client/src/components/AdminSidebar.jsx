import React from 'react';
import { LayoutDashboard, Car, CalendarCheck, Users, MessageSquare, LogOut, Star } from 'lucide-react';
import './AdminSidebar.css';

const AdminSidebar = ({ activeTab, onTabChange }) => {
    return (
        <div className="admin-sidebar">
            <div className="admin-header">
                <h3>RideX Admin</h3>
                <span className="admin-badge">Super Admin</span>
            </div>

            <nav className="admin-nav">
                <button
                    className={`admin-nav-item ${activeTab === 'overview' ? 'active' : ''}`}
                    onClick={() => onTabChange('overview')}
                >
                    <LayoutDashboard size={20} />
                    Overview
                </button>
                <button
                    className={`admin-nav-item ${activeTab === 'vehicles' ? 'active' : ''}`}
                    onClick={() => onTabChange('vehicles')}
                >
                    <Car size={20} />
                    Vehicles
                </button>
                <button
                    className={`admin-nav-item ${activeTab === 'bookings' ? 'active' : ''}`}
                    onClick={() => onTabChange('bookings')}
                >
                    <CalendarCheck size={20} />
                    Bookings
                </button>
                <button
                    className={`admin-nav-item ${activeTab === 'users' ? 'active' : ''}`}
                    onClick={() => onTabChange('users')}
                >
                    <Users size={20} />
                    Users
                </button>
                <button
                    className={`admin-nav-item ${activeTab === 'reviews' ? 'active' : ''}`}
                    onClick={() => onTabChange('reviews')}
                >
                    <Star size={20} />
                    Reviews
                </button>
                <button
                    className={`admin-nav-item ${activeTab === 'chat' ? 'active' : ''}`}
                    onClick={() => onTabChange('chat')}
                >
                    <MessageSquare size={20} />
                    Live Chat
                </button>
            </nav>

            <div className="admin-footer">
                <button className="admin-nav-item logout">
                    <LogOut size={20} />
                    Log Out
                </button>
            </div>
        </div>
    );
};

export default AdminSidebar;
