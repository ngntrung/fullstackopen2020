import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Toggle from './components/Toggle'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [newBlogTitle, setBlogTitle] = useState('')
  const [newBlogAuthor, setBlogAuthor] = useState('')
  const [newBlogUrl, setBlogUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const logoutEvent = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl
    }
    try{
      const blog = await blogService.create(blogObject)
      setBlogTitle('')
      setBlogAuthor('')
      setBlogUrl('')
      setBlogs(blogs.concat(blog))
      setErrorMessage(`a new blog ${blog.title} by ${blog.author} added`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)

    } catch (exception){
      setErrorMessage(exception)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    
  }
  
  return (
    <div>
    <Notification message = {errorMessage} />
    {
      user === null ?
      <div>
        <Toggle buttonLabel = 'login'>
          <LoginForm 
            handleSubmit = {handleLogin}
            username = {username}
            password = {password}
            handleUsernameChange = {({target}) => setUsername(target.value)}
            handlePasswordChange = {({target}) => setPassword(target.value)}
          />
        </Toggle>
      </div>
      :
      <div>
        <h2>blogs</h2>
        <p>{user.name} logged in <button onClick = {logoutEvent}>Logout</button></p>
        <Toggle buttonLabel = 'new blog'>
          <BlogForm
            handleSubmit = {addBlog}
            blogTitle = {newBlogTitle}
            blogAuthor = {newBlogAuthor}
            blogUrl = {newBlogUrl}
            handleBlogTitle = {({target}) => setBlogTitle(target.value)}
            handleBlogAuthor = {({target}) => setBlogAuthor(target.value)}
            handleBlogUrl = {({target}) => setBlogUrl(target.value)}
          />
        </Toggle>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    }
      
    </div>

  )
}

export default App