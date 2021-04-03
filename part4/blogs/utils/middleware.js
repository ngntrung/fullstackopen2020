const User = require('../models/user_model')
const jwt = require('jsonwebtoken')

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'invalid token' })
  }

  next(error)
}

const userExtractor = async (request, response, next) => {
    console.log('test request', request)
    const authorization = request.get('authorization')
    console.log('Authorization', authorization)
    if(request.method === 'POST' && !authorization){
        return response.status(401).json({error: 'Unauthorized'})
    }
    
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      token = authorization.substring(7)
      const decodedToken = jwt.verify(token, process.env.SECRET)
      if (decodedToken.id === undefined) {
        console.log('Token is missing')
        return response.status(401).json({error: 'token missing or invalid'})
      } else {
        request.user = await User.findById(decodedToken.id)
        console.log('middle ware user', request.user)
      }   
      }
    
    next()
}

module.exports = {
    userExtractor
}