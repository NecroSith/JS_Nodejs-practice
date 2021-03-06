const mongoose = require('mongoose');
const Joi = require('joi');
const moment = require('moment');

// Here is the use of a special package of Joi
// It's designed to validate object Ids
Joi.objectId = require('joi-objectid')(Joi);


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

// here we create static methods of Rental class
// statics method lets us create our own methods
// we create lookup static method here
rentalsSchema.statics.lookup = function(customerId, movieId) {
    return this.findOne({
        'customer._id': customerId,
        'movie._id': movieId
    });
}

// we create instance method here
rentalsSchema.methods.return = function() {
    this.dateReturned = new Date();
    this.rentalFee = moment().diff(this.dateOut, 'days') * this.movie.dailyRentalRate;

}

const Rental = mongoose.model('Rental', rentalsSchema);
// We validate only two values because
// we don't want user to mess with dates -they must be set server-side
function validateInput(input) {
    const schema = {
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required()
    };

    return Joi.validate(input, schema);
}

module.exports.Rental = Rental;
module.exports.validate = validateInput;