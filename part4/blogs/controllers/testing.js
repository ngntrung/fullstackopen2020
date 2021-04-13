const router = require('express').Router()
const Blog = require('../models/blog_model')
const User = require('../models/user_model')

router.post('/reset', async (request, response) => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  response.status(204).end()
})

module.exports = router