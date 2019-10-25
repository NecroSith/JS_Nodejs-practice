const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(() => console.log('Connected to the database'))
    .catch(err => console.log('Error: ', err));

const courseSchema = new mongoose.Schema({
    name: String,
    date: { type: Date, default: Date.now },
    tags: [String],
    author: String,
    isPublished: Boolean,
    price: Number
});

const Course = mongoose.model('Course', courseSchema);

async function getCourse() {
    return await Course
        .find({ isPublished: true, tags: { $in: ['backend', 'frontend'] } })
        .select({ name: 1, author: 1, price: -1, tags: 1 })
        .sort({ price: -1 });
}

async function run() {
    const getData = await getCourse();
    console.log(getData);

}

run();