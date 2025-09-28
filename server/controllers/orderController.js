const Order = require("../models/Order");
const Booking = require("../models/Booking");
const transporter = require("../utils/mailer.js");

function normalizeToMinute(d) {
  const dd = new Date(d);
  dd.setSeconds(0, 0);
  return dd;
}

// Create a new order
const createOrder = async (req, res) => {
  const { customerName, items, total, email, paymentToken, bookingDateTime, bookingTimezone } = req.body;
  if (!customerName || !items || !total) {
    return res.status(400).json({ success: false, message: "Missing required fields." });
  }
  try {
    const orderData = { customerName, items, total };
    let slotDate = null;
    if (bookingDateTime) {
      slotDate = new Date(bookingDateTime);
      if (isNaN(slotDate.getTime())) return res.status(400).json({ success: false, message: 'Invalid bookingDateTime' });
      const normalized = normalizeToMinute(slotDate);
      if (normalized < normalizeToMinute(new Date())) return res.status(400).json({ success: false, message: 'bookingDateTime cannot be in the past' });
  orderData.bookingDateTime = normalized;
  if (bookingTimezone) orderData.bookingTimezone = bookingTimezone;
      // Check for existing booking conflict
      const conflict = await Booking.findOne({ slot: normalized });
      if (conflict) return res.status(409).json({ success: false, message: 'Requested slot is already booked' });
    }

    const order = await Order.create(orderData);

    // If paymentToken present, create booking record for the slot (reserve)
    if (paymentToken && slotDate) {
      try {
        const normalized = normalizeToMinute(slotDate);
        // create booking record
        const booking = await Booking.create({ customerName, email, slot: normalized, orderId: order._id });
        // send emails with booking info
        const bookingText = `<p><strong>Requested slot:</strong> ${normalized.toLocaleString()} (${Intl.DateTimeFormat().resolvedOptions().timeZone})</p>`;
        await transporter.sendMail({
          from: `"PrebuiltUI" <${process.env.EMAIL_USER}>`,
          to: process.env.EMAIL_TO,
          subject: "New Order Received",
          html: `
            <h2>New Order</h2>
            <p><strong>Name:</strong> ${customerName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Items:</strong> ${Array.isArray(items) ? items.join(', ') : items}</p>
            <p><strong>Total:</strong> $${total}</p>
            ${bookingText}
          `,
        });
        if (email) {
          await transporter.sendMail({
            from: `"PrebuiltUI" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Order Confirmation",
            html: `
              <h3>Hi ${customerName},</h3>
              <p>Thank you for your order! We have received it and will process it soon.</p>
              <p><strong>Order Details:</strong></p>
              <ul>
                <li>Items: ${Array.isArray(items) ? items.join(', ') : items}</li>
                <li>Total: $${total}</li>
              </ul>
              ${bookingText}
              <p>– The PrebuiltUI Team</p>
            `,
          });
        }
      } catch (emailErr) {
        // If duplicate key error when creating booking (race condition), delete the created order and return 409
        if (emailErr && emailErr.code === 11000) {
          try {
            await Order.findByIdAndDelete(order._id);
          } catch (delErr) {
            console.error('Failed to rollback order after booking conflict', delErr);
          }
          return res.status(409).json({ success: false, message: 'Requested slot was just booked by someone else' });
        }
        console.error('Order email/booking error:', emailErr);
      }
    } else if (paymentToken) {
      // No slot, just send regular confirmations
      try {
        await transporter.sendMail({
          from: `"PrebuiltUI" <${process.env.EMAIL_USER}>`,
          to: process.env.EMAIL_TO,
          subject: "New Order Received",
          html: `
            <h2>New Order</h2>
            <p><strong>Name:</strong> ${customerName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Items:</strong> ${Array.isArray(items) ? items.join(', ') : items}</p>
            <p><strong>Total:</strong> $${total}</p>
          `,
        });
        if (email) {
          await transporter.sendMail({
            from: `"PrebuiltUI" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Order Confirmation",
            html: `
              <h3>Hi ${customerName},</h3>
              <p>Thank you for your order! We have received it and will process it soon.</p>
              <p><strong>Order Details:</strong></p>
              <ul>
                <li>Items: ${Array.isArray(items) ? items.join(', ') : items}</li>
                <li>Total: $${total}</li>
              </ul>
              <p>– The PrebuiltUI Team</p>
            `,
          });
        }
      } catch (emailErr) {
        console.error('Order email error:', emailErr);
      }
    }

    res.status(201).json({ success: true, order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to create order" });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

module.exports = { getOrders, createOrder };
