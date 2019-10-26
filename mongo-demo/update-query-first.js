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

async function getCourses() {
    const courses = await Course
        .find()
        .skil((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .sort({ name: 1 })
        .select({ name: 1, tags: 1 })
        .count()
    console.log(courses);
}

// Query first appoach to update documents in a database
// firstly we need to make a query
// and change some data after
async function updateCourse(id) {
    const course = await Course.findById(id);
    if (!course) return;
    // Two approaches of updating
    course.isPublished = true;
    course.set({
        author: 'Yan'
    });

    const result = await course.save();
    console.log(result);
}

updateCourse('5db0a2599724722c9ce195f1');