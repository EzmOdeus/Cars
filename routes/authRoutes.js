const express = require("express");
const { registerUser , authUser } = require("../controllers/authController");

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     user:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           description: user's name
 *         email:
 *           type: string
 *           description: user's email
 *         password:
 *           type: string
 *           description: user's password
 *       example:
 *         name: John Doe
 *         email: john.doe@example.com
 *         password: 123456
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/user'
 *     responses:
 *       200:
 *         description: user registered successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login an existing user
 *     tags: [users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: user's email
 *               password:
 *                 type: string
 *                 description: user's password
 *             example:
 *               email: john.doe@example.com
 *               password: 123456
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */


router.post("/register", registerUser);
router.post("/login", authUser);

module.exports = router;
