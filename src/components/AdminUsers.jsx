import React from 'react';
import './AdminVehicles.css'; // Reusing table styles

const AdminUsers = () => {
    const users = [
        { id: 1, name: "John Doe", email: "john@example.com", role: "User", status: "Active" },
        { id: 2, name: "Sarah Smith", email: "sarah@example.com", role: "Owner", status: "Active" },
        { id: 3, name: "Admin User", email: "admin@ridex.com", role: "Super Admin", status: "Active" },
    ];

    return (
        <div className="admin-content">
            <div className="admin-page-header">
                <h2>User Management</h2>
            </div>
            <div className="admin-table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td><span className="badge badge-success">{user.status}</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminUsers;
