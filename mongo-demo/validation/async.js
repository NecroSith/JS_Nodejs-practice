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
        enum: ['web', 'mobile', 'network'],
        required: true,
        lowercase: true,
        trim: true
    },
    author: String,
    // Here goes custom async validator
    // to ensure that the user passes unempty array
    tags: {
        type: Array,
        validate: {
            // Here we make sure that the code is asynchronos
            isAsync: true,
            validator: function(value, callback) {
                setTimeout(() => {
                    // Some async stuff going on here
                    const result = value && value.length > 0;
                    callback(result);
                }, 4000)
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
        max: 1000,
        // getter is called each time price is called
        // getter is useful if we have a document in db with not rounded data before we made this functionality
        get: v => Math.round(v),
        set: v => Math.round(v)
    }
});

const Course = mongoose.model('Course', courseSchema);


async function createCourse() {
    const course = new Course({
        name: 'Angular Course',
        category: 'WEB',
        author: 'Mosh',
        tags: ['frontend'],
        isPublished: true,
        price: 666
    });

    try {
        const result = await course.save();
        console.log(result);
        // we iterate through all error properties
    } catch (err) {
        for (const field in err.errors) {
            // remove .message to get full error object
            console.log(err.errors[field]).message;
        }
    }

}

createCourse();