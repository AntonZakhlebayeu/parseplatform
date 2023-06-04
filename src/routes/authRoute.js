const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const errorHandler = require("../middlewares/errorHandler/errorHandler.middleware");

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Auth routes
 * /api/auth/registration:
 *   post:
 *     summary: Register a new user
 *     description: Route for registration
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *                 format: string
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       201:
 *         description: Register a new user
 *       400:
 *         description: Registration failed
 *       409:
 *         description: User already registered
 */
router.post("/auth/registration", authController.register);
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Auth routes
 * /api/auth/complete-registration:
 *   post:
 *     summary: Complete a registration of a new user
 *     description: Route for completing registration
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phoneNumber:
 *                 type: string
 *                 format: string
 *               verificationCode:
 *                 type: string
 *                 format: password
 *     responses:
 *       201:
 *         description: Register a new user
 *       400:
 *         description: Registration failed
 *       409:
 *         description: User already registered
 */
router.post("/auth/complete-registration", authController.completeRegistration);
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Auth routes
 * /api/auth/login-initiate:
 *   post:
 *     summary: Login a user
 *     description: Route for login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phoneNumber:
 *                 type: string
 *                 format: string
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Login a new user
 *       400:
 *         description: Login failed
 *       401:
 *         description: Invalid credentials
 *       404:
 *         description: User does not exist
 */
router.post("/auth/login-initiate", authController.loginInitiate);
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Auth routes
 * /api/auth/login-verify:
 *   post:
 *     summary: Verify a verification code for login a user
 *     description: Route for verification received code for login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phoneNumber:
 *                 type: string
 *                 format: string
 *               verificationCode:
 *                 type: string
 *                 format: password
 *               rememberMe:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Login a new user
 *       400:
 *         description: Login failed
 *       401:
 *         description: Invalid credentials
 *       404:
 *         description: User does not exist
 */
router.post("/auth/login-verify", authController.loginVerify);

router.use(errorHandler);

module.exports = router;
