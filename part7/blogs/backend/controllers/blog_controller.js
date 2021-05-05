/* eslint-disable no-undef */
const blogsRouter = require('express').Router()
const Blog = require('../models/blog_model')
const Comment = require('../models/comment_model')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 }).populate('comments', { comment: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const user = request.user
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    user: user
  })

  try{
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
  } catch (error) {
    console.log(error)
    response.status(400).end()
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id)

  if (user._id.toString() === blog.user.toString()){
    try{
      await Blog.deleteOne({ _id: request.params.id })
      response.status(204).end()
    } catch (error){
      response.status(400).end()
    }
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  try{
    await Blog.findByIdAndUpdate(request.params.id, body, { new: true })
    response.status(204).end()
  } catch (error){
    response.status(400).end()
  }
})

blogsRouter.post('/:id/comments/', async (request, response) => {
  const body = request.body
  const blog = await Blog.findById(request.params.id)
  const comment = new Comment({
    comment: body.comment,
    blog: blog
  })

  try{
    const savedComment= await comment.save()
    blog.comments = blog.comments.concat(savedComment._id)
    await blog.save()
    response.status(201).json(savedComment)
  } catch (error) {
    console.log(error)
    response.status(400).end()
  }
})

module.exports = blogsRouter