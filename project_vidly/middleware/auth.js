const jwt = require('jsonwebtoken');
const config = require('config');

// Function to check is the user is authenticated to do some stuff
// Takes 3 arguments
// request, response
// and a middleware function which should go right after this
module.exports = function(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).send('Access denied. No token provided');
    }

    try {
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).send('Invalid token');
    }
}