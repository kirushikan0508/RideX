import React from 'react';
import { DollarSign, Car, Users, Calendar } from 'lucide-react';
import './AdminOverview.css';

const AdminOverview = () => {
    return (
        <div className="admin-content">
            <div className="admin-page-header">
                <h2>Dashboard Overview</h2>
            </div>

            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon revenue">
                        <DollarSign size={24} />
                    </div>
                    <div className="stat-info">
                        <span className="stat-label">Total Revenue</span>
                        <span className="stat-value">₹1,250,500</span>
                        <span className="stat-change positive">+12% this month</span>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon bookings">
                        <Calendar size={24} />
                    </div>
                    <div className="stat-info">
                        <span className="stat-label">Active Bookings</span>
                        <span className="stat-value">24</span>
                        <span className="stat-change positive">+5 new today</span>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon vehicles">
                        <Car size={24} />
                    </div>
                    <div className="stat-info">
                        <span className="stat-label">Total Vehicles</span>
                        <span className="stat-value">48</span>
                        <span className="stat-change neutral">2 in maintenance</span>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon users">
                        <Users size={24} />
                    </div>
                    <div className="stat-info">
                        <span className="stat-label">Total Users</span>
                        <span className="stat-value">1,890</span>
                        <span className="stat-change positive">+120 this week</span>
                    </div>
                </div>
            </div>

            <div className="chart-section">
                <h3>Revenue Analytics (Last 6 Months)</h3>
                <div className="chart-container">
                    {/* Simple CSS Bar Chart Visualization */}
                    <div className="bar-chart">
                        <div className="chart-bar" style={{ height: '40%' }} data-label="Jan"></div>
                        <div className="chart-bar" style={{ height: '55%' }} data-label="Feb"></div>
                        <div className="chart-bar" style={{ height: '45%' }} data-label="Mar"></div>
                        <div className="chart-bar" style={{ height: '70%' }} data-label="Apr"></div>
                        <div className="chart-bar" style={{ height: '60%' }} data-label="May"></div>
                        <div className="chart-bar" style={{ height: '85%' }} data-label="Jun"></div>
                    </div>
                    <div className="chart-axis">
                        <span>0k</span>
                        <span>200k</span>
                        <span>400k</span>
                        <span>600k</span>
                        <span>800k</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminOverview;
