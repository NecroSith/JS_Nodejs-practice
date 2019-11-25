const mongoose = require('mongoose');
const Joi = require('joi');
const PasswordComplexity = require('joi-password-complexity');

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
        password: Joi.string().min(5).max(255).required()
    };

    const passwordError = validatePassword(input.password);

    if (!passwordError) {
        return Joi.validate(input, schema);
    }


}

function validatePassword(password) {

    const complexityOptions = {
        min: 10,
        max: 30,
        lowerCase: 1,
        upperCase: 1,
        numeric: 1,
        symbol: 1,
        requirementCount: 2,
    }

    return Joi.validate(password, new PasswordComplexity(complexityOptions), (err, value) => {;

    })
}

module.exports.User = User;
module.exports.validate = validateInput;