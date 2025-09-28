const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customerName: String,
  items: [String],
  total: Number,
  bookingDateTime: Date,
  bookingTimezone: String,
  status: { type: String, default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
