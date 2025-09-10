/**
 * @file server.js
 * @description Main server entry point for authentication and profile services.
 *              Sets up Express server, MongoDB connection, middlewares, and routes.
 * 
 * @author Shantanu <distributedservices.shan@gmail.com>
 */

const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const helmet = require('helmet');

const logger = require('./config/logger.config');
const connectDB = require('./config/db.config');
const config = require('./config/env.config');

const app = express();

/**
 * @description Parse incoming JSON requests
 * @example
 * app.use(express.json());
 */
app.use(express.json());

/**
 * @description Parse URL-encoded data from incoming requests
 * @example
 * app.use(express.urlencoded({ extended: true }));
 */
app.use(express.urlencoded({ extended: true }));

/**
 * @description Parse cookies from incoming requests
 */
app.use(cookieParser());

/**
 * @description HTTP request logger middleware
 */
app.use(morgan('dev'));

/**
 * @description Security middleware to set HTTP headers
 */
app.use(helmet());

/**
 * @description Import route handlers
 */
const authRoutes = require('./routes/auth.route');
const profileRoutes = require('./routes/profile.route');

/**
 * @description Mount routes
 * @example
 * app.use('/api/auth', authRoutes);
 * app.use('/api/profile', profileRoutes);
 */
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);

/**
 * @description Connect to MongoDB
 */
connectDB();

/**
 * @description Start the Express server
 * @param {number} config.port - Port number from environment variables
 */
app.listen(config.port, () => {
    logger.info(
        `Server is ready and running on port ${config.port}. Access it at http://localhost:${config.port}`
    );
});

module.exports = app;