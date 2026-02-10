import React, { useState } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import AdminOverview from '../components/AdminOverview';
import AdminVehicles from '../components/AdminVehicles';
import AdminBookings from '../components/AdminBookings';
import AdminUsers from '../components/AdminUsers';
import AdminReviews from '../components/AdminReviews';
import ChatPage from './ChatPage';
import './AdminPage.css';

const AdminPage = () => {
    const [activeTab, setActiveTab] = useState('overview');

    return (
        <div className="admin-page">
            <div className="admin-layout">
                <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />

                <div className="admin-main">
                    {activeTab === 'overview' && <AdminOverview />}
                    {activeTab === 'vehicles' && <AdminVehicles />}
                    {activeTab === 'bookings' && <AdminBookings />}
                    {activeTab === 'users' && <AdminUsers />}
                    {activeTab === 'reviews' && <AdminReviews />}
                    {activeTab === 'chat' && (
                        <div className="admin-content" style={{ padding: 0 }}>
                            <iframe
                                src="/chat"
                                style={{ width: '100%', height: '100%', border: 'none' }}
                                title="Live Chat"
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
