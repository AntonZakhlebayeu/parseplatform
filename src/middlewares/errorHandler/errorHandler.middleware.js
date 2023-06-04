function errorHandler(err, req, res, next) {
  let statusCode = err.statusCode || 500;
  let errorMessage = err.message || "Internal Server Error";

  const response = {
    error: {
      code: statusCode,
      message: errorMessage,
    },
  };

  res.status(statusCode).json(response);
}

module.exports = errorHandler;
