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
        enum: ['web', 'mobile', 'network']
    },
    author: String,
    // Here goes custom validator
    // to ensure that the user passes unempty array
    tags: {
        type: Array,
        validate: {
            // Here we provide a validator function
            // Which must return true, otherwise message will be triggered
            validator: function(value) {
                return v && value.length > 0;
            },
            message: 'A course should have at least one tag'
        }
    },
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
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
        category: 'web',
        author: 'Mosh',
        tags: [],
        isPublished: true,
        price: 666
    });

    try {
        const result = await course.save();
        console.log(result);
    } catch (err) {
        console.log(err.message);
    }

}

createCourse();