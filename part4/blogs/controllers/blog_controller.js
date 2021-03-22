const blogsRouter = require('express').Router()
const Blog = require('../models/blog_model')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)

    try{
      const savedBlog = await blog.save()
      response.status(201).json(savedBlog)
    } catch(error) {
      response.status(400).end()
    }
  })

blogsRouter.delete('/:id', async (request, response) => {
  try{
    await Blog.deleteOne({_id: request.params.id})
    response.status(204).end()
  } catch (error){
    response.status(400).end()
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  try{
    await Blog.findByIdAndUpdate(request.params.id, body, {new: true})
    response.status(204).end()
  } catch (error){
    response.status(400).end()
  }
})

module.exports = blogsRouter