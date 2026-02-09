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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
