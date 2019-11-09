const mongoose = require('mongoose');
const express = require('express');
const Joi = require('joi');

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    isGold: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
});

const Customer = mongoose.model('Customer', customerSchema);

function validateInput(input) {
    schema = {
        name: Joi.string().min(5).required(),
        phone: Joi.string().min(5).required(),
        isGold: Joi.boolean()
    };

    return Joi.validate(input, schema);
}

module.exports.Customer = Customer;
module.exports.validate = validateInput;