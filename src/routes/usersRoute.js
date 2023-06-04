const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware/auth.middleware');
const usersController = require('../controllers/usersController');
const errorHandler = require('../middlewares/errorHandler/errorHandler.middleware');

/**
   * @swagger
   * /api/users/me:
   *   get:
   *     summary: Retrieve the current logged-in user
   *     description: Retrieve the details of the current logged-in user using the JWT token
   *     tags:
   *       - User
   *     security:
   *       - BearerAuth: []
   *     responses:
   *       200:
   *         description: Successful operation
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 user:
   *                   type: object
   *                   properties:
   *                     _id:
   *                       type: string
   *                     username:
   *                       type: string
   *                     phoneNumber:
   *                       type: string
   *                       format: string
   *                     password:
   *                       type: string
   *                       format: password
   *                     created_at:
   *                       type: string
   *                       format: date-time
   *                     updated_at:
   *                       type: string
   *                       format: date-time
   *       400:
   *         description: Failed to retrieve current user
   *       404:
   *         description: User not found
   */
router.get('/users/me', authMiddleware, usersController.getCurrentUser);

router.use(errorHandler);

module.exports = router;
