const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 255
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    }
});

const User = mongoose.model('User', userSchema);

function validateInput(input) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(1024).required().email(),
        name: Joi.string().min(5).max(255).required()
    };

    return Joi.validate(input, schema);
}

module.exports.User = User;
module.exports.validate = validateInput;