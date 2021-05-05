import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import Toggle from './Toggle'
import { loginUser } from '../reducer/loginReducer'
import { setNoti } from '../reducer/notificationReducer'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'


const LoginForm = () => {
  const dispatch = useDispatch()
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
    try{
      dispatch(loginUser({
        username, password
      }))
      dispatch(setNoti('Login Successful', 'success', 5))
    }catch(exception){
      dispatch(setNoti('Wrong Credentials', 'error', 5))
    }
    setUsername('')
    setPassword('')
  }
  return (
    <div>
      <Toggle buttonLabel = 'login'>
        <form onSubmit = {handleLogin}>
          <Grid container alignItems='center' alignContent='flex-start' spacing={2}>
            <Grid item>
              <TextField label='Username' margin='normal' id="username" type="text" value={username} name="Username" onChange={handleUsernameChange} required/>
            </Grid>
            <Grid item>
              <TextField label='Password' margin='normal' id="password" type="password" value={password} name="Password" onChange={handlePasswordChange} required/>
            </Grid>
            <Grid item>
              <Button variant='contained' color='primary' id="loginButton" type="submit">Login</Button>
            </Grid>
          </Grid>
        </form>
      </Toggle>
    </div>
  )
}

export default LoginForm