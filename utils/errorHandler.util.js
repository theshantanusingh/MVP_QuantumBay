const logger = require('./../config/logger.config');

const errorHandler = (err , req , res , next) => {
    logger.info(err.stack);
    
    const statusCode =  err.statusCode || 500;

    res.status(statusCode).json({
        success: false,
        message: err.message,
    });
};

module.exports = errorHandler;