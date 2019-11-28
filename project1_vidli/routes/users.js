const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const _ = require('lodash');
const { User, validate } = require('../models/users');
const express = require('express');
const router = express.Router();

router.post('/', async(req, res) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details);
    }

    let user = await User.findOne({ email: req.body.email });

    if (user) {
        return res.status(400).send('User already registered');
    }

    user = new User(_.pick(req.body, ['name', 'email', 'password']));

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    // const token = jwt.sign({ _id: user._id }, config.get('jwtPrivateKey'));
    const token = user.generateAuthToken();


    // pick method of Lodash watches the object
    // and pull out only the proprties specified in square brackets
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
    // we also use header to send response headers with ou private key
});

module.exports = router;