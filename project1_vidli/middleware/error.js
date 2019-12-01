const winston = require('winston');

module.exports = function(err, req, res, next) {
    // we can log errors like this
    // winston.log('error', err.message);

    // or this
    // second argument is optional metadata
    winston.error(err.message, err);

    // log levels for winston
    // error
    // warn
    // info
    // verbose
    // debug
    // silly 

    res.status(500).send('Something went wrong');
}