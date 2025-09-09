/**
 * @file server.js
 * @description Main server entry point for authentication + profile service.
 *              Sets up Express, MongoDB connection, middlewares, and routes.
 * 
 * @author
 *   Shantanu <distributedservices.shan@gmail.com>
 */

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const logger = require('./config/logger.config');
const connectDB = require('./config/db.config');
const config = require('./config/env.config');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

connectDB();

app.get('/', function(req , res){
    res.send("<h1>Hii</h1>");
});

app.listen(config.port , () => {
    logger.info('Server is ready and is working on port ', config.port, ' and link to site is http://localhost:',config.port);
})

