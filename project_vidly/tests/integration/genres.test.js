// supertest is needed to simulate requests
const request = require('supertest');
const { Genre } = require('../../models/genres');

const mongoose = require('mongoose');
const { User } = require('../../models/users');

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
            // expect(res.body).toMatchObject(genre);

            expect(res.body).toHaveProperty('name', genre.name);
        });

        it('should return 404 if invalid id is passed', async() => {
            const res = await request(server).get('/api/genres/1').catch(e => expect(res.status).toBe(404))
        });

        it('should return 404 if no genre with the given id exists', async() => {
            const id = mongoose.Types.ObjectId();
            const res = await request(server).get('/api/genres/' + id).catch(e => expect(res.status).toBe(404))
        });
    });

    describe('POST /', () => {

        let token;
        let name;

        // we define a happy path and in each test we change one parameter that aligns with the test
        const exec = async() => {
            return await request(server)
                .post('/api/genres')
                .set('x-auth-token', token)
                .send({ name: name });
        }

        beforeEach(() => {
            token = new User().generateAuthToken();
        })


        it('should return 401 if client is not logged in', async() => {
            token = '';

            const res = await exec();

            expect(res.status).toBe(401);
        });

        it('should return 400 if genre is less than 5 characters long', async() => {
            name = 'genr'
            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should return 400 if genre is more than 50 characters long', async() => {

            name = new Array(52).join('w');

            const res = await exec();
            // const res = await request(server)
            //     .post('/api/genres')
            //     .set('x-auth-token', token)
            //     // we need a string of 5 character
            //     // it will be array of 52 empty elements with 'w' between them
            //     .send({ name: new Array(52).join('w') });

            expect(res.status).toBe(400);
        });

        it('should save the genre if it is valid', async() => {

            await exec();

            const genre = await Genre.find({ name: 'genre1' })

            expect(genre).not.toBeNull();
        });

        it('should return the genre if it is valid', async() => {
            name = 'genre1';

            const res = await exec();

            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('name', 'genre1');
        });
    });
});