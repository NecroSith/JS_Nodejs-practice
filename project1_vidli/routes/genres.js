const mongoose = require('mongoose');
const express = require('express');
const Joi = require('joi');
const router = express.Router();

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
});

const Genre = mongoose.model('Genre', genreSchema);

router.get('/', async(req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
});

router.get('/:id', async(req, res) => {
    const genre = await Genre.findById(req.params.id);

    if (!genre) {
        return res.status(404).send('The genre with the given id could not be found');
    }

    res.send(genre);
});

router.post('/', async(req, res) => {
    const { error } = validateInput(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    let genre = new Genre({
        name: req.body.name
    });

    genre = await genre.save();
    res.send(genre);

});

router.put('/:id', async(req, res) => {

    const { error } = validateInput(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });

    if (!genre) {
        return res.status(404).send('The genre with the given id could not be found');
    }

    res.send(genre);
});

router.delete('/:id', async(req, res) => {
    const { error } = validateInput(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    };

    const genre = await Genre.findByIdAndRemove(req.params.id);

    if (!genre) {
        return res.status(404).send('The genre with the given id could not be found');
    }

    res.send(genre);
});


function validateInput(input) {
    schema = {
        name: Joi.string().min(5).required()
    };

    return Joi.validate(input, schema);
}


module.exports = router;