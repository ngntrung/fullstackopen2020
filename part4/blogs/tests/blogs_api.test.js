const { request } = require('express')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog_model')
const User = require('../models/user_model')
const api = supertest(app)

const initialBlogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
      },
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
      },
      {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
      },
      {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
      },
      {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
      }
      
]
let token = null

beforeEach(async () => {
    
    await Blog.deleteMany({})
    
    const blogObjects = initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)

})

beforeEach(function(done){
    api
        .post('/api/login')
        .send({
            username: "usertest",
            password: "password"
        })
        .end((error, response) => {
            token = response.body.token
            done()
        })
})

test('GET request to the api', async() => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('unique identifier property', async() => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
})

test('POST request to the api', async() => {
    const blogObject = {
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    }

    await api
        .post('/api/blogs')
        .set('Authorization', 'bearer ' + token)
        .send(blogObject)
        .expect(201)
    const response = await api.get('/api/blogs')
    const content = response.body.map(r => r.title)
    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(content).toContain('Type wars')
})

test('verify likes property', async() => {
    const blogObject = {
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        __v: 0
    }
    
    await api
        .post('/api/blogs')
        .set('Authorization', 'bearer ' + token)
        .send(blogObject)
        .expect(201)
    
    const response = await api.get('/api/blogs')
    const content = response.body.find(r => r.title === 'Type wars')
    const properties = Object.keys(content)
    expect(properties).toContain('likes')
    expect(content.likes).toBe(0)
})

test('verify title and url properties', async() => {
    const blogObject = {
        author: "Robert C. Martin",
        likes: 2,
        __v: 0
    }

    await api
        .post('/api/blogs')
        .set('Authorization', 'bearer ' + token)
        .send(blogObject)
        .expect(400)
})

test('verify authentication', async () => {
    const blogObject = {
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        __v: 0
    }

    await api
        .post('/api/blogs')
        .send(blogObject)
        .expect(401)
})

afterAll(() => {
    mongoose.connection.close()
})