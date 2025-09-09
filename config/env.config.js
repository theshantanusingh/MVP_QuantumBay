const dotenv = require("dotenv");
dotenv.config(); // load .env file

const logger = require("./logger.config");

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

const config = {
  nodeEnv: process.env.NODE_ENV,
  serviceName: process.env.SERVICE_NAME,
  port: process.env.PORT,
  mongouri: process.env.MONGOURI,
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
};

module.exports = config;