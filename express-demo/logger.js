// app.use is used to implement a middleware function into request processin pipeline
// "next" is a reference to next execured middleware function
export default log(req, res, next) {
    console.log('Logging...');
    // if next is not called, there will be a stop
    next();
}