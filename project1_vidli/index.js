const winston = require('winston');
const express = require('express');
const app = express();

require('./startup/logging')();
require('./startup/config')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/validation')();

const port = process.env.PORT || 3001;
app.listen(port, () => {
    winston.info(`Listening on port ${port}...`);
});