import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const Notification = ({message, type}) => (

  <div className= 'notification success'>
    <h1>{message}</h1>
  </div>

)
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
  const loginForm = () => {
    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit = {handleLogin}>
          <div>
            username
              <input type="text" value={username} name="Username" onChange={({target}) => setUsername(target.value)}/>
          </div>
          <div>
            password
              <input type="password" value={password} name="Password" onChange={({target}) => setPassword(target.value)}/>
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    )
  }

  const blogForm = () => (
    <div>
      <h2>create new</h2>
      <form onSubmit = {addBlog}>
        <div>
          title
          <input value = {newBlogTitle} onChange = {({target}) => setBlogTitle(target.value)} name = "title" />
        </div>
        <div>
          author
          <input value = {newBlogAuthor} onChange = {({target}) => setBlogAuthor(target.value)} name = "author" />
        </div>
        <div>
          url
          <input value = {newBlogUrl} onChange = {({target}) => setBlogUrl(target.value)} name = "url" />
        </div>
        <button type = "submit">Save</button>
      </form>
    </div>
    
  )

  return (
    <div>
    <Notification message = {errorMessage} />
    {
      user === null ?
        loginForm() :
        <div>
          <h2>blogs</h2>
          <p>{user.name} logged in <button onClick = {logoutEvent}>Logout</button></p>
          {blogForm()}
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
  
        </div>
        
    }
      
    </div>
  )
}

export default App