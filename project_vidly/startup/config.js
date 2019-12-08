const config = require('config');

module.exports = function() {
    // This error will not be handled by winston by default
    // because it is outside express scope (outside request handlers)
    // throw new Error('Something failed in the startup!');

    // const p = Promise.reject('Something broke!!');
    // p.then(() => console.log('Done'))

    if (!config.get("jwtPrivateKey")) {
        // as a best practice make error messages object
        // if you return a string you can't have a stacktrace in error handler
        throw new Error('FATAL ERROR: jwtPrivateKey is not defined');
        // Closes the process of the app
        // anything except 0 means error so I used 1 here
        // process.exit(1);
    }
}