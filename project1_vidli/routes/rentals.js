const auth = require('../middleware/auth');
const { Rental, validate } = require('../models/rentals');
const { Movie } = require('../models/movies');
const { Customer } = require('../models/customer');
const mongoose = require('mongoose');
// package required for two phase commits
const Fawn = require('fawn');
const express = require('express');
const router = express.Router();

Fawn.init(mongoose);

router.get('/', async(req, res) => {
    try {
        const rentals = await Rental.find().sort('-dateOut');
        res.send(rentals);
    } catch (ex) {
        res.status(500).send('Something went wrong');
    }
});

router.post('/', auth, async(req, res) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details);
    }

    const customer = await Customer.findById(req.body.customerId);
    // One way to handle incorrect ids is this
    // another way is to use Joi-objectid package
    // and modify validate function using it
    if (!customer || !mongoose.Types.ObjectId(req.body.customerId)) {
        return res.status(400).send('Invalid customer');
    }

    // We want to check if the genre is valid
    const movie = await Movie.findById(req.body.movieId);
    if (!movie || !mongoose.Types.ObjectId(req.body.movieId)) {
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

    // run our transaction
    // as chain of events
    // 1 - we create a task to initialize the sequence of operations
    // 2 - then we save our rental model
    // 3 - then we update movies model and movie with the provided id, we decrement its numberInStock value
    // 4 - we run the task
    try {
        new Fawn.Task()
            .save('rentals', rental)
            .update('movies', { _id: movie._id }, {
                $inc: { numberInStock: -1 }
            })
            .run()

        res.send(rental);
    } catch (ex) {
        res.status(500).send('Something failed');
    }

    // With Fawn we don't need these
    // rental = await rental.save();
    // movie.numberInStock--;
    // movie.save();



});

module.exports = router;