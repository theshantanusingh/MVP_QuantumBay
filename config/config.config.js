const logger = require('./logger.config');
const config = require('./env.config');
const connectDB = require('./db.config');

const options = {
    logger,
    config,
    connectDB
};

module.exports = options;