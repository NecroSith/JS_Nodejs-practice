// library to manage json web tokens 
// they are used to store user data upon server request
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const { User, validate } = require('../models/users');
const express = require('express');
const router = express.Router();
const validateInput = require('../middleware/validate');

router.post('/', validateInput(validateUser), async(req, res) => {
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

    // sign method generates a jsonwebtoken
    // argument 1 is payload of the token which typically contains user id and some other useful data
    // argument 2 is private key, our digital signature
    //! NEVER store private key in your source code
    // const token = jwt.sign({ _id: user._id }, config.get('jwtPrivateKey'));

    // We changed this by manually created method to generate the token
    // to make it more consistent
    const token = user.generateAuthToken();

    res.send(token);

});

function validateUser(req) {
    const schema = {
        email: Joi.string().min(5).max(1024).required().email(),
        password: Joi.string().min(5).max(255).required()
    };

    return Joi.validate(req, schema);
}


module.exports = router;