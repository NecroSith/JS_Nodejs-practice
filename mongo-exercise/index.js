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
        .find({ isPublished: true, tags: 'backend' })
        .select({ name: 1, author: 1 })
        .sort({ name: 1 });
}

async function run() {
    const getData = await getCourse();
    console.log(getData);

}

run();