const express = require("express");
const {
  createBooking,
  getBookings,
  updateBookingStatus,
  getGookingByid,
} = require("../controllers/bookingController");

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Booking:
 *       type: object
 *       required:
 *         - user
 *         - service
 *         - date
 *         - time
 *         - location
 *       properties:
 *         user:
 *           type: string
 *           description: User ID
 *         service:
 *           type: string
 *           description: Type of service
 *         date:
 *           type: string
 *           format: date
 *         time:
 *           type: string
 *           format: time
 *         location:
 *           type: object
 *           properties:
 *             latitude:
 *               type: number
 *             longitude:
 *               type: number
 *       example:
 *         user: 64b4b3c2c51a2e3d7aee12ab
 *         service: Oil Change
 *         date: 2024-12-15
 *         time: 10:30 AM
 *         location:
 *           latitude: 30.0444
 *           longitude: 31.2357
 */

/**
 * @swagger
 * /api/bookings:
 *   post:
 *     summary: Create a new booking
 *     tags: [Bookings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Booking'
 *     responses:
 *       201:
 *         description: Booking created successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */


// إنشاء حجز جديد
router.post("/", createBooking);

// الحصول على جميع الحجوزات
router.get("/", getBookings);
//
router.get("/:id", getGookingByid);

// تحديث حالة الحجز
router.patch("/status", updateBookingStatus);

module.exports = router;
