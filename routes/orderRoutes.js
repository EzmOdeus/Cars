const express = require("express");
const Order = require("../models/orderModel");
const router = express.Router();

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Place a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *                 description: User ID
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: string
 *                       description: Product ID
 *                     quantity:
 *                       type: number
 *                       description: Quantity of the product
 *                     price:
 *                       type: number
 *                       description: Price of the product
 *               totalAmount:
 *                 type: number
 *                 description: Total amount of the order
 *               paymentStatus:
 *                 type: string
 *                 enum: ['pending', 'completed', 'failed']
 *                 description: Payment status
 *               orderStatus:
 *                 type: string
 *                 enum: ['processing', 'shipped', 'delivered']
 *                 description: Order status
 *               deliveryAddress:
 *                 type: string
 *                 description: Delivery address
 *               deliveryDate:
 *                 type: string
 *                 format: date
 *                 description: Delivery date
 *             example:
 *               user: "64b4b3c2c51a2e3d7aee12ab"
 *               products:
 *                 - productId: "64b4b3c2c51a2e3d7aee12cd"
 *                   quantity: 2
 *                   price: 3500
 *               totalAmount: 7000
 *               paymentStatus: "pending"
 *               orderStatus: "processing"
 *               deliveryAddress: "123 Street, City, Country"
 *               deliveryDate: "2024-12-10"
 *     responses:
 *       200:
 *         description: Order placed successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/", async (req, res) => {
  try {
    const {
      products,
      totalAmount,
      paymentStatus,
      orderStatus,
      deliveryAddress,
      deliveryDate,
      user,
    } = req.body;

    const order = new Order({
      user,
      products,
      totalAmount,
      paymentStatus,
      orderStatus,
      deliveryAddress,
      deliveryDate,
    });

    await order.save();
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Get order details by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Order ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order details
 *       404:
 *         description: Order not found
 *       500:
 *         description: Server error
 */
router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "products.productId"
    );
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/orders/user/{userId}:
 *   get:
 *     summary: Get all orders for a specific user
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of orders for the user
 *       404:
 *         description: No orders found for this user
 *       500:
 *         description: Server error
 */
router.get("/user/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId }).populate(
      "products.productId"
    );
    if (!orders.length)
      return res.status(404).json({ message: "No orders found for this user" });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
