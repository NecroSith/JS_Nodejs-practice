const request = require('supertest');
const { Movie } = require('../../models/movies');
const { Rental } = require('../../models/rentals');
const { User } = require('../../models/users');
const mongoose = require('mongoose');
const moment = require('moment');

describe('/api/returns', () => {
    let server;
    let customerId;
    let movieId;
    let rental;
    let token;
    let movie;

    const exec = async() => {
        return await request(server)
            .post('/api/returns')
            .set('x-auth-token', token)
            .send({
                customerId,
                movieId
            });
    }

    beforeEach(async() => {
        server = require('../../index');

        customerId = mongoose.Types.ObjectId();
        movieId = mongoose.Types.ObjectId();

        token = new User().generateAuthToken();

        movie = new Movie({
            _id: movieId,
            title: 'movie',
            dailyRentalRate: 2,
            genre: {
                name: 'genre'
            },
            numberInStock: 10
        })

        rental = new Rental({
            title: 'rental1',
            customer: {
                _id: customerId,
                name: 'Johnny',
                phone: '12345'
            },
            movie: {
                _id: movieId,
                title: 'Movie',
                dailyRentalRate: 2
            }
        });

        await rental.save();
    });

    afterEach(async() => {
        await server.close();
        await Rental.remove({});
        await Movie.remove({});
    });

    describe('POST /api/returns', async() => {

        it('should return 401 if client is not logged in', async() => {
            token = '';

            const res = await exec();

            expect(res.status).toBe(401);
        });

        it('should return 400 if customerId not provided', async() => {
            customerId = '';

            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should return 400 if movieId not provided', async() => {
            movieId = '';

            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should return if 404 no rental found on customer/movie', async() => {
            await Rental.remove({});

            const res = await exec();

            expect(res.status).toBe(404);
        });

        it('should return 400 if rental has been already processed', async() => {
            rental.dataReturned = new Date();
            await rental.save();

            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should return 200 if request is valid', async() => {
            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should set returnDate if input is valid', async() => {
            const res = await exec();

            const rentalinDb = await Rental.findById(rental._id);

            // we need to check if the dateReturned is valid
            // dateReturned should contain the date and time when the movie was returned
            // but if we init date here to check it - it will already be different
            // so we need to find the difference between the date we get here
            // and the date we receive from rentals router
            // and check if is more than, let's say, 10 seconds

            const diff = new Date() - rentalinDb.dateReturned;

            expect(diff).toBeLessThan(10000);
        });

        it('should set rentalFee if input is valid', async() => {
            rental.dateOut = moment().add(-7, 'days').toDate();
            await rental.save();

            const res = await exec();

            const rentalinDb = await Rental.findById(rental._id);
            expect(rentalinDb.rentalFee).toBe(14);
        });

        it('should increase movie stock if input is valid', async() => {

            const res = await exec();

            const movieInDb = await Rental.findById(movieId);
            expect(movieInDb.numberInStock).toBe(movie.numberInStock + 1);
        });
    });
});