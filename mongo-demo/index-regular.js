// Mongoose is an extension for node to handle work with mongdb
const mongoose = require('mongoose');

// Connect to the db, specifying its name
mongoose.connect('mongodb://localhost/test')
    .then(() => console.log(('Conected to MongoDB')))
    .catch(err => console.log('Something went wrong:', err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);


async function createCourse() {
    const course = new Course({
        name: 'Angular Course',
        author: 'Mosh',
        tags: ['angular', 'frontend'],
        isPublished: true
    });

    const result = await course.save();
    console.log(result);
}

// Querying
async function getCourses() {

    const courses = await Course
        // Get all courses whose author starts with Mosh
        // i in the end indicates case insensitivity
        .find({ author: /^Mosh/i })
        // Get courses whose name ends with Hamedani
        .find({ author: /Hamdani$/i })
        // get all courses whose name contains Mosh
        .find({ author: /.*Mosh*./i })
        .or([{ author: 'Mosh' }, { isPublished: true }])
        .limit(10)
        .sort({ name: 1 })
        .select({ name: 1, tags: 1 })
    console.log(courses);
}

getCourses();