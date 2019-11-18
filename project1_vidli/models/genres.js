const mongoose = require('mongoose');
const Joi = require('joi');

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
});

const Genre = mongoose.model('Genre', genreSchema);

function validateInput(input) {
    const schema = {
        name: Joi.string().min(5).required()
    };

    return Joi.validate(input, schema);
}

module.exports.Genre = Genre;
module.exports.validate = validateInput;