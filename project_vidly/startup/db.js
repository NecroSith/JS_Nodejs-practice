// DB initialization
const mongoose = require('mongoose');
const winston = require('winston');
const config = require('config');

module.exports = function() {
    const db = config.get('db');
    mongoose.connect(db)
        .then(() => winston.info(`Connected to ${db}...`))
        // catch is no longer needed as we have global error handler
}