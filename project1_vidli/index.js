const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const express = require('express');
const genres = require('./routes/genres');
const customers = require('./routes/customer');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users.js');
const auth = require('./routes/auth');
const app = express();

if (!config.get("jwtPrivateKey")) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined');

    // Closes the process of the app
    // anything except 0 means error so I used 1 here
    process.exit(1);
}

mongoose.connect('mongodb://localhost/vidli')
    .then(() => console.log('Connected to Mongo DB...'))
    .catch(err => console.error('Error connecting to MongoDB...', err));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});