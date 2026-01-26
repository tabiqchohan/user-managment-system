// middleware/errorHandler.js

const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // Log error for debugging

  // Handle Prisma errors
  if (err.code) {
    if (err.code === 'P2002') {
      // Unique constraint violation
      return res.status(400).json({
        error: 'A record with this value already exists',
        details: err.meta?.target
      });
    }

    if (err.code === 'P2025') {
      // Record not found
      return res.status(404).json({
        error: 'Record not found'
      });
    }
  }

  // Handle validation errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Validation error',
      details: err.message
    });
  }

  // Handle specific error types
  if (err.name === 'CastError') {
    return res.status(400).json({
      error: 'Invalid ID format'
    });
  }

  // Default error response
  res.status(500).json({
    error: 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

module.exports = errorHandler;