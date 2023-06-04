const User = require("../models/User");

const usersController = {
  getCurrentUser: async (req, res, next) => {
    try {
      const userId = req.userId;

      const user = await User.findById(userId);

      if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
      }

      res.status(200).json({ user });
    } catch (error) {
      console.error("Error retrieving current user:", error);
      if (!error.statusCode) {
        error.statusCode = 400;
        error.message = "Failed to retrieve current user";
      }
      next(error);
    }
  },
};

module.exports = usersController;
