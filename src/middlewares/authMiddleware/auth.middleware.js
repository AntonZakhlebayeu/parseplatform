const jwt = require("jsonwebtoken");

const config = require("../../configs/config");

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      const error = new Error("Unauthorized access");
      error.statusCode = 401;
      throw error;
    }

    let decodedToken;
    try {
      decodedToken = jwt.verify(token, config.getVariable("secretKey"));
    } catch (error) {
      error.statusCode = 403;
      throw error;
    }

    const userId = decodedToken.userId;

    req.userId = userId;

    next();
  } catch (error) {
    console.error("Authentication failed:", error);
    if (!error.statusCode) {
      error.statusCode = 401;
      error.message = "Unauthorized";
    }
    next(error);
  }
};

module.exports = authMiddleware;
