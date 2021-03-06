const validateObjectid = require('../middleware/validateObjectId');
const auth = require('../middleware/auth');
const validateInput = require('../middleware/validate');
const admin = require('../middleware/admin');
const { Genre, validate } = require('../models/genres');
const express = require('express');
const router = express.Router();

//* We can use this asyncMiddleware function but there is a need to write this asyncMiddleware call in each router which makes code more messy
//* Alternatively we used express-async-errors package to do the same job during runtime without any additional code
// const asyncMiddleware = require('../middleware/async');

// router.get('/', asyncMiddleware(async(req, res) => {
//     const genres = await Genre.find().sort('name');
//     res.send(genres);
// }));

router.get('/', async(req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
});

router.get('/:id', validateObjectid, async(req, res) => {
    const genre = await Genre.findById(req.params.id);

    if (!genre) {
        return res.status(404).send('The genre with the given id could not be found');
    }

    res.send(genre);
});

// Argument 2 is a middleware function
// It is executed before the function itself
router.post('/', [auth, validateInput(validate)], async(req, res) => {
    let genre = await new Genre({
        name: req.body.name
    });

    genre = await genre.save();
    res.send(genre);

});

router.put('/:id', [auth, validateInput(validate)], async(req, res) => {

    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });

    if (!genre) {
        return res.status(404).send('The genre with the given id could not be found');
    }

    res.send(genre);
});

router.delete('/:id', [auth, admin, validateInput(validate)], async(req, res) => {

    const genre = await Genre.findByIdAndRemove(req.params.id);

    if (!genre) {
        return res.status(404).send('The genre with the given id could not be found');
    }

    res.send(genre);
});

module.exports = router;