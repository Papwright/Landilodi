import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaHome, FaMapMarkerAlt, FaWifi, FaBolt, FaTint, FaShieldAlt, 
  FaParking, FaUtensils, FaSnowflake, FaTv, FaDumbbell, FaSwimmingPool,
  FaUser, FaSignInAlt, FaUserPlus, FaSearch, FaStar, FaCheckCircle,
  FaPhone, FaEnvelope, FaUniversity, FaBed, FaUsers, FaBuilding,
  FaArrowLeft, FaHeart, FaMoneyBillWave, FaCreditCard,
  FaMobileAlt, FaCalendarAlt, FaBook, FaChevronRight
} from 'react-icons/fa';
import './App.css';

const API_URL = 'http://localhost:5000/api';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [accommodations, setAccommodations] = useState([]);
  const [filteredAccommodations, setFilteredAccommodations] = useState([]);
  const [selectedAccommodation, setSelectedAccommodation] = useState(null);
  const [user, setUser] = useState(null);
  const [filters, setFilters] = useState({
    location: '',
    minPrice: '',
    maxPrice: '',
    roomType: '',
    amenities: ''
  });
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchAccommodations();
  }, []);

  const fetchAccommodations = async () => {
    try {
      const response = await fetch(`${API_URL}/accommodations`);
      const data = await response.json();
      setAccommodations(data);
      setFilteredAccommodations(data);
    } catch (error) {
      console.error('Error fetching accommodations:', error);
    }
  };

  const handleSearch = () => {
    let filtered = accommodations;

    if (filters.location) {
      filtered = filtered.filter(acc =>
        acc.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.minPrice) {
      filtered = filtered.filter(acc => acc.price >= parseInt(filters.minPrice));
    }

    if (filters.maxPrice) {
      filtered = filtered.filter(acc => acc.price <= parseInt(filters.maxPrice));
    }

    if (filters.roomType) {
      filtered = filtered.filter(acc =>
        acc.roomType.toLowerCase() === filters.roomType.toLowerCase()
      );
    }

    setFilteredAccommodations(filtered);
  };

  const handleViewDetails = (accommodation) => {
    setSelectedAccommodation(accommodation);
    setCurrentPage('details');
  };

  const handleBooking = (accommodation) => {
    setSelectedAccommodation(accommodation);
    setCurrentPage('booking');
  };

  const toggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
  };

  return (
    <div className="App">
      <Header 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        user={user} 
        setUser={setUser} 
      />
      
      <AnimatePresence mode="wait">
        {currentPage === 'home' && (
          <HomePage
            key="home"
            accommodations={filteredAccommodations}
            filters={filters}
            setFilters={setFilters}
            handleSearch={handleSearch}
            handleViewDetails={handleViewDetails}
            handleBooking={handleBooking}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
          />
        )}
        
        {currentPage === 'details' && selectedAccommodation && (
          <DetailsPage
            key="details"
            accommodation={selectedAccommodation}
            handleBooking={handleBooking}
            setCurrentPage={setCurrentPage}
            isFavorite={favorites.includes(selectedAccommodation.id)}
            toggleFavorite={toggleFavorite}
          />
        )}
        
        {currentPage === 'booking' && selectedAccommodation && (
          <BookingPage
            key="booking"
            accommodation={selectedAccommodation}
            setCurrentPage={setCurrentPage}
          />
        )}
        
        {currentPage === 'login' && (
          <LoginPage 
            key="login"
            setUser={setUser} 
            setCurrentPage={setCurrentPage} 
          />
        )}
        
        {currentPage === 'register' && (
          <RegisterPage 
            key="register"
            setCurrentPage={setCurrentPage} 
          />
        )}
      </AnimatePresence>
      
      <Footer />
    </div>
  );
}

// Animation variants
const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 }
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut"
    }
  }),
  hover: {
    y: -10,
    scale: 1.02,
    boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
    transition: { duration: 0.3 }
  }
};

