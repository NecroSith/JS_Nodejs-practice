const mongoose = require('mongoose');
const express = require('express');
const genres = require('./routes/genres');
const customers = require('./routes/customer');
const movies = require('./routes/movies');
const app = express();

mongoose.connect('mongodb://localhost/vidli')
    .then(() => console.log('Connected to Mongo DB...'))
    .catch(err => console.error('Error connecting to MongoDB...', err));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});