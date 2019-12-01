// A middleware function that takes care of error handling
// so we don't need to try catch every router manually
// handler is the reference to the code to be executed
module.exports = function asyncMiddleware(handler) {
    // we need to return standard express async router handler because otherwise there is no way to pass req res and next arguments to the handler
    return async(req, res, next) => {
        try {
            await handler(req, res);
        } catch (ex) {
            next(ex);
        }
    }
}