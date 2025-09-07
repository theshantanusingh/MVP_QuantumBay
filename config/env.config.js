const dotenv = require('dotenv');
const path = require('path');

const options = require('./config.config');
const {logger} = options;

const required_envs = ['PORT' , 'SERVICE_NAME', 'NODE_ENV' , 'MONGOURI'];

for (const key of required_envs) {
    if(!process.env[key]) {
        logger.error(`Missing env variable ${key}`);
        process.exit(1);
    };
};

const config = {
    nodeEnv: process.env.NODE_ENV,
    serviceName: process.env.SERVICE_NAME,
    port: process.env.PORT,
    mongouri: process.env.MONGOURI
};

module.exports = config;