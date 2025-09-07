const pino = require("pino");

const options = {
    target: "pino-pretty",
    options: {
        colorize: true,
        translateTime: "HH:MM:ss",
        ignore: "pid,hostname",
    },
}

const logger = pino({
    level: process.env.LOG_LEVEL || "info", 
    transport:
        process.env.NODE_ENV === "development" ? options : undefined, 
});

module.exports = logger;