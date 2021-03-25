const User = require('../models/user_model')
const jwt = require('jsonwebtoken')
const userExtractor = async (request, response, next) => {
    const authorization = request.get('authorization')

    if(request.method === 'POST' && !authorization){
        return response.status(401).json({error: 'Unauthorized'})
    }
    
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      token = authorization.substring(7)
      const decodedToken = jwt.verify(token, process.env.SECRET)
      if (decodedToken.id === undefined) {
        return response.status(401).json({error: 'token missing or invalid'})
      } else {
        request.user = await User.findById(decodedToken.id)
      }   
      }
    
    next()
}

module.exports = {
    userExtractor
}