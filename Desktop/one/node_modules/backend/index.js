const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// In-memory database (replace with MongoDB/PostgreSQL in production)
let accommodations = [
  {
    id: 1,
    title: "Luxury Self-Contained Room in Naperi",
    location: "Naperi",
    roomType: "Self-contained",
    price: 65000,
    amenities: ["WiFi", "Electricity", "Water", "Security", "Backup Generator", "Study Desk"],
    distanceToMUST: "2km",
    distanceToPoly: "3km",
    distanceToCOM: "2.5km",
    description: "Spacious self-contained room with 24/7 security, reliable WiFi, and backup power. Perfect for serious students who value comfort and privacy. Features include a modern bathroom, study desk, wardrobe, and access to a shared kitchen.",
    landlordName: "Mr. Banda",
    landlordPhone: "+265 888 123 456",
    landlordEmail: "banda@hostels.mw",
    images: [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80",
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80",
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80"
    ],
    available: true,
    rating: 4.8,
    reviews: 24,
    verified: true
  },
  {
    id: 2,
    title: "Affordable Shared Room - Chichiri",
    location: "Chichiri",
    roomType: "Shared",
    price: 35000,
    amenities: ["Electricity", "Water", "Security", "Shared Kitchen", "Laundry"],
    distanceToMUST: "1.5km",
    distanceToPoly: "2km",
    distanceToCOM: "3km",
    description: "Budget-friendly shared accommodation near MUST campus. Clean, safe, and comfortable living space perfect for students. Features include shared bathroom facilities, kitchen access, and 24/7 security. Great community atmosphere.",
    landlordName: "Mrs. Phiri",
    landlordPhone: "+265 999 234 567",
    landlordEmail: "phiri@hostels.mw",
    images: [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&q=80"
    ],
    available: true,
    rating: 4.5,
    reviews: 18,
    verified: true
  },
  {
    id: 3,
    title: "Premium Modern Apartment - Sunnyside",
    location: "Sunnyside",
    roomType: "Apartment",
    price: 120000,
    amenities: ["WiFi", "Electricity", "Water", "Security", "Parking", "Full Kitchen", "Air Conditioning", "DSTV"],
    distanceToMUST: "4km",
    distanceToPoly: "3.5km",
    distanceToCOM: "4km",
    description: "Fully furnished modern 2-bedroom apartment with premium amenities. Features a full kitchen, air conditioning, fast WiFi, and secure parking. Perfect for students who want a high-quality living experience. Located in a quiet, upscale neighborhood.",
    landlordName: "Mr. Nyirenda",
    landlordPhone: "+265 888 345 678",
    landlordEmail: "nyirenda@hostels.mw",
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
      "https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=800&q=80",
      "https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=800&q=80"
    ],
    available: true,
    rating: 4.9,
    reviews: 31,
    verified: true
  },
  {
    id: 4,
    title: "Cozy Single Room - Namiwawa",
    location: "Namiwawa",
    roomType: "Single",
    price: 45000,
    amenities: ["Electricity", "Water", "Security", "Shared Bathroom", "Study Area"],
    distanceToMUST: "3km",
    distanceToPoly: "4km",
    distanceToCOM: "3.5km",
    description: "Clean and comfortable single room in a safe, family-friendly area. Close to shops, restaurants, and public transport. Features include a comfortable bed, study desk, wardrobe, and access to shared facilities. Great for focused students.",
    landlordName: "Ms. Mwale",
    landlordPhone: "+265 999 456 789",
    landlordEmail: "mwale@hostels.mw",
    images: [
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80"
    ],
    available: true,
    rating: 4.6,
    reviews: 15,
    verified: true
  },
  {
    id: 5,
    title: "Student Studio - Ginnery Corner",
    location: "Ginnery Corner",
    roomType: "Self-contained",
    price: 55000,
    amenities: ["WiFi", "Electricity", "Water", "Security", "Kitchenette"],
    distanceToMUST: "2.5km",
    distanceToPoly: "2km",
    distanceToCOM: "3km",
    description: "Compact yet comfortable studio perfect for independent students. Features a private bathroom, small kitchenette, study area, and fast WiFi. Walking distance to major campuses and shopping centers.",
    landlordName: "Mr. Kamwendo",
    landlordPhone: "+265 888 567 890",
    landlordEmail: "kamwendo@hostels.mw",
    images: [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80"
    ],
    available: true,
    rating: 4.7,
    reviews: 20,
    verified: true
  },
  {
    id: 6,
    title: "Spacious Room with Garden View - Zingwangwa",
    location: "Zingwangwa",
    roomType: "Single",
    price: 50000,
    amenities: ["Electricity", "Water", "Security", "Garden Access", "Parking"],
    distanceToMUST: "5km",
    distanceToPoly: "5.5km",
    distanceToCOM: "5km",
    description: "Peaceful single room with beautiful garden views. Ideal for students who enjoy nature and tranquility. The property features secure parking, 24/7 security, and easy access to public transport.",
    landlordName: "Mrs. Jere",
    landlordPhone: "+265 999 678 901",
    landlordEmail: "jere@hostels.mw",
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&q=80"
    ],
    available: true,
    rating: 4.4,
    reviews: 12,
    verified: false
  },
  {
    id: 7,
    title: "Executive Twin Room - Chirimba",
    location: "Chirimba",
    roomType: "Shared",
    price: 40000,
    amenities: ["WiFi", "Electricity", "Water", "Security", "Study Lounge"],
    distanceToMUST: "3.5km",
    distanceToPoly: "3km",
    distanceToCOM: "4km",
    description: "Well-maintained twin-sharing room with modern amenities. Perfect for two friends studying together. Features include a shared study lounge, fast WiFi, and proximity to campus shuttle routes.",
    landlordName: "Mr. Msiska",
    landlordPhone: "+265 888 789 012",
    landlordEmail: "msiska@hostels.mw",
    images: [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80",
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80"
    ],
    available: true,
    rating: 4.5,
    reviews: 16,
    verified: true
  },
  {
    id: 8,
    title: "Deluxe Apartment Suite - Kabula Hill",
    location: "Kabula Hill",
    roomType: "Apartment",
    price: 150000,
    amenities: ["WiFi", "Electricity", "Water", "Security", "Parking", "Full Kitchen", "Air Conditioning", "DSTV", "Gym Access", "Swimming Pool"],
    distanceToMUST: "6km",
    distanceToPoly: "5.5km",
    distanceToCOM: "6km",
    description: "Premium apartment suite with breathtaking views of Blantyre. Features include 3 bedrooms, a fully equipped kitchen, modern appliances, gym access, and swimming pool. Perfect for postgraduate students or groups who want luxury living.",
    landlordName: "Dr. Gondwe",
    landlordPhone: "+265 999 890 123",
    landlordEmail: "gondwe@hostels.mw",
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
      "https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=800&q=80",
      "https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=800&q=80"
    ],
    available: true,
    rating: 5.0,
    reviews: 8,
    verified: true
  },
  {
    id: 9,
    title: "Budget Hostel Dorm - Limbe",
    location: "Limbe",
    roomType: "Shared",
    price: 28000,
    amenities: ["Electricity", "Water", "Security", "Shared Kitchen", "Laundry"],
    distanceToMUST: "7km",
    distanceToPoly: "6km",
    distanceToCOM: "7.5km",
    description: "Economical 6-bed dorm ideal for first year students looking to save costs. Clean bunks, lockers provided, supervised security, and communal cooking area.",
    landlordName: "Hostel Admin",
    landlordPhone: "+265 888 901 234",
    landlordEmail: "limbehostel@hostels.mw",
    images: [
      "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&q=80",
      "https://images.unsplash.com/photo-1595878715977-2e8e1e95d8f8?w=800&q=80"
    ],
    available: true,
    rating: 4.1,
    reviews: 34,
    verified: false
  },
  {
    id: 10,
    title: "Modern Studio Loft - Mandala",
    location: "Mandala",
    roomType: "Self-contained",
    price: 75000,
    amenities: ["WiFi", "Electricity", "Water", "Security", "Kitchenette", "Study Desk"],
    distanceToMUST: "4.5km",
    distanceToPoly: "3.5km",
    distanceToCOM: "4km",
    description: "Stylish loft-style studio with high ceiling, natural light, and private kitchenette. Perfect balance of comfort and productivity.",
    landlordName: "Ms. Chirwa",
    landlordPhone: "+265 999 112 233",
    landlordEmail: "chirwa@hostels.mw",
    images: [
      "https://images.unsplash.com/photo-1600566752359-35792bedcfea?w=800&q=80",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&q=80"
    ],
    available: true,
    rating: 4.7,
    reviews: 27,
    verified: true
  },
  {
    id: 11,
    title: "Executive Ensuite Room - Nyambadwe",
    location: "Nyambadwe",
    roomType: "Self-contained",
    price: 90000,
    amenities: ["WiFi", "Electricity", "Water", "Security", "Parking", "Backup Generator", "Air Conditioning"],
    distanceToMUST: "5km",
    distanceToPoly: "4.5km",
    distanceToCOM: "5km",
    description: "Fully serviced ensuite room in a quiet residential compound. Includes weekly cleaning and secure gated access.",
    landlordName: "Mr. Bello",
    landlordPhone: "+265 888 556 778",
    landlordEmail: "bello@hostels.mw",
    images: [
      "https://images.unsplash.com/photo-1615873968403-89e068629265?w=800&q=80",
      "https://images.unsplash.com/photo-1631048498407-1c047d3f5a12?w=800&q=80"
    ],
    available: true,
    rating: 4.9,
    reviews: 19,
    verified: true
  },
  {
    id: 12,
    title: "Two-Bed Shared Suite - Manje",
    location: "Manje",
    roomType: "Shared",
    price: 42000,
    amenities: ["Electricity", "Water", "Security", "Study Lounge", "Shared Kitchen"],
    distanceToMUST: "6km",
    distanceToPoly: "5km",
    distanceToCOM: "6.5km",
    description: "Well-ventilated twin suite with large windows and shared study lounge. Ideal for friends or study partners.",
    landlordName: "Ms. Kandoje",
    landlordPhone: "+265 999 334 221",
    landlordEmail: "kandoje@hostels.mw",
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80",
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80"
    ],
    available: true,
    rating: 4.3,
    reviews: 14,
    verified: false
  },
  {
    id: 13,
    title: "Compact Single Room - Mbayani",
    location: "Mbayani",
    roomType: "Single",
    price: 30000,
    amenities: ["Electricity", "Water", "Security", "Shared Bathroom"],
    distanceToMUST: "7.5km",
    distanceToPoly: "6.5km",
    distanceToCOM: "8km",
    description: "Affordable single room with basic essentials. Suitable for a student seeking a quiet personal space at low cost.",
    landlordName: "Mr. Tembo",
    landlordPhone: "+265 888 667 778",
    landlordEmail: "tembo@hostels.mw",
    images: [
      "https://images.unsplash.com/photo-1522156373667-4c7234bbd804?w=800&q=80",
      "https://images.unsplash.com/photo-1586105251261-72a756497a12?w=800&q=80"
    ],
    available: true,
    rating: 4.0,
    reviews: 22,
    verified: false
  },
  {
    id: 14,
    title: "Garden Cottage - Machinjiri",
    location: "Machinjiri",
    roomType: "Self-contained",
    price: 52000,
    amenities: ["WiFi", "Electricity", "Water", "Security", "Garden Access", "Kitchenette", "Study Desk"],
    distanceToMUST: "8km",
    distanceToPoly: "7km",
    distanceToCOM: "8.5km",
    description: "Charming detached cottage surrounded by greenery. Private entrance, quiet environment ideal for research and long study hours.",
    landlordName: "Mrs. Kazembe",
    landlordPhone: "+265 999 889 001",
    landlordEmail: "kazembe@hostels.mw",
    images: [
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=80",
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&q=80"
    ],
    available: true,
    rating: 4.6,
    reviews: 11,
    verified: true
  },
  {
    id: 15,
    title: "Shared Dorm Pod Room - Chileka Road",
    location: "Chileka",
    roomType: "Shared",
    price: 32000,
    amenities: ["WiFi", "Electricity", "Water", "Security", "Laundry", "Shared Kitchen"],
    distanceToMUST: "9km",
    distanceToPoly: "8km",
    distanceToCOM: "9.5km",
    description: "Innovative pod-style sleeping arrangements offering privacy curtains, individual charging ports and secure locker storage.",
    landlordName: "Pod Admin",
    landlordPhone: "+265 888 445 990",
    landlordEmail: "podhostel@hostels.mw",
    images: [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80",
      "https://images.unsplash.com/photo-1596075780750-81249df16d19?w=800&q=80"
    ],
    available: true,
    rating: 4.2,
    reviews: 40,
    verified: false
  },
  {
    id: 16,
    title: "Luxury Penthouse Room - Mount Pleasant",
    location: "Mount Pleasant",
    roomType: "Single",
    price: 110000,
    amenities: ["WiFi", "Electricity", "Water", "Security", "Parking", "Air Conditioning", "DSTV", "Backup Generator"],
    distanceToMUST: "5.5km",
    distanceToPoly: "4.5km",
    distanceToCOM: "5.5km",
    description: "Top-floor room with panoramic city views, premium furnishings, climate control and uninterrupted power. Suited for postgraduate or international students.",
    landlordName: "Mr. White",
    landlordPhone: "+265 999 223 556",
    landlordEmail: "white@hostels.mw",
    images: [
      "https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?w=800&q=80",
      "https://images.unsplash.com/photo-1505691723518-36a5ac3b2f9d?w=800&q=80"
    ],
    available: true,
    rating: 4.9,
    reviews: 10,
    verified: true
  },
  {
    id: 17,
    title: "Compact Study Suite - Naperi Extension",
    location: "Naperi",
    roomType: "Self-contained",
    price: 60000,
    amenities: ["WiFi", "Electricity", "Water", "Security", "Study Desk", "Kitchenette"],
    distanceToMUST: "2.2km",
    distanceToPoly: "3.2km",
    distanceToCOM: "2.7km",
    description: "Optimized self-contained unit with ergonomic study setup and fast fiber WiFi for online lectures.",
    landlordName: "Mrs. Banda",
    landlordPhone: "+265 888 123 456",
    landlordEmail: "bandastudios@hostels.mw",
    images: [
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&q=80",
      "https://images.unsplash.com/photo-1628744273498-0c00d0f54b2f?w=800&q=80"
    ],
    available: true,
    rating: 4.8,
    reviews: 9,
    verified: true
  },
  {
    id: 18,
    title: "Dual Room Apartment Share - Sunnyside",
    location: "Sunnyside",
    roomType: "Apartment",
    price: 95000,
    amenities: ["WiFi", "Electricity", "Water", "Security", "Full Kitchen", "Parking", "Study Lounge"],
    distanceToMUST: "4km",
    distanceToPoly: "3.5km",
    distanceToCOM: "4km",
    description: "Shared apartment with two private lockable bedrooms, joint living space and fully equipped kitchen. Great for pair arrangements.",
    landlordName: "Mr. Nyirenda",
    landlordPhone: "+265 888 345 678",
    landlordEmail: "nyirenda.apartments@hostels.mw",
    images: [
      "https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=800&q=80",
      "https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=800&q=80"
    ],
    available: true,
    rating: 4.7,
    reviews: 17,
    verified: true
  },
  {
    id: 19,
    title: "Quiet Academic Room - Chichiri Heights",
    location: "Chichiri",
    roomType: "Single",
    price: 47000,
    amenities: ["Electricity", "Water", "Security", "Study Desk", "Shared Kitchen"],
    distanceToMUST: "1.7km",
    distanceToPoly: "2.1km",
    distanceToCOM: "3.1km",
    description: "Academic-focused environment with enforced quiet hours, ideal for exam preparation and research writing.",
    landlordName: "Mr. Phiri",
    landlordPhone: "+265 999 234 567",
    landlordEmail: "phiriquiet@hostels.mw",
    images: [
      "https://images.unsplash.com/photo-1616628182509-d5f4e67f9b8f?w=800&q=80",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80"
    ],
    available: true,
    rating: 4.5,
    reviews: 13,
    verified: true
  },
  {
    id: 20,
    title: "Eco-Friendly Solar Room - Zingwangwa",
    location: "Zingwangwa",
    roomType: "Single",
    price: 53000,
    amenities: ["WiFi", "Electricity", "Water", "Security", "Garden Access", "Backup Generator"],
    distanceToMUST: "5.2km",
    distanceToPoly: "5.4km",
    distanceToCOM: "5.1km",
    description: "Sustainable living space powered primarily by solar with battery backup; consistent power for late-night study.",
    landlordName: "Green Host",
    landlordPhone: "+265 999 678 901",
    landlordEmail: "greenroom@hostels.mw",
    images: [
      "https://images.unsplash.com/photo-1600047509807-ba8f99fe8a0d?w=800&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2c2b6?w=800&q=80"
    ],
    available: true,
    rating: 4.6,
    reviews: 21,
    verified: true
  }
];

