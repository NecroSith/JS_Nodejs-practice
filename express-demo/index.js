// * The more middleware functions are used the more it affects the performance - middleware function slow down request processing speed
const express = require('express');

// Third party middlewares
const helmet = require('helmet');
const morgan = require('morgan');

const logger = require('./logger');
// Include a joi library to properly handle input validation
// result of require is class, that's why the variable name in PascalCase
const Joi = require('joi');

const app = express();

// Enabling json parsing feature to be able to parse the request body. This feature is not enabled in Express by default
// * This is called a middleware function as all our requests pass through it
app.use(express.json());

// Built-in middleware function to pars incoming requests with urlencoded payloads
// Like key=value
// with extended: true we can pass objects and array in urlencoded format
app.use(express.urlencoded({ extended: true }));

// Built-in middleware function to serve static files
// So it is accessible via localhost:3001/readme.txt
app.use(express.static('public'));

// Third-party middleware to secure HTTP headers
app.use(helmet());

// The environment is stored in NODE_ENV which can be accessed via
console.log(process.env.NODE_ENV);
// We can set it in terminal by "export NODE_ENV=production"
// Development, testing, staging and production options are available

// By default it's set to development, we can also check it by calling app.get
const env = app.get('env');

// If env is set to development HTTP logging is enabled
// There is no much sense to enable it in production but it will slow down request processing
if (env === 'development') {
    // Third party middleware to log HTTP requests
    app.use(morgan('short'));
    console.log('Morgan enabled')
}


// We call a custom middleware function defined in external logger js file
app.use(logger);





// Call environmental veriable to get port in case it's dynamic e.g. on a web hosting. Otherwise use port 3001
// You can change PORT value by typing "export PORT=xxxx" in the command line
// Where xxxx is the port number
const port = process.env.PORT || 3001;

const courses = [{ id: 1, name: 'course1' }, { id: 2, name: 'course2' }, { id: 3, name: 'course3' }, { id: 4, name: 'course4' }, { id: 5, name: 'course5' }];

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

// :year and :month are route parameters which are passed to the server and defines what kind of data has been requested
// ?sortby=name is a query string parameters to get some optional information
// app.get('/api/courses/:year/:month', (req, res) => {
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(course => course.id === parseInt(req.params.id));
    res.send(course);
    if (!course) {
        return res.status(404).send('The course with the given id was not found');
    }
})

app.post('/api/courses', (req, res) => {
    // To use joi to validate input we should specify schema, i.e. properties of our input
    // const schema = {
    //     name: Joi.string().min(3).required();
    // }

    // const result = Joi.validate(req.body, schema);
    const { error } = validateCourse(req.body);
    // console.log(result);

    if (!error) {
        return res.status(400).send(error.details[0].message);
    }

    // if (!req.body.name || req.body.name.length < 3) {

    // By ReSTful convention in case the client didn't provide a proper object or it doesn't satisfy certain conditions
    // 400 Bad Request error should be given
    // res.status(400).send('Name is required and should be at least 3 characters long');
    // return;
    // }


    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    // As the client need to know about the added object sometimes we send query results to clients by convention
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    // Look up the course
    const course = courses.find(course => course.id === parseInt(req.params.id));
    if (!course) {
        return res.status(404).send('The course with the given id was not found');
    }

    const { error } = validateCourse(req.body);
    // console.log(result);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    // Update the course
    course.name = req.body.name;
    res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(course => course.id === parseInt(req.params.id));
    if (!course) {
        return res.status(404).send('The course with the given id was not found');
    }

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
});


app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});


function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    }

    return Joi.validate(course, schema);
}

// TODO get a comparison between parseInt(), Number() and unary operator +

// TODO install Postman extension for Chrome to be able to send requests manually anywhere