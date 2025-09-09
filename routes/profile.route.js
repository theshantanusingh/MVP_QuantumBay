/**
 * @file profile.routes.js
 * @description User profile routes (protected with JWT).
 *              Includes Get Profile and Update Profile endpoints.
 * 
 * Note: Requires accessToken in Authorization header: "Bearer <token>"
 * 
 * @author Shantanu
 */

const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const asyncHandler = require("../utils/asyncHandler.util");

const router = express.Router();

/**
 * Middleware: Protect routes using access token
 */
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user) {
      return res.status(404).json({ message: "User not found." });
    }
    next();
  } catch (err) {
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
});

/**
 * @route   GET /api/profile
 * @desc    Get logged-in user's profile
 * @access  Private
 */

router.get(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    res.json({
      message: "Profile fetched successfully",
      user: req.user,
    });
  })
);

/**
 * @route   PUT /api/profile
 * @desc    Update logged-in user's profile
 * @access  Private
 * @body    { name, firstName, lastName, country, contactNumber, location }
 */

router.put(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const { name, firstName, lastName, country, contactNumber, location } =
      req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name || user.name;
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.country = country || user.country;
    user.contactNumber = contactNumber || user.contactNumber;
    user.location = location || user.location;

    const updatedUser = await user.save();

    res.json({
      message: "Profile updated successfully",
      user: {
        id: updatedUser._id,
        email: updatedUser.email,
        name: updatedUser.name,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        country: updatedUser.country,
        contactNumber: updatedUser.contactNumber,
        location: updatedUser.location,
      },
    });
  })
);

module.exports = router;