const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const express = require('express');


const app = express();

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();



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


const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});