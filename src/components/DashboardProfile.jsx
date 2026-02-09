import React from 'react';
import './DashboardProfile.css';

const DashboardProfile = () => {
    return (
        <div className="dashboard-content">
            <div className="content-header">
                <h2>Profile Settings</h2>
            </div>

            <div className="profile-grid">
                <div className="profile-card">
                    <h3>Personal Information</h3>
                    <form className="profile-form">
                        <div className="form-group">
                            <label>Full Name</label>
                            <input type="text" defaultValue="John Doe" />
                        </div>
                        <div className="form-group">
                            <label>Email Address</label>
                            <input type="email" defaultValue="john@example.com" />
                        </div>
                        <div className="form-group">
                            <label>Phone Number</label>
                            <input type="tel" defaultValue="+94 77 123 4567" />
                        </div>
                        <div className="form-group">
                            <label>NIC / ID</label>
                            <input type="text" defaultValue="981234567V" disabled className="disabled-input" />
                        </div>
                        <button type="submit" className="btn btn-primary">Save Changes</button>
                    </form>
                </div>

                <div className="profile-card">
                    <h3>Address</h3>
                    <form className="profile-form">
                        <div className="form-group">
                            <label>Street Address</label>
                            <input type="text" defaultValue="123 Main St, Apt 4B" />
                        </div>
                        <div className="row-group">
                            <div className="form-group half">
                                <label>City</label>
                                <input type="text" defaultValue="Colombo" />
                            </div>
                            <div className="form-group half">
                                <label>Zip Code</label>
                                <input type="text" defaultValue="00100" />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-outline">Update Address</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default DashboardProfile;
