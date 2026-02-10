import React, { useState, useEffect } from 'react';
import { DollarSign, Car, Users, Calendar } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import './AdminOverview.css';

const AdminOverview = () => {
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAnalytics();
    }, []);

    const fetchAnalytics = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch('/api/admin/analytics', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (res.ok) {
                const data = await res.json();
                setAnalytics(data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="admin-content"><p>Loading analytics...</p></div>;
    if (!analytics) return <div className="admin-content"><p>Failed to load analytics</p></div>;

    // Format revenue data for chart
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const chartData = analytics.revenueByMonth.map(item => ({
        month: monthNames[item._id.month - 1],
        revenue: item.revenue,
        bookings: item.count
    }));

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
                        <span className="stat-value">₹{analytics.totalRevenue.toLocaleString()}</span>
                        <span className="stat-change positive">All time</span>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon bookings">
                        <Calendar size={24} />
                    </div>
                    <div className="stat-info">
                        <span className="stat-label">Active Bookings</span>
                        <span className="stat-value">{analytics.activeBookings}</span>
                        <span className="stat-change positive">Currently active</span>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon vehicles">
                        <Car size={24} />
                    </div>
                    <div className="stat-info">
                        <span className="stat-label">Total Vehicles</span>
                        <span className="stat-value">{analytics.totalVehicles}</span>
                        <span className="stat-change neutral">In fleet</span>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon users">
                        <Users size={24} />
                    </div>
                    <div className="stat-info">
                        <span className="stat-label">Total Users</span>
                        <span className="stat-value">{analytics.totalUsers}</span>
                        <span className="stat-change positive">Registered</span>
                    </div>
                </div>
            </div>

            <div className="chart-section">
                <h3>Revenue Analytics (Last 6 Months)</h3>
                <div className="chart-container">
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="revenue" fill="#007bff" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="chart-section">
                <h3>Booking Trends</h3>
                <div className="chart-container">
                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="bookings" stroke="#28a745" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default AdminOverview;
