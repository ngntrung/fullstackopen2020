import loginService from '../services/login'
import blogService from '../services/blogs'

const loginReducer = (state = null, action) => {
  switch(action.type){
  case 'SET_USER':
    return action.data
  case 'LOGIN_USER':
    return action.data
  default:
    return state
  }
}

export const setUser = (user) => {
  return async dispatch => {
    await dispatch({
      type: 'SET_USER',
      data: user,
    })
  }
}

export const loginUser = (loginObject) => {
  return async dispatch => {
    const response = await loginService(loginObject)
    window.localStorage.setItem('loggedBlogUser', JSON.stringify(response))
    blogService.setToken(response.token)
    dispatch({
      type: 'LOGIN_USER',
      data: response.user
    })
  }
}

export default loginReducer