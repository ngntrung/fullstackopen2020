import React, {useState} from 'react'
const Blog = ({blog}) => {
  console.log(blog.user);
  const [visible, setVisibility] = useState(false)
  const [buttonText, setButtonText] = useState('view')
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
    setButtonText('hide')
  }

  const hideWhenVisible = { display : visible ? 'none' : '' }
  const showWhenVisible = { display : visible ? '' : 'none'}

  return (
    <div style={blogStyle}>
    <div>
      {blog.title} {blog.author} <button onClick = {toggleDetail} > {buttonText} </button>
    </div>
    <div style={hideWhenVisible}>
      {blog.url}
      likes {blog.likes} <button>like</button>
      
    </div>
  </div>
  )
    
}

export default Blog