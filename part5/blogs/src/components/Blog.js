import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, likeBlog, removeBlog, loggedinUser }) => {

  const [visible, setVisibility] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleDetail = () => {
    setVisibility(!visible)
  }

  const buttonText = visible ? 'hide' : 'view'
  const showWhenVisible = { display : visible ? '' : 'none' }

  const likeEvent = (event) => {
    event.preventDefault()
    likeBlog({
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      user: blog.user.id,
      likes: blog.likes + 1
    })
  }

  const removeEvent = (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title}`)){
      removeBlog({
        id: blog.id
      })
    }
  }

  return (
    <div className='blogItem' style={blogStyle}>
      <div className='overview'>
        {blog.title} {blog.author} <button className='toggleView' onClick = {toggleDetail} >{buttonText}</button>
      </div>
      <div style={showWhenVisible} className='moreInfo'>
        <p>{blog.url}</p>
        <p>likes {blog.likes} <button onClick = {likeEvent} className='likeBtn'>like</button></p>
        <p>{blog.user.name}</p>
        <div>{blog.user && loggedinUser.user.id === blog.user.id ? <button id='removeBtn' onClick = {removeEvent}>remove</button> : null }</div>
      </div>
    </div>
  )

}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  /*
  likeBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  */
  loggedinUser: PropTypes.object.isRequired
}

export default Blog