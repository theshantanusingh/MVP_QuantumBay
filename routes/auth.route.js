/**
 * @file auth.routes.js
 * @description Authentication routes using JWT (access + refresh tokens). 
 *              Includes Signup, Login, and Refresh Token endpoints.
 * 
 * Note: Token rotation and blacklisting are not implemented yet. 
 *       Refresh tokens are long-lived and sent as httpOnly cookies.
 * 
 * @author Shantanu <email> distributedservices.shan@gmail.com
 * 
 */

const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const asyncHandler = require("../utils/asyncHandler.util"); 

const generateAccessToken = require('./../utils/auth-tokens/generateAccessToken.util');
const generateRefreshToken = require('./../utils/auth-tokens/generateRefreshToken.util');

const router = express.Router();

/**
 * @route   POST /api/auth/signup
 * @desc    Register a new user and issue access & refresh tokens
 * @access  Public
 * @body    { name, firstName, lastName, email, password, country, contactNumber, location }
 * 
 * @author Shantanu <email> distributedservices.shan@gmail.com
 * 
 * @returns { message, accessToken, user }
 */

router.post(
  "/signup",
  asyncHandler(async (req, res) => {
    const { name, firstName, lastName, email, password, country, contactNumber, location } = req.body;

    if (!name || !firstName || !email || !password || !contactNumber) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already in use" });
    }

    const user = await User.create({ 
      name, 
      firstName, 
      lastName, 
      email, 
      password, 
      country, 
      contactNumber, 
      location 
    });

    const accessToken = generateAccessToken(user); // short-lived
    const refreshToken = generateRefreshToken(user); // long-lived

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(201).json({
      message: "User registered successfully",
      accessToken,
      user: { id: user._id, email: user.email, name: user.name },
    });
  })
);


/**
 * @route   POST /api/auth/login
 * @desc    Authenticate user credentials and issue access & refresh tokens
 * @access  Public
 * @body    { email, password }
 * 
 * @author Shantanu <email> distributedservices.shan@gmail.com
 * 
 * @returns { message, accessToken, user }
 */

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      message: "Login successful",
      accessToken,
      user: { id: user._id, email: user.email, name: user.name },
    });
  })
);


/**
 * @route   POST /api/auth/refresh
 * @desc    Issue a new access token using the refresh token
 * @access  Public (requires refresh token cookie)
 * @cookies { refreshToken }
 * 
 * @author Shantanu <email> distributedservices.shan@gmail.com
 * 
 * @returns { accessToken, message }
 */
router.post(
  "/refresh",
  asyncHandler(async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token provided" });
    }

    try {
      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
      const accessToken = generateAccessToken({ _id: decoded.id });

      res.json({ 
        accessToken,
        message: "New access token issued"
      });
    } catch (err) {
      return res.status(403).json({ message: "Invalid or expired refresh token" });
    }
  })
);

module.exports = router;