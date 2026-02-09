import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import DashboardSidebar from '../components/DashboardSidebar';
import DashboardBookings from '../components/DashboardBookings';
import DashboardProfile from '../components/DashboardProfile';
import './DashboardPage.css';

const DashboardPage = () => {
    const [activeTab, setActiveTab] = useState('bookings');

    return (
        <div className="dashboard-page">
            <Navbar />
            <div className="dashboard-layout">
                <DashboardSidebar activeTab={activeTab} onTabChange={setActiveTab} />

                <div className="dashboard-main">
                    {activeTab === 'bookings' && <DashboardBookings />}
                    {activeTab === 'profile' && <DashboardProfile />}
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
