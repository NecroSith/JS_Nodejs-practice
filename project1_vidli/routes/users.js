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

    // user = new User({
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password
    // });

    user = new User(_.pick(req.body, ['name', 'email', 'password']));

    await user.save();

    // pick method of Lodash watches the object
    // and pull out only the proprties specified in square brackets
    res.send(_.pick(user, ['_id', 'name', 'email']));

    // Alternatively, without Lodash we can use
    // res.send({
    //     _id: user._id, 
    //     name: user.name,
    //     email: user.email
    // });

});

module.exports = router;