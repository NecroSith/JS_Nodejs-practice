const express = require('express');
const { Rental } = require('../models/rentals');
const { Movie } = require('../models/movies');

const auth = require('../middleware/auth');
const router = express.Router();
const moment = require('moment');

router.post('/', auth, async(req, res) => {
    if (!req.body.customerId) return res.status(400).send('CustomerId not provided');
    if (!req.body.movieId) return res.status(400).send('MovieId not provided');

    const rental = await Rental.findOne({
        'customer._id': req.body.customerId,
        'movie._id': req.body.movieId
    });

    if (!rental) return res.status(404).send('Rental not found');
    if (rental.dateReturned) return res.status(400).send('Rental already processed');

    await Movie.update({ _id: rental.movie._id }, {
        $inc: {
            numberInStock: 1
        }
    })
    rental.dateReturned = new Date();
    rental.rentalFee = moment().diff(rental.dateOut, 'days') * rental.movie.dailyRentalRate;

    return res.status(200).send();
});

module.exports = router;