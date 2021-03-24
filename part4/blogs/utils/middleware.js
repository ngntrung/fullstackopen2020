const User = require('../models/user_model')
const jwt = require('jsonwebtoken')
const userExtractor = async (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      token = authorization.substring(7)
      const decodedToken = jwt.verify(token, process.env.SECRET)
      console.log('Auth is',authorization);
      if (!decodedToken.id) {
        return response.status(401).json({error: 'token missing or invalid'})
      } else {
        request.user = await User.findById(decodedToken.id)
        console.log(request.user);
      }   
      }
    
    next()
}

module.exports = {
    userExtractor
}