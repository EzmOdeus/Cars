const express = require("express");
const Review = require("../models/reviewsModel");
const { CreateReviw, GetReviewByID, GetServiceReviewsById } = require("../controllers/reviewController");
const router = express.Router();

/**
 * @swagger
 * /api/reviews:
 *   post:
 *     summary: Add a new review for a service center
 *     tags: [Reviews]
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
 *               serviceCenterId:
 *                 type: string
 *                 description: Service Center ID
 *               rating:
 *                 type: number
 *                 description: Rating (1-5)
 *               reviewText:
 *                 type: string
 *                 description: Review text
 *             example:
 *               user: "64b4b3c2c51a2e3d7aee12ab"
 *               serviceCenterId: "64b4b3c2c51a2e3d7aee12cd"
 *               rating: 4
 *               reviewText: "Great service, very professional!"
 *     responses:
 *       200:
 *         description: Review added successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/", CreateReviw);

/**
 * @swagger
 * /api/reviews/{id}:
 *   get:
 *     summary: Get review details by ID
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Review ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Review details
 *       404:
 *         description: Review not found
 *       500:
 *         description: Server error
 */
router.get("/:id", GetReviewByID);

/**
 * @swagger
 * /api/reviews/service-center/{serviceCenterId}:
 *   get:
 *     summary: Get all reviews for a specific service center
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: serviceCenterId
 *         required: true
 *         description: Service Center ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of reviews for the service center
 *       404:
 *         description: No reviews found for this service center
 *       500:
 *         description: Server error
 */
router.get("/service-center/:serviceCenterId", GetServiceReviewsById);

module.exports = router;
