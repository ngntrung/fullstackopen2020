import React, {useState} from 'react'
const Blog = ({blog, likeBlog, removeBlog}) => {
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
  const hideWhenVisible = { display : visible ? 'none' : '' }
  const showWhenVisible = { display : visible ? '' : 'none'}

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
    removeBlog({
      id: blog.id,
      user: blog.user
    })
  }

  return (
    <div style={blogStyle}>
    <div>
      {blog.title} {blog.author} <button onClick = {toggleDetail} > {buttonText} </button>
    </div>
    <div style={showWhenVisible}>
      <p>{blog.url}</p>
      <p>likes {blog.likes} <button onClick = {likeEvent}>like</button></p>
      <p>{blog.user ? blog.user.name : 'loading name...'}</p>
      <button onClick = {removeEvent}>remove</button>
    </div>
  </div>
  )
    
}

export default Blog