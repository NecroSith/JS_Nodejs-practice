// supertest is needed to simulate requests
const request = require('supertest');
const { Genre } = require('../../models/genres');

let server;

describe('/api/genres', () => {
    // beforeEach is called before each test inside test block
    beforeEach(() => {
        server = require('../../index');
    });

    // afterEach is called after each test, obviously
    afterEach(async() => {
        // shutting down the server
        server.close();

        // cleaning up test DB
        await Genre.remove({});
    });
    describe('GET /', () => {
        it('should return all genres', async() => {
            // Populating test DB with test data
            await Genre.collection.insertMany([
                { name: 'genre1' },
                { name: 'genre2' },
                { name: 'genre3' },
            ]);
            // request simulates request to the server
            const res = await request(server).get('/api/genres');
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(3);

            // Check if there are genres in the response
            expect(res.body.some(g => g.name === 'genre1')).toBeTruthy();
            expect(res.body.some(g => g.name === 'genre2')).toBeTruthy();
            expect(res.body.some(g => g.name === 'genre3')).toBeTruthy();
        });
    });

    describe('GET /:id', () => {
        it('should return a genre if valid id is passed', async() => {
            const genre = new Genre({ name: 'genre1' });
            await genre.save();

            const res = await request(server).get('/api/genres/' + genre._id);

            expect(res.status).toBe(200);

            // this will fail because jest stores id as array of numbers but mongo - as a string
            expect(res.body).toMatchObject(genre);

            // expect(res.body).toHaveProperty('name', genre.name);
        });
    });
});