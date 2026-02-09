import React from 'react';
import { LayoutDashboard, User, MessageSquare, LogOut, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import './DashboardSidebar.css';

const DashboardSidebar = ({ activeTab, onTabChange }) => {
    return (
        <div className="dashboard-sidebar">
            <div className="user-profile-summary">
                <img
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop"
                    alt="User Profile"
                    className="user-avatar-lg"
                />
                <h3>John Doe</h3>
                <span>Member since 2024</span>
            </div>

            <nav className="dashboard-nav">
                <button
                    className={`nav-item ${activeTab === 'bookings' ? 'active' : ''}`}
                    onClick={() => onTabChange('bookings')}
                >
                    <LayoutDashboard size={20} />
                    My Bookings
                </button>
                <button
                    className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
                    onClick={() => onTabChange('profile')}
                >
                    <User size={20} />
                    Profile Settings
                </button>
                <Link to="/chat" className="nav-item">
                    <MessageSquare size={20} />
                    Messages
                </Link>
                <button className="nav-item">
                    <Settings size={20} />
                    Settings
                </button>
            </nav>

            <div className="sidebar-footer">
                <button className="nav-item logout">
                    <LogOut size={20} />
                    Log Out
                </button>
            </div>
        </div>
    );
};

export default DashboardSidebar;
