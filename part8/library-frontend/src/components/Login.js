import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries.js'

const LoginForm = ({ setToken, show, setPage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [ login, result ] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if ( result.data ) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('libraryUserToken', token)
    }
  }, [result.data]) // eslint-disable-line
  const loginSubmit = async (event) => {
    event.preventDefault()

    login({ variables: { username, password } })
    setPage('authors')
  }
  if (!show) {
    return null
  }
  
  return (
    <div>
      <form onSubmit={ loginSubmit }>
        <div>
          username
          <input value={username} onChange={({ target }) => setUsername(target.value)}/>
        </div>
        <div>
          password
          <input type='password' value={password} onChange={({ target }) => setPassword(target.value)}/>
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default LoginForm