let bookings = [];
let users = [];

// Root endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Blantyre Student Accommodation API - Welcome!' });
});

// Get all accommodations with optional filters
app.get('/api/accommodations', (req, res) => {
  const { location, minPrice, maxPrice, roomType, amenities } = req.query;
  
  let filtered = accommodations.filter(acc => acc.available);
  
  if (location) {
    filtered = filtered.filter(acc => 
      acc.location.toLowerCase().includes(location.toLowerCase())
    );
  }
  
  if (minPrice) {
    filtered = filtered.filter(acc => acc.price >= parseInt(minPrice));
  }
  
  if (maxPrice) {
    filtered = filtered.filter(acc => acc.price <= parseInt(maxPrice));
  }
  
  if (roomType) {
    filtered = filtered.filter(acc => 
      acc.roomType.toLowerCase() === roomType.toLowerCase()
    );
  }
  
  if (amenities) {
    const amenitiesList = amenities.split(',');
    filtered = filtered.filter(acc => 
      amenitiesList.every(amenity => 
        acc.amenities.some(a => a.toLowerCase() === amenity.toLowerCase())
      )
    );
  }
  
  res.json(filtered);
});

// Get single accommodation by ID
app.get('/api/accommodations/:id', (req, res) => {
  const accommodation = accommodations.find(
    acc => acc.id === parseInt(req.params.id)
  );
  
  if (!accommodation) {
    return res.status(404).json({ error: 'Accommodation not found' });
  }
  
  res.json(accommodation);
});

