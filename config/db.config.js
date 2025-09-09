const mongoose = require('mongoose');

const logger = require('./logger.config');
const config = require('./env.config');

let is_connected = false;

async function connectDB() {
    if (is_connected) {
        logger.warn(`Database already connected.`);
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
        logger.info("MongoDB reconnected");
    });

    mongoose.connection.on("disconnected", () => {
        logger.warn("MongoDB disconnected");
    });

    process.on("SIGINT", async () => {
        await mongoose.connection.close();
        logger.info("MongoDB connection closed due to app termination");
        process.exit(0);
    });
}

connectDB()

module.exports = connectDB;