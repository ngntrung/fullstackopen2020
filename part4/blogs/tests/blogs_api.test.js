const mongoose = require('mongoose')
const supertest = require('supertest')
const controller = require('../index')

const api = supertest(controller)

test('GET request to the api', async() => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

afterAll(() => {
    mongoose.connection.close()
})