// Before all other routers error handling middleware should be declared
// so it can wrap each request in error handler during runtime
// therefore there is no need to do anything for the dev
require('express-async-errors');

const winston = require('winston');
require('winston-mongodb');

const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const express = require('express');


const app = express();

require('./startup/routes')(app);

// proces listener to handle errors not located in request handlers
process.on('uncaughtException', ex => {
    console.log('Uncaught exception!!!');
    winston.error(ex.message, ex);
    // As a best practice we should terminate process
    process.exit(1);
});

// Alternatively, we can use winston listener to handle uncaught exceptions
// and log them to a separate file
winston.handleExceptions(new winston.transports.File({ filename: 'project1_vidli/uncaughtExceptions.log' }))

// Process listener to handle errors in promises in runtime
process.on('unhandledRejection', ex => {
    console.log('Unhandled rejection!!!');
    winston.error(ex.message, ex);
    process.exit(1);
});

//There is no listener for unhandled rejection in winston yet
// so as a trick we can use this
process.on('unhandledRejection', ex => {
    throw (ex); // this will generate uncaught exception which will be caught by the listener
});

// store logs in file
winston.add(new winston.transports.File({ filename: 'project1_vidli/logfile.log' }));

// store logs in mongodb itself
winston.add(new winston.transports.MongoDB({ db: 'mongodb://localhost/vidli' }));

// This error will not be handled by winston by default
// because it is outside express scope (outside request handlers)
// throw new Error('Something failed in the startup!');

// const p = Promise.reject('Something broke!!');
// p.then(() => console.log('Done'))

if (!config.get("jwtPrivateKey")) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined');

    // Closes the process of the app
    // anything except 0 means error so I used 1 here
    process.exit(1);
}

mongoose.connect('mongodb://localhost/vidli')
    .then(() => console.log('Connected to Mongo DB...'))
    .catch(err => console.error('Error connecting to MongoDB...', err));


const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});