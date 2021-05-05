import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import blogReducer from './reducer/blogReducer'
import loginReducer from './reducer/loginReducer'
import notificationReducer from './reducer/notificationReducer'
import userReducer from './reducer/userReducer'

const reducer = combineReducers(
  {
    blogs: blogReducer,
    login: loginReducer,
    notification: notificationReducer,
    users: userReducer,
  }
)

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store