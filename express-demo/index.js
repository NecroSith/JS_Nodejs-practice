const express = require('express');
const app = express();

// Enabling json parsing feature to be able to parse the request body. This feature is not enabled in Express by default
app.use(express.json());

// Call environmental veriable to get port in case it's dynamic e.g. on a web hosting. Otherwise use port 3001
// You can change PORT value by typing "export PORT=xxxx" in the command line
// Where xxxx is the port number
const port = process.env.PORT || 3001;

const courses = [{ id: 1, name: 'course1' }, { id: 2, name: 'course2' }, { id: 3, name: 'course3' }, { id: 4, name: 'course4' }, { id: 5, name: 'course5' }];

app.get('/', (req, res) => {
    res.send('Hello world!');
});

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
        res.status(404).send('The course with the given id was not found');
    }
})

app.post('/api/courses', (req, res) => {
    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    // As the client need to know about the added object sometimes we send query results to clients by convention
    res.send(course);
})

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});

// TODO get a comparison between parseInt(), Number() and unary operator +