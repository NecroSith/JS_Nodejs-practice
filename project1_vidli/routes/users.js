const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');
const _ = require('lodash');
const { User, validate } = require('../models/users');
const express = require('express');
const router = express.Router();

router.get('/me', auth, async(req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
})

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


// To implement loggin out user functionality we need to do this on client side
// To log out user we can simply delete their auth web token
//* it's a big no-no to store client auth web token server side because if someone hacks your db and get their hands on auth tokens they will get full access to every piece of data you have without need of password or id
// Deleting auth tokens and logging out are implemented client side