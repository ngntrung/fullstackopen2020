import React, {useState} from 'react'
const Blog = ({blog}) => {
  const [visible, setVisibility] = useState(false)
  
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleDetail = () => {
    console.log('hello')
    setVisibility(!visible)
  }
  const buttonText = visible ? 'hide' : 'view'
  const hideWhenVisible = { display : visible ? 'none' : '' }
  const showWhenVisible = { display : visible ? '' : 'none'}

  return (
    <div style={blogStyle}>
    <div>
      {blog.title} {blog.author} <button onClick = {toggleDetail} > {buttonText} </button>
    </div>
    <div style={showWhenVisible}>
      <p>{blog.url}</p>
      <p>likes {blog.likes} <button>like</button></p>
      <p>{blog.user ? blog.user.name : 'loading name...'}</p>
    </div>
  </div>
  )
    
}

export default Blog