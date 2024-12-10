const express = require("express");
const Product = require("../models/productModel");
const { CreateProduct, GetProductById, GetAllProducts } = require("../controllers/productController");
const router = express.Router();

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Add a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Product name
 *               description:
 *                 type: string
 *                 description: Product description
 *               price:
 *                 type: number
 *                 description: Product price
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of product image URLs
 *               category:
 *                 type: string
 *                 description: Product category (e.g., electronics, clothing)
 *               serviceCenterId:
 *                 type: string
 *                 description: Service center ID providing the product
 *             example:
 *               name: "Air Conditioner"
 *               description: "Energy efficient air conditioner"
 *               price: 3500
 *               images: ["https://example.com/image1.jpg", "https://example.com/image2.jpg"]
 *               category: "Electronics"
 *               serviceCenterId: "64b4b3c2c51a2e3d7aee12cd"
 *     responses:
 *       200:
 *         description: Product added successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/", CreateProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get product details by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Product ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product details
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
router.get("/:id", GetProductById);

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of all products
 *       500:
 *         description: Server error
 */
router.get("/", GetAllProducts);

module.exports = router;
