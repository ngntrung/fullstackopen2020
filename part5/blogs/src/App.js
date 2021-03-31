import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Toggle from './components/Toggle'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import loginService from './services/login'
import blogService from './services/blogs'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)

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

  const handleLogin = async (loginObject) => {
    try {
      const user = await loginService.login(
        loginObject
      )
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      setErrorMessage('Wrong Credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  const blogFormRef = useRef()
  const addBlog = async (blogObject) => {
    try{
      const blog = await blogService.create(blogObject)
      setBlogs(blogs.concat(blog))
      setErrorMessage(`a new blog ${blog.title} by ${blog.author} added`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      console.log(blogFormRef.current)
      blogFormRef.current.toggleVisibility()

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
          <LoginForm loginEvent={handleLogin}/>
        </Toggle>
      </div>
      :
      <div>
        <h2>blogs</h2>
        <p>{user.name} logged in <button onClick = {logoutEvent}>Logout</button></p>
        <Toggle buttonLabel = 'new blog' ref={blogFormRef}>
          <BlogForm createBlog={addBlog} />
        </Toggle>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} user= {blog.user} />
        )}
      </div>
    }
      
    </div>

  )
}

export default App