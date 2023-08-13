/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API endpoints for user registration and login
 */

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       description: User data for registration
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 required: true
 *               password:
 *                 type: string
 *                 required: true
 *             example:
 *               email: user@example.com
 *               password: secret123
 *     responses:
 *       '201':
 *         description: User registered successfully
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Log in as a user
 *     tags: [Users]
 *     requestBody:
 *       description: User credentials for login
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 required: true
 *               password:
 *                 type: string
 *                 required: true
 *             example:
 *               email: user@example.com
 *               password: secret123
 *     responses:
 *       '200':
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token for authentication
 *             example:
 *               token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       '401':
 *         description: Unauthorized access
 *       '500':
 *         description: Internal server error
 */





const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.post("/register", userController.register);

router.post("/login", userController.login);

module.exports = router;
