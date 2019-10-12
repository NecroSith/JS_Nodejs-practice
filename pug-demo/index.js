const startupDebugger = require('debug')('app:startup');
const config = require('config');

const express = require('express');

const helmet = require('helmet');
const morgan = require('morgan');

const logger = require('./middleware/logger');

const courses = require('./routes/courses');
const home = require('./routes/home');

const Joi = require('joi');
const app = express();

// Activate pug template engine for our app
app.set('view engine', 'pug');

// Specify the location of the pug files to be taken by the server
app.set('views', './pug-demo/views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());

// We tell Express to use courses router for all addresses with api/courses
app.use('/api/courses', courses);
app.use('/', home);

const env = app.get('env');

if (env === 'development') {
    app.use(morgan('short'));
    startupDebugger('Morgan enabled');
}

app.use(logger);

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});