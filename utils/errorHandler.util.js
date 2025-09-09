/**
 * @file error.middleware.js
 * @description Global error-handling middleware for Express.
 *              Logs the error and sends a standardized JSON response.
 * 
 * Works together with asyncHandler to catch and forward errors
 * without writing repetitive try/catch blocks.
 * 
 * @example
 * const errorHandler = require("./middlewares/error.middleware");
 * app.use(errorHandler);
 * 
 * @module errorHandler
 */

const logger = require("./../config/logger.config");

/**
 * Express error-handling middleware.
 *
 * @function
 * @param {Error} err - The error object thrown in routes or middlewares.
 * @param {import("express").Request} req - Express request object.
 * @param {import("express").Response} res - Express response object.
 * @param {import("express").NextFunction} next - Express next middleware function.
 * 
 * @returns {void} Sends a JSON error response with `statusCode`, `success`, and `message`.
 */
const errorHandler = (err, req, res, next) => {
  logger.error(err.stack);

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

module.exports = errorHandler;