// Create new accommodation (for landlords)
app.post('/api/accommodations', (req, res) => {
  const newAccommodation = {
    id: accommodations.length + 1,
    ...req.body,
    available: true
  };
  
  accommodations.push(newAccommodation);
  res.status(201).json(newAccommodation);
});

// Create a booking
app.post('/api/bookings', (req, res) => {
  const {
    accommodationId,
    studentName,
    studentEmail,
    studentPhone,
    universityId,
    checkInDate,
    checkOutDate,
    paymentMethod
  } = req.body;
  
  const accommodation = accommodations.find(
    acc => acc.id === parseInt(accommodationId)
  );
  
  if (!accommodation) {
    return res.status(404).json({ error: 'Accommodation not found' });
  }
  
  if (!accommodation.available) {
    return res.status(400).json({ error: 'Accommodation is no longer available' });
  }
  
  const newBooking = {
    id: bookings.length + 1,
    accommodationId: parseInt(accommodationId),
    studentName,
    studentEmail,
    studentPhone,
    universityId,
    checkInDate,
    checkOutDate,
    paymentMethod,
    bookingDate: new Date().toISOString(),
    status: 'pending',
    totalAmount: accommodation.price
  };
  
  bookings.push(newBooking);
  
  // Mark accommodation as unavailable
  accommodation.available = false;
  
  res.status(201).json({
    booking: newBooking,
    message: 'Booking created successfully. Please proceed to payment.'
  });
});

