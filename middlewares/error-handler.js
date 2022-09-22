const ErrorResponse = require("../utils/error-response");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  // console.log(err);

  if (err.original) {
    if (err.original.code === "ER_DUP_ENTRY") {
      const message = "Email already exist";
      error = new ErrorResponse(message, 400);
    }
  }

  return res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server error",
  });
};

module.exports = errorHandler;
