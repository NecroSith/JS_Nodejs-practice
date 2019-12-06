// DB initialization
const mongoose = require('mongoose');
const winston = require('winston');

module.exports = function() {
    mongoose.connect('mongodb://localhost/vidli')
        .then(() => winston.info('Connected to Mongo DB...'))
        // catch is no longer needed as we have global error handler
}