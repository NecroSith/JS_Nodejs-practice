const Joi = require('joi');
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const { User, validate } = require('../models/users');
const express = require('express');
const router = express.Router();

router.post('/', async(req, res) => {
    const { error } = validateUser(req.body);
    if (error) {
        return res.status(400).send(error.details);
    }

    let user = await User.findOne({ email: req.body.email });

    if (!user) {
        return res.status(400).send('Invalid email or password');
    }

    // we compare password in request body and in the db
    // as the former one is in plain text we need to pass salt
    // so it can be hashed and compared with the existing hashed password in the db
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        return res.status(400).send('Invalid email or password');
    }

    res.send(true);

});

function validateUser(req) {
    const schema = {
        email: Joi.string().min(5).max(1024).required().email(),
        password: Joi.string().min(5).max(255).required()
    };

    return Joi.validate(req, schema);
}


module.exports = router;