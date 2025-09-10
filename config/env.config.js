/**
 * @file env.config.js
 * @description Loads and validates environment variables using dotenv.
 *              Ensures all required environment variables are present,
 *              otherwise exits the application with an error.
 * 
 * Exports a normalized configuration object for use across the app.
 * 
 * @example
 * const config = require("./config/env.config");
 * console.log(config.port); // 5000
 * 
 * @module config
 */

const dotenv = require("dotenv");
dotenv.config(); // Load variables from .env file

const logger = require("./logger.config");

/**
 * List of required environment variables for this service.
 * If any are missing, the application will not start.
 */
const required_envs = [
  "PORT",
  "SERVICE_NAME",
  "NODE_ENV",
  "MONGOURI",
  "JWT_REFRESH_SECRET",
  "JWT_ACCESS_SECRET",
];

for (const key of required_envs) {
  if (!process.env[key]) {
    logger.error(`❌ Missing env variable: ${key}`);
    process.exit(1);
  }
}

/**
 * Normalized configuration object for the service.
 * 
 * @typedef {Object} Config
 * @property {string} nodeEnv - The environment (e.g., "development", "production").
 * @property {string} serviceName - The name of the microservice.
 * @property {string|number} port - Port on which the service runs.
 * @property {string} mongouri - MongoDB connection URI.
 * @property {string} jwtAccessSecret - Secret for signing access tokens.
 * @property {string} jwtRefreshSecret - Secret for signing refresh tokens.
 */

/** @type {Config} */
const config = {
  nodeEnv: process.env.NODE_ENV,
  serviceName: process.env.SERVICE_NAME,
  port: process.env.PORT,
  mongouri: process.env.MONGOURI,
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
};

module.exports = config;