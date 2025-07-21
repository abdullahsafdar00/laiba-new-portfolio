const express = require("express");
const router = express.Router();
const { getOrders, createOrder } = require("../controllers/orderController");
const adminAuth = require("../middleware/adminAuth");


// Create new order
router.post("/", createOrder);

// Get all orders (admin only)
router.get("/", adminAuth, getOrders);

module.exports = router;
