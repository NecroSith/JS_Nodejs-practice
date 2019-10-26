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
        // name: 'Angular Course',
        author: 'Mosh',
        tags: ['angular', 'frontend'],
        isPublished: true
    });

    // If you don't have a valid course data, e.g. course without name
    // this will catch it
    try {
        // const result = await course.save();
        // console.log(result);

        // You can also trigger validation manually
        await course.validate();
    } catch (err) {
        console.log(err.message);
    }

}

createCourse();