// Header Component
function Header({ currentPage, setCurrentPage, user, setUser }) {
  return (
    <motion.header 
      className="header"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="header-content">
        <motion.div 
          className="logo" 
          onClick={() => setCurrentPage('home')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaHome className="logo-icon" />
          <span>Blantyre Student Hostels</span>
        </motion.div>
        
        <nav className="nav">
          <motion.button 
            onClick={() => setCurrentPage('home')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={currentPage === 'home' ? 'active' : ''}
          >
            <FaHome /> Home
          </motion.button>
          
          {!user ? (
            <>
              <motion.button 
                onClick={() => setCurrentPage('login')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaSignInAlt /> Login
              </motion.button>
              <motion.button 
                onClick={() => setCurrentPage('register')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary"
              >
                <FaUserPlus /> Register
              </motion.button>
            </>
          ) : (
            <div className="user-info">
              <FaUser className="user-icon" />
              <span>Welcome, {user.name}!</span>
              <motion.button 
                onClick={() => setUser(null)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Logout
              </motion.button>
            </div>
          )}
        </nav>
      </div>
    </motion.header>
  );
}

// HomePage Component
function HomePage({ accommodations, filters, setFilters, handleSearch, handleViewDetails, handleBooking, favorites, toggleFavorite }) {
  return (
    <motion.div 
      className="home-page"
      {...pageTransition}
    >
      {/* Hero Section with 3D effect */}
      <section className="hero">
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Find Your Perfect Student Accommodation
          </motion.h1>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Book quality hostels & rooms near MUST, Poly, MUBAS & COM with ease
          </motion.p>
          
          <motion.div 
            className="hero-stats"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <div className="stat-card">
              <FaBuilding className="stat-icon" />
              <h3>{accommodations.length}+</h3>
              <p>Properties</p>
            </div>
            <div className="stat-card">
              <FaMapMarkerAlt className="stat-icon" />
              <h3>8+</h3>
              <p>Locations</p>
            </div>
            <div className="stat-card">
              <FaUsers className="stat-icon" />
              <h3>500+</h3>
              <p>Happy Students</p>
            </div>
          </motion.div>
        </motion.div>
        
        <div className="hero-background"></div>
      </section>

      {/* Search Section */}
      <motion.section 
        className="search-section"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <div className="search-container">
          <h3><FaSearch /> Search & Filter</h3>
          <div className="search-filters">
            <motion.div 
              className="filter-input"
              whileFocus={{ scale: 1.02 }}
            >
              <FaMapMarkerAlt className="input-icon" />
              <input
                type="text"
                placeholder="Location (e.g., Naperi, Chichiri)"
                value={filters.location}
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
              />
            </motion.div>
            
            <motion.div 
              className="filter-input"
              whileFocus={{ scale: 1.02 }}
            >
              <FaBed className="input-icon" />
              <select
                value={filters.roomType}
                onChange={(e) => setFilters({ ...filters, roomType: e.target.value })}
              >
                <option value="">All Room Types</option>
                <option value="single">Single</option>
                <option value="shared">Shared</option>
                <option value="self-contained">Self-Contained</option>
                <option value="apartment">Apartment</option>
              </select>
            </motion.div>
            
            <motion.div 
              className="filter-input"
              whileFocus={{ scale: 1.02 }}
            >
              <FaMoneyBillWave className="input-icon" />
              <input
                type="number"
                placeholder="Min Price (MK)"
                value={filters.minPrice}
                onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
              />
            </motion.div>
            
            <motion.div 
              className="filter-input"
              whileFocus={{ scale: 1.02 }}
            >
              <FaMoneyBillWave className="input-icon" />
              <input
                type="number"
                placeholder="Max Price (MK)"
                value={filters.maxPrice}
                onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
              />
            </motion.div>
            
            <motion.button 
              className="search-btn"
              onClick={handleSearch}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaSearch /> Search
            </motion.button>
          </div>
        </div>
      </motion.section>

      {/* Listings Section */}
      <section className="listings">
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Available Accommodations ({accommodations.length})
        </motion.h3>
        <div className="accommodation-grid">
          {accommodations.map((acc, index) => (
            <AccommodationCard
              key={acc.id}
              accommodation={acc}
              index={index}
              handleViewDetails={handleViewDetails}
              handleBooking={handleBooking}
              isFavorite={favorites.includes(acc.id)}
              toggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      </section>
    </motion.div>
  );
}

// AccommodationCard Component with 3D effects
function AccommodationCard({ accommodation, index, handleViewDetails, handleBooking, isFavorite, toggleFavorite }) {
  const amenityIcons = {
    'WiFi': <FaWifi />,
    'Electricity': <FaBolt />,
    'Water': <FaTint />,
    'Security': <FaShieldAlt />,
    'Parking': <FaParking />,
    'Kitchen': <FaUtensils />,
    'Full Kitchen': <FaUtensils />,
    'Air Conditioning': <FaSnowflake />,
    'DSTV': <FaTv />,
    'Gym Access': <FaDumbbell />,
    'Swimming Pool': <FaSwimmingPool />
  };

  return (
    <motion.div 
      className="accommodation-card"
      custom={index}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      variants={cardVariants}
    >
      <div className="card-image-container">
        <img src={accommodation.images[0]} alt={accommodation.title} />
        {accommodation.verified && (
          <motion.div 
            className="verified-badge"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <FaCheckCircle /> Verified
          </motion.div>
        )}
        <motion.button 
          className={`favorite-btn ${isFavorite ? 'active' : ''}`}
          onClick={() => toggleFavorite(accommodation.id)}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaHeart />
        </motion.button>
      </div>
      
      <div className="card-content">
        <h4>{accommodation.title}</h4>
        <p className="location">
          <FaMapMarkerAlt /> {accommodation.location}
        </p>
        
        <div className="rating">
          <FaStar className="star-icon" />
          <span>{accommodation.rating}</span>
          <span className="reviews">({accommodation.reviews} reviews)</span>
        </div>
        
        <p className="price">
          <FaMoneyBillWave /> MK {accommodation.price.toLocaleString()} / month
        </p>
        
        <p className="room-type">
          <FaBed /> {accommodation.roomType}
        </p>
        
        <div className="amenities">
          {accommodation.amenities.slice(0, 4).map((amenity, idx) => (
            <motion.span 
              key={idx} 
              className="amenity-tag"
              whileHover={{ scale: 1.1 }}
            >
              {amenityIcons[amenity] || <FaCheckCircle />} {amenity}
            </motion.span>
          ))}
        </div>
        
        <p className="distance">
          <FaUniversity /> {accommodation.distanceToMUST} to MUST
        </p>
        
        <div className="card-actions">
          <motion.button 
            className="btn-secondary"
            onClick={() => handleViewDetails(accommodation)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Details <FaChevronRight />
          </motion.button>
          <motion.button 
            className="btn-primary"
            onClick={() => handleBooking(accommodation)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaBook /> Book Now
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

// DetailsPage Component
function DetailsPage({ accommodation, handleBooking, setCurrentPage, isFavorite, toggleFavorite }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const amenityIcons = {
    'WiFi': <FaWifi />,
    'Electricity': <FaBolt />,
    'Water': <FaTint />,
    'Security': <FaShieldAlt />,
    'Parking': <FaParking />,
    'Kitchen': <FaUtensils />,
    'Full Kitchen': <FaUtensils />,
    'Kitchenette': <FaUtensils />,
    'Air Conditioning': <FaSnowflake />,
    'DSTV': <FaTv />,
    'Gym Access': <FaDumbbell />,
    'Swimming Pool': <FaSwimmingPool />,
    'Study Desk': <FaBook />,
    'Backup Generator': <FaBolt />,
    'Shared Kitchen': <FaUtensils />,
    'Laundry': <FaTint />,
    'Study Lounge': <FaBook />,
    'Garden Access': <FaHome />
  };

  return (
    <motion.div 
      className="details-page"
      {...pageTransition}
    >
      <motion.button 
        className="back-btn"
        onClick={() => setCurrentPage('home')}
        whileHover={{ scale: 1.05, x: -5 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaArrowLeft /> Back to Listings
      </motion.button>
      
      <div className="details-content">
        <motion.div 
          className="details-images"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="main-image-container">
            <AnimatePresence mode="wait">
              <motion.img 
                key={currentImageIndex}
                src={accommodation.images[currentImageIndex]} 
                alt={accommodation.title}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            </AnimatePresence>
            <motion.button 
              className={`favorite-btn-large ${isFavorite ? 'active' : ''}`}
              onClick={() => toggleFavorite(accommodation.id)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaHeart />
            </motion.button>
          </div>
          
          <div className="image-thumbnails">
            {accommodation.images.map((img, idx) => (
              <motion.img 
                key={idx}
                src={img} 
                alt={`View ${idx + 1}`}
                className={currentImageIndex === idx ? 'active' : ''}
                onClick={() => setCurrentImageIndex(idx)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </motion.div>
        
        <motion.div 
          className="details-info"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="details-header">
            <h2>{accommodation.title}</h2>
            {accommodation.verified && (
              <span className="verified-badge-large">
                <FaCheckCircle /> Verified Property
              </span>
            )}
          </div>
          
          <p className="location-large">
            <FaMapMarkerAlt /> {accommodation.location}
          </p>
          
          <div className="rating-large">
            <FaStar className="star-icon" />
            <span>{accommodation.rating}</span>
            <span className="reviews">({accommodation.reviews} reviews)</span>
          </div>
          
          <motion.p 
            className="price-large"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            MK {accommodation.price.toLocaleString()} <span>/ month</span>
          </motion.p>
          
          <div className="info-section">
            <h3>Description</h3>
            <p>{accommodation.description}</p>
          </div>
          
          <div className="info-section">
            <h3><FaBed /> Room Details</h3>
            <div className="details-grid">
              <div className="detail-item">
                <strong>Type:</strong> {accommodation.roomType}
              </div>
              <div className="detail-item">
                <strong>MUST:</strong> {accommodation.distanceToMUST}
              </div>
              <div className="detail-item">
                <strong>Poly:</strong> {accommodation.distanceToPoly}
              </div>
              <div className="detail-item">
                <strong>COM:</strong> {accommodation.distanceToCOM}
              </div>
            </div>
          </div>
          
          <div className="info-section">
            <h3><FaCheckCircle /> Amenities</h3>
            <div className="amenities-list">
              {accommodation.amenities.map((amenity, idx) => (
                <motion.span 
                  key={idx} 
                  className="amenity-badge"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ scale: 1.1 }}
                >
                  {amenityIcons[amenity] || <FaCheckCircle />} {amenity}
                </motion.span>
              ))}
            </div>
          </div>
          
          <div className="info-section">
            <h3><FaUser /> Landlord Contact</h3>
            <div className="contact-info">
              <p><strong>Name:</strong> {accommodation.landlordName}</p>
              <p><FaPhone /> {accommodation.landlordPhone}</p>
              <p><FaEnvelope /> {accommodation.landlordEmail}</p>
            </div>
          </div>
          
          <motion.button 
            className="btn-primary btn-large"
            onClick={() => handleBooking(accommodation)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaBook /> Book This Room
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}

// BookingPage Component
function BookingPage({ accommodation, setCurrentPage }) {
  const [formData, setFormData] = useState({
    studentName: '',
    studentEmail: '',
    studentPhone: '',
    universityId: '',
    checkInDate: '',
    checkOutDate: '',
    paymentMethod: 'airtel'
  });
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Create booking
      const bookingResponse = await fetch(`${API_URL}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          accommodationId: accommodation.id,
          ...formData
        })
      });
      
      const bookingData = await bookingResponse.json();
      
      // Simulate payment
      const paymentResponse = await fetch(`${API_URL}/payments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingId: bookingData.booking.id,
          paymentMethod: formData.paymentMethod,
          phoneNumber: formData.studentPhone,
          amount: accommodation.price
        })
      });
      
      const paymentData = await paymentResponse.json();
      
      setBookingDetails(paymentData);
      setBookingConfirmed(true);
    } catch (error) {
      console.error('Booking error:', error);
      alert('Booking failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (bookingConfirmed) {
    return (
      <motion.div 
        className="booking-confirmation"
        {...pageTransition}
      >
        <motion.div 
          className="confirmation-card"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="success-icon"
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <FaCheckCircle />
          </motion.div>
          <h2>Booking Confirmed!</h2>
          <p>Your accommodation has been successfully booked.</p>
          
          <div className="booking-info">
            <h3>Booking Details</h3>
            <div className="info-row">
              <strong>Accommodation:</strong> {accommodation.title}
            </div>
            <div className="info-row">
              <strong>Location:</strong> {accommodation.location}
            </div>
            <div className="info-row">
              <strong>Check-in:</strong> {formData.checkInDate}
            </div>
            <div className="info-row">
              <strong>Check-out:</strong> {formData.checkOutDate}
            </div>
            <div className="info-row">
              <strong>Amount Paid:</strong> MK {accommodation.price.toLocaleString()}
            </div>
            <div className="info-row">
              <strong>Transaction ID:</strong> {bookingDetails.payment.transactionId}
            </div>
          </div>
          
          <motion.div 
            className="confirmation-messages"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="confirmation-message">
              <FaEnvelope /> A confirmation email has been sent to {formData.studentEmail}
            </p>
            <p className="confirmation-message">
              <FaMobileAlt /> SMS confirmation sent to {formData.studentPhone}
            </p>
          </motion.div>
          
          <motion.button 
            className="btn-primary btn-large"
            onClick={() => setCurrentPage('home')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaHome /> Back to Home
          </motion.button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="booking-page"
      {...pageTransition}
    >
      <motion.button 
        className="back-btn"
        onClick={() => setCurrentPage('details')}
        whileHover={{ scale: 1.05, x: -5 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaArrowLeft /> Back
      </motion.button>
      
      <div className="booking-container">
        <motion.div 
          className="booking-summary"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3>Booking Summary</h3>
          <img src={accommodation.images[0]} alt={accommodation.title} />
          <h4>{accommodation.title}</h4>
          <p><FaMapMarkerAlt /> {accommodation.location}</p>
          <p className="room-type"><FaBed /> {accommodation.roomType}</p>
          <div className="price-breakdown">
            <div className="price-row">
              <span>Monthly Rent:</span>
              <span>MK {accommodation.price.toLocaleString()}</span>
            </div>
            <div className="price-row total">
              <strong>Total:</strong>
              <strong>MK {accommodation.price.toLocaleString()}</strong>
            </div>
          </div>
        </motion.div>
        
        <motion.form 
          className="booking-form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3><FaUser /> Student Information</h3>
          
          <div className="form-group">
            <label><FaUser /> Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={formData.studentName}
              onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
              required
            />
          </div>
          
          <div className="form-group">
            <label><FaEnvelope /> Email Address</label>
            <input
              type="email"
              placeholder="your.email@example.com"
              value={formData.studentEmail}
              onChange={(e) => setFormData({ ...formData, studentEmail: e.target.value })}
              required
            />
          </div>
          
          <div className="form-group">
            <label><FaPhone /> Phone Number</label>
            <input
              type="tel"
              placeholder="+265 888 123 456"
              value={formData.studentPhone}
              onChange={(e) => setFormData({ ...formData, studentPhone: e.target.value })}
              required
            />
          </div>
          
          <div className="form-group">
            <label><FaUniversity /> University ID</label>
            <input
              type="text"
              placeholder="e.g., MUST/2023/001"
              value={formData.universityId}
              onChange={(e) => setFormData({ ...formData, universityId: e.target.value })}
              required
            />
          </div>
          
          <h3><FaCalendarAlt /> Booking Period</h3>
          
          <div className="form-group">
            <label><FaCalendarAlt /> Check-in Date</label>
            <input
              type="date"
              value={formData.checkInDate}
              onChange={(e) => setFormData({ ...formData, checkInDate: e.target.value })}
              required
            />
          </div>
          
          <div className="form-group">
            <label><FaCalendarAlt /> Check-out Date</label>
            <input
              type="date"
              value={formData.checkOutDate}
              onChange={(e) => setFormData({ ...formData, checkOutDate: e.target.value })}
              required
            />
          </div>
          
          <h3><FaCreditCard /> Payment Method</h3>
          
          <div className="payment-methods">
            <label className={`payment-option ${formData.paymentMethod === 'airtel' ? 'selected' : ''}`}>
              <input
                type="radio"
                name="payment"
                value="airtel"
                checked={formData.paymentMethod === 'airtel'}
                onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
              />
              <div className="payment-info">
                <FaMobileAlt className="payment-icon" />
                <span>Airtel Money</span>
              </div>
            </label>
            
            <label className={`payment-option ${formData.paymentMethod === 'tnm' ? 'selected' : ''}`}>
              <input
                type="radio"
                name="payment"
                value="tnm"
                checked={formData.paymentMethod === 'tnm'}
                onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
              />
              <div className="payment-info">
                <FaMobileAlt className="payment-icon" />
                <span>TNM Mpamba</span>
              </div>
            </label>
            
            <label className={`payment-option ${formData.paymentMethod === 'card' ? 'selected' : ''}`}>
              <input
                type="radio"
                name="payment"
                value="card"
                checked={formData.paymentMethod === 'card'}
                onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
              />
              <div className="payment-info">
                <FaCreditCard className="payment-icon" />
                <span>Visa/Mastercard</span>
              </div>
            </label>
          </div>
          
          <motion.button 
            type="submit" 
            className="btn-primary btn-large"
            disabled={isLoading}
            whileHover={{ scale: isLoading ? 1 : 1.05 }}
            whileTap={{ scale: isLoading ? 1 : 0.95 }}
          >
            {isLoading ? (
              'Processing...'
            ) : (
              <>
                <FaMoneyBillWave /> Pay MK {accommodation.price.toLocaleString()} & Confirm Booking
              </>
            )}
          </motion.button>
        </motion.form>
      </div>
    </motion.div>
  );
}

// LoginPage Component
function LoginPage({ setUser, setCurrentPage }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch(`${API_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setUser(data.user);
        setCurrentPage('home');
      } else {
        alert(data.error || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      className="auth-page"
      {...pageTransition}
    >
      <motion.form 
        className="auth-form"
        onSubmit={handleLogin}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="auth-icon"
          initial={{ scale: 0 }}
          animate={{ scale: 1, rotate: 360 }}
          transition={{ duration: 0.6 }}
        >
          <FaSignInAlt />
        </motion.div>
        
        <h2>Student Login</h2>
        <p>Welcome back! Please login to your account.</p>
        
        <div className="form-group">
          <label><FaEnvelope /> Email</label>
          <input
            type="email"
            placeholder="your.email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label>🔒 Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <motion.button 
          type="submit" 
          className="btn-primary btn-large"
          disabled={isLoading}
          whileHover={{ scale: isLoading ? 1 : 1.05 }}
          whileTap={{ scale: isLoading ? 1 : 0.95 }}
        >
          {isLoading ? 'Logging in...' : <><FaSignInAlt /> Login</>}
        </motion.button>
        
        <p className="auth-switch">
          Don't have an account?{' '}
          <motion.span 
            className="link" 
            onClick={() => setCurrentPage('register')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Register here
          </motion.span>
        </p>
      </motion.form>
    </motion.div>
  );
}

// RegisterPage Component
function RegisterPage({ setCurrentPage }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    userType: 'student'
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch(`${API_URL}/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        alert('Registration successful! Please login.');
        setCurrentPage('login');
      } else {
        alert(data.error || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      className="auth-page"
      {...pageTransition}
    >
      <motion.form 
        className="auth-form"
        onSubmit={handleRegister}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="auth-icon"
          initial={{ scale: 0 }}
          animate={{ scale: 1, rotate: 360 }}
          transition={{ duration: 0.6 }}
        >
          <FaUserPlus />
        </motion.div>
        
        <h2>Create Account</h2>
        <p>Join us today! Register to book your accommodation.</p>
        
        <div className="form-group">
          <label><FaUser /> Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        
        <div className="form-group">
          <label><FaEnvelope /> Email</label>
          <input
            type="email"
            placeholder="your.email@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
        
        <div className="form-group">
          <label><FaPhone /> Phone Number</label>
          <input
            type="tel"
            placeholder="+265 888 123 456"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
          />
        </div>
        
        <div className="form-group">
          <label>🔒 Password</label>
          <input
            type="password"
            placeholder="Create a strong password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
        </div>
        
        <div className="form-group">
          <label><FaUsers /> I am a...</label>
          <select
            value={formData.userType}
            onChange={(e) => setFormData({ ...formData, userType: e.target.value })}
          >
            <option value="student">Student</option>
            <option value="landlord">Landlord/Property Owner</option>
          </select>
        </div>
        
        <motion.button 
          type="submit" 
          className="btn-primary btn-large"
          disabled={isLoading}
          whileHover={{ scale: isLoading ? 1 : 1.05 }}
          whileTap={{ scale: isLoading ? 1 : 0.95 }}
        >
          {isLoading ? 'Creating Account...' : <><FaUserPlus /> Register</>}
        </motion.button>
        
        <p className="auth-switch">
          Already have an account?{' '}
          <motion.span 
            className="link" 
            onClick={() => setCurrentPage('login')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Login here
          </motion.span>
        </p>
      </motion.form>
    </motion.div>
  );
}

// Footer Component
function Footer() {
  return (
    <motion.footer 
      className="footer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 0.6 }}
    >
      <div className="footer-content">
        <div className="footer-section">
          <h4><FaHome /> Blantyre Student Hostels</h4>
          <p>Making accommodation booking easier for students across Blantyre.</p>
        </div>
        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li>About Us</li>
            <li>How It Works</li>
            <li>For Landlords</li>
            <li>FAQs</li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p><FaPhone /> +265 888 000 000</p>
          <p><FaEnvelope /> info@btyestudents.mw</p>
          <p><FaMapMarkerAlt /> Blantyre, Malawi</p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>© 2025 Blantyre Student Hostels. All rights reserved.</p>
      </div>
    </motion.footer>
  );
}

export default App;
