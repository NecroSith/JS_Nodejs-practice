const mongoose = require('mongoose');
const express = require('express');
const Joi = require('joi');
const router = express.Router();

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

router.get('/', async(req, res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers);
});

router.get('/:id', async(req, res) => {
    const customer = await Customer.findById(req.params.id);

    if (!customer) {
        return res.status(404).send('The genre with the given id could not be found');
    }

    res.send(customer);
});

router.post('/', async(req, res) => {
    const { error } = validateInput(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    let customer = new Customer({
        name: req.body.name
    });

    customer = await customer.save();
    res.send(customer);

});

router.put('/:id', async(req, res) => {

    const { error } = validateInput(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const customer = await Customer.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });

    if (!customer) {
        return res.status(404).send('The genre with the given id could not be found');
    }

    res.send(customer);
});

router.delete('/:id', async(req, res) => {
    const { error } = validateInput(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    };

    const customer = await Customer.findByIdAndRemove(req.params.id);

    if (!customer) {
        return res.status(404).send('The genre with the given id could not be found');
    }

    res.send(customer);
});


function validateInput(input) {
    schema = {
        name: Joi.string().min(5).required(),
        phone: Joi.string().min(5).required(),
        isGold: Joi.boolean()
    };

    return Joi.validate(input, schema);
}


module.exports = router;