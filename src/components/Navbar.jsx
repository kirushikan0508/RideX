import React, { useState } from 'react';
import { Menu, X, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="logo">
          Ride<span className="text-primary">X</span>
        </Link>

        <div className="desktop-menu">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/vehicles" className="nav-link">Vehicles</Link>
          <Link to="/chat" className="nav-link">Chat</Link>
          <a href="#categories" className="nav-link">Categories</a>
          <a href="#reviews" className="nav-link">Reviews</a>
        </div>

        <div className="nav-actions">
          <Link to="/dashboard" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <User size={18} />
            <span>Dashboard</span>
          </Link>
          <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="mobile-menu">
          <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/vehicles" onClick={() => setIsOpen(false)}>Vehicles</Link>
          <a href="#categories" onClick={() => setIsOpen(false)}>Categories</a>
          <a href="#reviews" onClick={() => setIsOpen(false)}>Reviews</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
