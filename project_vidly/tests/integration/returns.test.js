const { Rental } = require('../../models/rentals');
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
        server.close();
        await Rental.remove({});
    });

    it('should work', async() => {
        const res = await Rental.findById(rental._id);

        expect(res).not.toBeNull();
    });
});