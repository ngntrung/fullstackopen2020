const User = require('../models/user_model')
const jwt = require('jsonwebtoken')
const userExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      token = authorization.substring(7)
      const decodedToken = jwt.verify(token, process.env.SECRET)
      console.log('Decoded Id', typeof(decodedToken.id));
      if (!decodedToken.id) {
        return response.status(401).json({error: 'token missing or invalid'})
      } else {
          const userId = User.findById(decodedToken.id)
          console.log('Requested user', userId)
      }
    }
    next()
}

module.exports = {
    userExtractor
}