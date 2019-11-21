const mongoose = require('mongoose');
const Joi = require('joi');
const { genreSchema } = require('./genres');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    // Hybrid approach
    genre: {
        type: genreSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    }
});

const Movie = mongoose.model('Movie', movieSchema);

function validateInput(input) {
    const schema = {
        title: Joi.string().min(5).max(50).required(),
        genreId: Joi.objectId().required(),
        numberInStock: Joi.number().min(5).max(255).required(),
        dailyRentalRate: Joi.number().min(5).max(255).required()
    };

    return Joi.validate(input, schema);
}

module.exports.genreSchema = genreSchema;
module.exports.Movie = Movie;
module.exports.validate = validateInput;