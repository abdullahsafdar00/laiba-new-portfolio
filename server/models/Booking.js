const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  email: { type: String },
  slot: { type: Date, required: true },
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
  createdAt: { type: Date, default: Date.now },
});

// Ensure a unique index on slot to prevent double-booking at DB level
bookingSchema.index({ slot: 1 }, { unique: true });

module.exports = mongoose.model('Booking', bookingSchema);
