const express = require('express');
const { Rental } = require('../models/rentals');
const { Movie } = require('../models/movies');
const Joi = require('joi');

const auth = require('../middleware/auth');
const router = express.Router();
const moment = require('moment');
const validate = require('../middleware/validate');

router.post('/', [auth, validate(validateInput)], async(req, res) => {

    if (!req.body.customerId) return res.status(400).send('CustomerId not provided');
    if (!req.body.movieId) return res.status(400).send('MovieId not provided');

    //! There are 2 type of methods
    // Static and instance methods
    // Static method is a method that is available directly on a class
    // Instance medthod is a method that is available on an instance of a class

    //* we don''t need this code since we do the same thing with static method of Rental class that we created
    // const rental = await Rental.findOne({
    //     'customer._id': req.body.customerId,
    //     'movie._id': req.body.movieId
    // });

    //* we use this instead
    const rental = await Rental.lookup(res.body.customerId, res.body.movieId);

    if (!rental) return res.status(404).send('Rental not found');
    if (rental.dateReturned) return res.status(400).send('Rental already processed');

    rental.return();
    await rental.save();
    await Movie.update({ _id: rental.movie._id }, {
        $inc: {
            numberInStock: 1
        }
    })

    return res.status(200).send(rental);
});

function validateInput(input) {
    const schema = {
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required()
    };

    return Joi.validate(input, schema);
}

module.exports = router;