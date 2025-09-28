const Booking = require('../models/Booking');

function normalizeToMinute(d) {
  const dd = new Date(d);
  dd.setSeconds(0, 0);
  return dd;
}

// Query string: ?slot=ISOString
const checkAvailability = async (req, res) => {
  try {
    const { slot } = req.query;
    if (!slot) return res.status(400).json({ available: false, message: 'Missing slot query parameter' });
    const slotDate = new Date(slot);
    if (isNaN(slotDate.getTime())) return res.status(400).json({ available: false, message: 'Invalid slot format' });
    const normalized = normalizeToMinute(slotDate);
    if (normalized < normalizeToMinute(new Date())) return res.status(400).json({ available: false, message: 'Slot is in the past' });

    const conflict = await Booking.findOne({ slot: normalized });
    if (conflict) return res.status(200).json({ available: false, message: 'Slot already booked' });
    return res.status(200).json({ available: true });
  } catch (err) {
    console.error('Availability check error', err);
    return res.status(500).json({ available: false, message: 'Server error' });
  }
};

// Create a booking directly (if needed). Body: { customerName, email, slot }
const createBooking = async (req, res) => {
  try {
    const { customerName, email, slot } = req.body;
    if (!customerName || !slot) return res.status(400).json({ success: false, message: 'Missing required fields' });
    const slotDate = new Date(slot);
    if (isNaN(slotDate.getTime())) return res.status(400).json({ success: false, message: 'Invalid slot' });
    const normalized = normalizeToMinute(slotDate);
    if (normalized < normalizeToMinute(new Date())) return res.status(400).json({ success: false, message: 'Cannot book past slots' });
    const conflict = await Booking.findOne({ slot: normalized });
    if (conflict) return res.status(409).json({ success: false, message: 'Slot already booked' });

    const booking = await Booking.create({ customerName, email, slot: normalized });
    return res.status(201).json({ success: true, booking });
  } catch (err) {
    console.error('Create booking error', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Admin: list bookings
const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ slot: 1 });
    res.status(200).json({ success: true, bookings });
  } catch (err) {
    console.error('Get bookings error', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = { checkAvailability, createBooking, getBookings };
// Public: return booked slots within a date range (start and end query params as ISO)
const getBookedSlots = async (req, res) => {
  try {
    const { start, end } = req.query;
    if (!start || !end) return res.status(400).json({ success: false, message: 'Missing start or end' });
    const startDate = new Date(start);
    const endDate = new Date(end);
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) return res.status(400).json({ success: false, message: 'Invalid date range' });
    const slots = await Booking.find({ slot: { $gte: startDate, $lte: endDate } }).select('slot -_id').lean();
    const isoSlots = slots.map(s => s.slot.toISOString());
    return res.status(200).json({ success: true, slots: isoSlots });
  } catch (err) {
    console.error('getBookedSlots error', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = { checkAvailability, createBooking, getBookings, getBookedSlots };
