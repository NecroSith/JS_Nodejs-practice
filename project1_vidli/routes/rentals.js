const { Rental, validate } = require('../models/rentals');
const { Movie } = require('../models/movies');
const { Customer } = require('../models/customer');
const express = require('express');
const router = express.Router();

router.get('/', async(req, res) => {
    const rentals = await Rental.find().sort('-dateOut');
    res.send(rentals);
});

router.post('/', async(req, res) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details);
    }

    const customer = await Customer.findById(req.params.customerId);
    if (!customer) {
        return res.status(400).send('Invalid customer');
    }

    // We want to check if the genre is valid
    const movie = await Movie.findById(req.params.genreId);
    if (!movie) {
        return res.status(400).send('Invalid movie');
    }

    if (movie.numberInStock === 0) return res.status(400).send('Movie not is stock');

    let rental = new Rental({
        customer: {
            _id: customer.id,
            name: customer.name,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    });

    rental = await rental.save();

    movie.numberInStock--;
    movie.save();

    res.send(rental);

});

module.exports = router;