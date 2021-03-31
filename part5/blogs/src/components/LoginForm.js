import React, {useState} from 'react'

const LoginForm = ({loginEvent}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleUsernameChange = (event) => {
        setUsername(event.target.value)
    }
    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }
    const handleLogin = (event) => {
        event.preventDefault()
        loginEvent({
            username, password
        })
        setUsername('')
        setPassword('')
    }
    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit = {handleLogin}>
          <div>
            username
              <input type="text" value={username} name="Username" onChange={handleUsernameChange}/>
          </div>
          <div>
            password
              <input type="password" value={password} name="Password" onChange={handlePasswordChange}/>
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    )
}

export default LoginForm