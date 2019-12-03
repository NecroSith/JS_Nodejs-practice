const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const express = require('express');


const app = express();

require('./startup/logging')();
require('./startup/config')();
require('./startup/routes')(app);
require('./startup/db')();

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});