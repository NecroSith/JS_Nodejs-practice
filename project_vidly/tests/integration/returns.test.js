const request = require('supertest');
const { Rental } = require('../../models/rentals');
const { User } = require('../../models/users');
const mongoose = require('mongoose');

describe('/api/returns', () => {
    let server;
    let customerId;
    let movieId;
    let rental;

    beforeEach(async() => {
        server = require('../../index');

        customerId = mongoose.Types.ObjectId();
        movieId = mongoose.Types.ObjectId();

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
        // let token;

        const exec = async() => {
            return await request(server)
                .post('/api/returns')
                // .set('x-auth-token', token)
                .send({
                    customerId,
                    movieId
                });
        }

        beforeEach(() => {
            // token = new User().generateAuthToken();
        });

        it('should return 401 if client is not logged in', async() => {
            // token = '';

            const res = await exec();

            expect(res.status).toBe(401);
        });
    });
});