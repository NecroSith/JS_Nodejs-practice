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
    afterEach(() => {
        // shutting down the server
        server.close();
    });
    describe('GET /', () => {
        it('should return all genres', async() => {
            // Populating test DB with test data
            await Genre.collection.insertMany([
                    { name: 'genre1' },
                    { name: 'genre2' },
                    { name: 'genre3' },
                ])
                // request simulates request to the server
            const res = await request(server).get('/api/genres');
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(3);
        });
    });
});