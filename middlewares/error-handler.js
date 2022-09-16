const ErrorResponse = require("../utils/error-response");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  console.log(err.stack.red);

  return res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server error",
  });
};

module.exports = errorHandler;
