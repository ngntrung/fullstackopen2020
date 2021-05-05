const bcrypt = require('bcrypt')
const User = require('../models/user_model')
const helper = require('../utils/userHelper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const mongoose = require('mongoose')

//...

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    try{
      await User.deleteMany({})
    } catch (exception) {
      console.log(exception)
    }
    

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()
 
    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('valid user creation', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'db',
      name: 'Dumbledore Bold',
      password: 'pw',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
    
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toEqual(expect.not.stringContaining(newUser.username))
  })
afterAll((done) => {
  mongoose.connection.close()
})
})

