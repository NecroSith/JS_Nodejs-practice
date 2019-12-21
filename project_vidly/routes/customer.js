const auth = require('../middleware/auth');
const { Customer, validate } = require('../models/customer');
const express = require('express');
const router = express.Router();
const validateInput = require('../middleware/validate');

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

router.post('/', [auth, validateInput(validate)], async(req, res) => {

    let customer = new Customer({
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
    });

    customer = await customer.save();
    res.send(customer);

});

router.put('/:id', [auth, validateInput(validate)], async(req, res) => {
    const customer = await Customer.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });

    if (!customer) {
        return res.status(404).send('The genre with the given id could not be found');
    }

    res.send(customer);
});

router.delete('/:id', [auth, validateInput(validate)], async(req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id);

    if (!customer) {
        return res.status(404).send('The genre with the given id could not be found');
    }

    res.send(customer);
});

module.exports = router;