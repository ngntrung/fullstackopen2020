import React, {useState} from 'react'
const Blog = ({blog, likeBlog, removeBlog, loggedinUser}) => {
  
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
    if (window.confirm(`Remove blog ${blog.title}`)){
      removeBlog({
        id: blog.id
      })
    }
  }

  return (
    <div style={blogStyle}>
    <div>
      {blog.title} {blog.author} <button onClick = {toggleDetail} > {buttonText} </button>
    </div>
    <div style={showWhenVisible}>
      <p>{blog.url}</p>
      <p>likes {blog.likes} <button onClick = {likeEvent}>like</button></p>
      <p>{blog.user.name}</p>
      <div>{blog.user && loggedinUser.user.id === blog.user.id ? <button onClick = {removeEvent}>remove</button> : null }</div>
    </div>
  </div>
  )
    
}

export default Blog