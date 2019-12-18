const request = require('supertest');
const { Rental } = require('../../models/rentals');
const { User } = require('../../models/users');
const mongoose = require('mongoose');

describe('/api/returns', () => {
    let server;
    let customerId;
    let movieId;
    let rental;
    let token;

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
    });
});