const express = require('express');
const router = express.Router();
const { checkAvailability, createBooking, getBookings } = require('../controllers/bookingController');
const adminAuth = require('../middleware/adminAuth');


// GET /api/bookings/availability?slot=ISOString
router.get('/availability', checkAvailability);

// GET /api/bookings/slots?start=ISO&end=ISO
router.get('/slots', getBookedSlots);

// POST /api/bookings
router.post('/', createBooking);

// GET /api/bookings (admin)
router.get('/', adminAuth, getBookings);

module.exports = router;
