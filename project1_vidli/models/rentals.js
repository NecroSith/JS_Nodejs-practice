const mongoose = require('mongoose');
const Joi = require('joi');

const rentalsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    customer: {
        // We don't link to the schema cause
        // potentially customer schema can have tens of properties
        // and we want specific ones here
        // which we can manually define in this inner schema
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 50
            },
            isGold: {
                type: Boolean,
                default: false
            },
            phone: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 255
            }
        }),
        required: true
    },
    movie: {
        type: new mongoose.Schema({
            title: {
                type: String,
                required: true,
                trim: true,
                minlength: 5,
                maxlength: 255
            },
            dailyRentalRate: {
                type: Number,
                required: true,
                min: 0,
                max: 255
            }
        }),
        required: true
    },
    dateOut: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateReturned: {
        type: Date
    },
    rentalFee: {
        type: Number,
        min: 0
    }
});

const Rental = mongoose.model('Rental', rentalsSchema);

// We validate only two values because
// we don't want user to mess with dates -they must be set server-side
function validateInput(input) {
    const schema = {
        customerId: Joi.string().required(),
        movieId: Joi.string().required()
    };

    return Joi.validate(input, schema);
}

module.exports.Rental = Rental;
module.exports.validate = validateInput;