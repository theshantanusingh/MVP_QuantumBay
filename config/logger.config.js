/**
 * @file logger.config.js
 * @description Centralized logger configuration using Pino.
 *              Provides structured logging with optional pretty-printing in development.
 * 
 * In development mode, logs are colorized and time-stamped for readability.
 * In production, raw JSON logs are emitted for better integration with log aggregators.
 * 
 * @example
 * const logger = require("./config/logger.config");
 * 
 * logger.info("Server started");
 * logger.error(new Error("Something went wrong"));
 * 
 * @module logger
 */

const pino = require("pino");

const options = {
  target: "pino-pretty",
  options: {
    colorize: true,
    translateTime: "HH:MM:ss",
    ignore: "pid,hostname",
  },
};

/**
 * Pino logger instance.
 *
 * @type {import("pino").Logger}
 */
const logger = pino({
  level: process.env.LOG_LEVEL || "info",
  transport: process.env.NODE_ENV === "development" ? options : undefined,
});

module.exports = logger;
