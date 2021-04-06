import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {

  const [newBlogTitle, setBlogTitle] = useState('')
  const [newBlogAuthor, setBlogAuthor] = useState('')
  const [newBlogUrl, setBlogUrl] = useState('')

  const handleBlogTitle = (event) => {
    setBlogTitle(event.target.value)
  }

  const handleBlogAuthor = (event) => {
    setBlogAuthor(event.target.value)
  }

  const handleBlogUrl = (event) => {
    setBlogUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
    })
    setBlogTitle('')
    setBlogAuthor('')
    setBlogUrl('')

  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit = {addBlog}>
        <div>
                title
          <input id = "blogTitle" value = {newBlogTitle} onChange = {handleBlogTitle} name = "title" />
        </div>
        <div>
                author
          <input id = "blogAuthor" value = {newBlogAuthor} onChange = {handleBlogAuthor} name = "author" />
        </div>
        <div>
                url
          <input id = "blogUrl" value = {newBlogUrl} onChange = {handleBlogUrl} name = "url" />
        </div>
        <button type = "submit">Save</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm