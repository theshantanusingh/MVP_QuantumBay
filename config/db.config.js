/**
 * @file db.config.js
 * @description MongoDB connection configuration using Mongoose.
 *              Handles initial connection, logs state changes,
 *              and ensures graceful shutdown on process termination.
 * 
 * This file auto-connects to MongoDB when imported.
 * 
 * @example
 * const connectDB = require("./config/db.config");
 * // DB connection starts immediately when the module is loaded.
 * 
 * @module connectDB
 */

const mongoose = require("mongoose");
const logger = require("./logger.config");
const config = require("./env.config");

let is_connected = false;

/**
 * Establishes a connection to MongoDB using Mongoose.
 * Prevents multiple redundant connections and sets up
 * event listeners for runtime monitoring.
 *
 * @async
 * @function connectDB
 * @returns {Promise<void>} Resolves once connected or exits process on failure.
 */
async function connectDB() {
  if (is_connected) {
    logger.warn("⚠️ Database already connected.");
    return;
  }

  try {
    await mongoose.connect(config.mongouri);

    logger.info(`✅ Connected to database successfully, uri = ${config.mongouri}`);
    is_connected = true;
  } catch (err) {
    logger.error(`❌ Failed to connect to database: ${err.message}`);
    logger.error(`Tried URI: ${config.mongouri}`);
    process.exit(1);
  }

  mongoose.connection.on("error", (err) => {
    logger.error({ err }, "MongoDB runtime error");
  });

  mongoose.connection.on("reconnected", () => {
    logger.info("🔄 MongoDB reconnected");
  });

  mongoose.connection.on("disconnected", () => {
    logger.warn("⚠️ MongoDB disconnected");
  });

  process.on("SIGINT", async () => {
    await mongoose.connection.close();
    logger.info("🛑 MongoDB connection closed due to app termination");
    process.exit(0);
  });
}

// Auto-connect on import
connectDB();

module.exports = connectDB;