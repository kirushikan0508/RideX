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

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/vehicles" element={<ListingPage />} />
          <Route path="/vehicles/:id" element={<VehicleDetailsPage />} />
          <Route path="/booking/:id" element={<BookingPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
