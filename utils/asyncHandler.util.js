/**
 * @file asyncHandler.util.js
 * @description Utility to wrap async Express route handlers and 
 *              automatically forward errors to the next middleware.
 * 
 * This avoids repetitive try/catch blocks in route definitions.
 * 
 * @example
 * const asyncHandler = require("./utils/asyncHandler.util");
 * 
 * router.get("/users", asyncHandler(async (req, res) => {
 *   const users = await User.find();
 *   res.json(users);
 * }));
 * 
 * @module asyncHandler
 */

/**
 * Wraps an async Express route handler and catches any rejected Promises,
 * forwarding the error to Express error-handling middleware.
 *
 * @param {function(import("express").Request, import("express").Response, function): Promise<any>} fn 
 *   The async route handler function to wrap.
 * 
 * @returns {function(import("express").Request, import("express").Response, function): void}
 *   A new function that executes the given async function and catches errors.
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;