const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
    name: String,
    bio: String,
    website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
    name: String,
    // We embed a schema into a schema thus making a reference to it
    author: {
        type: authorSchema,
        required: true
    }
}));

async function createCourse(name, author) {
    const course = new Course({
        name,
        author
    });

    const result = await course.save();
    console.log(result);
}

async function listCourses() {
    const courses = await Course.find();
    console.log(courses);
}

async function updateAuthor(courseId) {
    // Here we update the record and embed the new info directly into it
    const course = await Course.update({ _id: courseId }, {
        // set is used to change existing property
        // if needs to delete property, use 'unset'and desired property equal to ''
        $set: {
            'author.name': 'Yan Pustynnyy'
        }
    });
}

// createCourse('Node Course', new Author({ name: 'Mosh' }));
updateAuthor('5dc862cf63a6471590bc6c9d');