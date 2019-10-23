// Mongoose is an extension for node to handle work with mongdb
const mongoose = require('mongoose');

// Connect to the db, specifying its name
mongoose.connect('mongodb://localhost/test')
    .then(() => console.log(('Conected to MongoDB')))
    .catch(err => console.log('Something went wrong:', err));

// schema is used to specify the fields which will be present 
// in the document in MongoDB
// There are following schema types:
// String, Number, Date
// Buffer (which is used to store a collection of binary data)
// Boolean
// ObjectID (which is used to generate unique id for the record)
// and Array
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});


// Compilation of the schema into a model
// which results in class Course
const Course = mongoose.model('Course', courseSchema);

// Next we create an object 
// which maps a document in MongoDB

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
    // Comparison operators in mongoose
    // eq - equal
    // ne - not equal
    // gt - greater than
    // gte - greater than or equal to
    // lt - less than
    // lte - less than or equal to
    // in
    // nin - not in


    // logical operators
    // or
    // and 
    const courses = await Course
        // .find({ author: 'Mosh' })
        // query all courses which are more that 10 dollars but less than 20
        .find({ price: { $gt: 10, $lte: 20 } }) // $ is indicator that it's an operator
        // query all courses which costs either 10, 15 or 20 dollars only
        .find({ price: { $in: [10, 15, 20] } })
        .find()
        // get all courses which are published or authored by Mosh
        .or([{ author: 'Mosh' }, { isPublished: true }])
        .limit(10)
        .sort({ name: 1 }) // 1 is ascending order, -1 is descending
        .select({ name: 1, tags: 1 }) // Select properties to be returned
        .count()
    console.log(courses);
}

getCourses();