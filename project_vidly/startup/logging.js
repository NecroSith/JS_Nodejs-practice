// Before all other routers error handling middleware should be declared
// so it can wrap each request in error handler during runtime
// therefore there is no need to do anything for the dev
require('express-async-errors');
const winston = require('winston');
// require('winston-mongodb');

module.exports = function() {
    // process listener to handle errors not located in request handlers
    // process.on('uncaughtException', ex => {
    // console.log('Uncaught exception!!!');
    // winston.error(ex.message, ex);
    // As a best practice we should terminate process
    // process.exit(1);
    // });

    // Alternatively, we can use winston listener to handle uncaught exceptions
    // and log them to a separate file
    winston.handleExceptions(
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            )
        }),
        new winston.transports.File({ filename: 'project_vidly/uncaughtExceptions.log' }))

    // Process listener to handle errors in promises in runtime
    // process.on('unhandledRejection', ex => {
    //     console.log('Unhandled rejection!!!');
    //     winston.error(ex.message, ex);
    //     process.exit(1);
    // });

    //There is no listener for unhandled rejection in winston yet
    // so as a trick we can use this
    process.on('unhandledRejection', ex => {
        throw (ex); // this will generate uncaught exception which will be caught by the listener
    });

    // store logs in file
    winston.add(new winston.transports.File({ filename: 'project_vidly/logfile.log' }));

    // store logs in mongodb itself
    // winston.add(new winston.transports.MongoDB({
    //     db: 'mongodb://localhost/vidli',
    //     level: 'info'
    // }));
}