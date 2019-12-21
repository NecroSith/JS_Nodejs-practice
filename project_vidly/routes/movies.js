const auth = require('../middleware/auth');
const validateInput = require('../middleware/validate');
const { Movie, validate } = require('../models/movies');
const { Genre } = require('../models/genres');
const express = require('express');
const router = express.Router();

router.get('/', async(req, res) => {
    const movies = await Movie.find().sort('name');
    res.send(movies);
});

router.get('/:id', async(req, res) => {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
        return res.status(404).send('The movie with the given id could not be found');
    }

    res.send(movie);
});

router.post('/', [auth, validateInput(validate)], async(req, res) => {
    // We want to check if the genre is valid
    const genre = await Genre.findById(req.body.genreId);
    if (!genre) {
        return res.status(400).send('Invalid genre');
    }

    const movie = await new Movie({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });

    await movie.save();
    res.send(movie);

});

router.put('/:id', [auth, validateInput(validate)], async(req, res) => {
    const movie = await Movie.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });

    if (!movie) {
        return res.status(404).send('The movie with the given id could not be found');
    }

    res.send(movie);
});

router.delete('/:id', [auth, validateInput(validate)], async(req, res) => {
    const movie = await Movie.findByIdAndRemove(req.params.id);

    if (!movie) {
        return res.status(404).send('The movie with the given id could not be found');
    }

    res.send(movie);
});

module.exports = router;