// Process payment
app.post('/api/payments', (req, res) => {
  const { bookingId, paymentMethod, phoneNumber, amount } = req.body;
  
  const booking = bookings.find(b => b.id === parseInt(bookingId));
  
  if (!booking) {
    return res.status(404).json({ error: 'Booking not found' });
  }
  
  // Simulate payment processing
  // In production, integrate with Airtel Money/TNM Mpamba APIs
  const payment = {
    id: Math.random().toString(36).substr(2, 9),
    bookingId: parseInt(bookingId),
    amount,
    paymentMethod,
    phoneNumber,
    status: 'success',
    transactionId: `TXN${Date.now()}`,
    timestamp: new Date().toISOString()
  };
  
  // Update booking status
  booking.status = 'confirmed';
  booking.paymentId = payment.id;
  
  res.json({
    payment,
    booking,
    message: 'Payment successful! Booking confirmed.'
  });
});

// Get all bookings (for admin)
app.get('/api/bookings', (req, res) => {
  res.json(bookings);
});

// Get booking by ID
app.get('/api/bookings/:id', (req, res) => {
  const booking = bookings.find(b => b.id === parseInt(req.params.id));
  
  if (!booking) {
    return res.status(404).json({ error: 'Booking not found' });
  }
  
  const accommodation = accommodations.find(
    acc => acc.id === booking.accommodationId
  );
  
  res.json({ ...booking, accommodation });
});

// User registration
app.post('/api/users/register', (req, res) => {
  const { name, email, phone, password, userType } = req.body;
  
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({ error: 'User already exists' });
  }
  
  const newUser = {
    id: users.length + 1,
    name,
    email,
    phone,
    password, // In production, hash this!
    userType, // 'student' or 'landlord'
    createdAt: new Date().toISOString()
  };
  
  users.push(newUser);
  
  // Don't send password back
  const { password: _, ...userWithoutPassword } = newUser;
  res.status(201).json(userWithoutPassword);
});

// User login
app.post('/api/users/login', (req, res) => {
  const { email, password } = req.body;
  
  const user = users.find(u => u.email === email && u.password === password);
  
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  const { password: _, ...userWithoutPassword } = user;
  res.json({
    user: userWithoutPassword,
    message: 'Login successful'
  });
});

app.listen(port, () => {
  console.log(` Student Accommodation API running on port ${port}`);
  console.log(` Visit http://localhost:${port} to get started`);
});
