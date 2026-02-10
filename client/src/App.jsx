import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SearchForm from './components/SearchForm';
import Categories from './components/Categories';
import FeaturedVehicles from './components/FeaturedVehicles';
import WhyChooseUs from './components/WhyChooseUs';
import Reviews from './components/Reviews';
import Footer from './components/Footer';
import ListingPage from './pages/ListingPage';
import VehicleDetailsPage from './pages/VehicleDetailsPage';
import BookingPage from './pages/BookingPage';
import ChatPage from './pages/ChatPage';
import DashboardPage from './pages/DashboardPage';
import AdminPage from './pages/AdminPage';

const HomePage = () => (
  <>
    <Navbar />
    <Hero />
    <SearchForm />
    <Categories />
    <WhyChooseUs />
    <FeaturedVehicles />
    <Reviews />
    <Footer />
  </>
);

import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/vehicles" element={<ListingPage />} />
            <Route path="/vehicles/:id" element={<VehicleDetailsPage />} />

            {/* Protected Routes */}
            <Route path="/booking/:id" element={
              <ProtectedRoute>
                <BookingPage />
              </ProtectedRoute>
            } />
            <Route path="/chat" element={
              <ProtectedRoute>
                <ChatPage />
              </ProtectedRoute>
            } />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } />
            <Route path="/admin" element={
              <ProtectedRoute adminOnly={true}>
                <AdminPage />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
