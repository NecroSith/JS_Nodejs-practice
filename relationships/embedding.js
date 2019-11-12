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
    authors: {
        type: [authorSchema],
        required: true
    }
}));

async function createCourse(name, authors) {
    const course = new Course({
        name,
        authors
    });

    const result = await course.save();
    console.log(result);
}

async function listCourses() {
    const courses = await Course.find();
    console.log(courses);
}

async function addAuthor(courseId, author) {
    const course = await Course.findById(courseId);
    course.authors.push(author);
    course.save();
}

async function removeAuthor(courseId, authorId) {
    const course = await Course.findById(courseId);
    const author = course.authors.id(authorId);
    author.remove();
    course.save();
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

// We can use an array to have multiple authors
// createCourse('Node Course', [
//     new Author({ name: 'Mosh' }),
//     new Author({ name: 'Yan' })
// ]);

// updateAuthor('5dcb0229c6fe622760526714');
// addAuthor('5dcb0229c6fe622760526714', new Author({ name: 'Alex' }));
removeAuthor('5dcb0229c6fe622760526714', '5dcb02678041a413c41fad2f');