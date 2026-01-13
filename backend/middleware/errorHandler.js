// Centralized error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error("Error:", err.message)

  // Mongoose validation error
  if (err.name === "ValidationError") {
    return res.status(400).json({
      error: "Validation Error",
      details: Object.values(err.errors).map((e) => e.message),
    })
  }

  // Mongoose cast error (invalid ID format)
  if (err.name === "CastError") {
    return res.status(400).json({
      error: "Invalid ID format",
    })
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0]
    return res.status(409).json({
      error: `${field} already exists`,
    })
  }

  // Default error
  const statusCode = err.statusCode || 500
  const message = err.message || "Internal Server Error"

  res.status(statusCode).json({
    error: message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  })
}

export default errorHandler
