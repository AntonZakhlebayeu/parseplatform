const express = require("express");
const router = express.Router();

const healthController = require("../controllers/healthController");

/**
 * @swagger
 * tags:
 *   name: Health
 *   description: Health Check routes
 * /api/:
 *   get:
 *     summary: Returns health check
 *     description: Returns health check
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Health check successful
 */
router.get("/", healthController.healthChecker);

module.exports = router;
