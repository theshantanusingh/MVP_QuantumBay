/**
 * @file generateAccessToken.util.js
 * @description Utility function to generate short-lived JWT access tokens.
 * 
 * Access tokens contain basic user identifiers (id, email) and are used
 * to authenticate API requests. These should be included in the 
 * `Authorization: Bearer <token>` header.
 * 
 * @example
 * const generateAccessToken = require("./utils/auth-tokens/generateAccessToken.util");
 * const token = generateAccessToken(user);
 * console.log(token); // "eyJhbGciOiJIUzI1NiIsInR..."
 * 
 * @module generateAccessToken
 */

const jwt = require("jsonwebtoken");

/**
 * Generates a short-lived JWT access token.
 *
 * @param {{ _id: string, email: string }} user - User object with at least `_id` and `email`.
 * @returns {string} Signed JWT access token valid for 15 minutes.
 */

const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: "15m" }
  );
};

module.exports = generateAccessToken;
