const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user_model')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users)
})


usersRouter.post('/', async (request, response) => {
    const body = request.body
    
    if (body.password === undefined){
        response.status(400).json({error: 'missing password'})
    }
    else if (body.password.length < 3 ){
        response.status(400).json({error: 'invalid password'})
    }
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    })
    try {
        const savedUser = await user.save()
        response.json(savedUser)
    }catch(exception){
        response.status(400).end()
        console.log(exception)
    }
})


module.exports = usersRouter