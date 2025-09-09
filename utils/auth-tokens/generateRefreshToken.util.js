/**
 * @file generateRefreshToken.util.js
 * @description Utility function to generate long-lived JWT refresh tokens.
 * 
 * Refresh tokens are stored securely (e.g., httpOnly cookies) and used to
 * obtain new access tokens when they expire. They should never be exposed
 * to client-side JavaScript.
 * 
 * @example
 * const generateRefreshToken = require("./utils/auth-tokens/generateRefreshToken.util");
 * const refreshToken = generateRefreshToken(user);
 * console.log(refreshToken); // "eyJhbGciOiJIUzI1NiIsInR..."
 * 
 * @module generateRefreshToken
 */

const jwt = require("jsonwebtoken");

/**
 * Generates a long-lived JWT refresh token.
 *
 * @param {{ _id: string }} user - User object with at least `_id`.
 * @returns {string} Signed JWT refresh token valid for 7 days.
 */
const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user._id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );
};

module.exports = generateRefreshToken;