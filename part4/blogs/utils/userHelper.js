const Blog = require('../models/blog_model')
const User = require('../models/user_model')

const blogssInDb = async () => {
    const notes = await Blog.find({})
    return notes.map(blog => blog.toJSON())
  }
  
  const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
  }

module.exports = {
    blogssInDb, usersInDb,
}