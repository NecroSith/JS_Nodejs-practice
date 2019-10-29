// Mongoose is an extension for node to handle work with mongdb
const mongoose = require('mongoose');

// Connect to the db, specifying its name
mongoose.connect('mongodb://localhost/test')
    .then(() => console.log(('Conected to MongoDB')))
    .catch(err => console.log('Something went wrong:', err));

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255,
        // match: /pattern/
    },
    category: {
        type: String,
        // when validating a script 
        // if the item doesn't have at least one of the categories
        // there will be a validation error
        enum: ['web', 'mobile', 'network']
    },
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    // Price will be required if the course is published
    // * No arrow functions here!
    price: {
        type: Number,
        required: function() {
            this.isPublished;
        },
        min: 10,
        max: 1000
    }
});

const Course = mongoose.model('Course', courseSchema);


async function createCourse() {
    const course = new Course({
        name: 'Angular Course',
        category: '-',
        author: 'Mosh',
        tags: ['angular', 'frontend'],
        isPublished: true,
        price: 666
    });

    // If you don't have a valid course data, e.g. course without name
    // this will catch it
    try {
        const result = await course.save();
        console.log(result);

        // You can also trigger validation manually
        //await course.validate();
    } catch (err) {
        console.log(err.message);
    }

}

createCourse();