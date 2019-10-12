const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const config = require('config');

const express = require('express');

const helmet = require('helmet');
const morgan = require('morgan');

const logger = require('./logger');

const Joi = require('joi');
const app = express();

// Activate pug template engine for our app
app.set('view engine', 'pug');

// Specify the location of the pug files to be taken by the server
app.set('views', './pug-demo/views');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());

console.log('App name: ' + config.get('name'));
console.log('App mail: ' + config.get('mail.host'));
console.log('Mail pass: ' + config.get('mail.password'));


console.log(process.env.NODE_ENV);
const env = app.get('env');

if (env === 'development') {
    app.use(morgan('short'));
    startupDebugger('Morgan enabled');
    dbDebugger('Connecting to the database...');
}

app.use(logger);

const port = process.env.PORT || 3001;

const courses = [{ id: 1, name: 'course1' }, { id: 2, name: 'course2' }, { id: 3, name: 'course3' }, { id: 4, name: 'course4' }, { id: 5, name: 'course5' }];

app.get('/', (req, res) => {
    res.render('index', { title: "My express app", message: 'Hello there!' });
})

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(course => course.id === parseInt(req.params.id));
    res.send(course);
    if (!course) {
        return res.status(404).send('The course with the given id was not found');
    }
})

app.post('/api/courses', (req, res) => {
    const { error } = validateCourse(req.body);
    if (!error) {
        return res.status(400).send(error.details[0].message);
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(course => course.id === parseInt(req.params.id));
    if (!course) {
        return res.status(404).send('The course with the given id was not found');
    }

    const { error } = validateCourse(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

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