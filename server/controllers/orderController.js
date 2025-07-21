const Order = require("../models/Order");
const transporter = require("../utils/mailer.js");

// Create a new order
const createOrder = async (req, res) => {
  const { customerName, items, total, email, paymentToken } = req.body;
  if (!customerName || !items || !total) {
    return res.status(400).json({ success: false, message: "Missing required fields." });
  }
  try {
    const order = await Order.create({ customerName, items, total });
    // Only send emails if paymentToken is present (i.e., payment was made)
    if (paymentToken) {
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
        console.error("Order email error:", emailErr);
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
