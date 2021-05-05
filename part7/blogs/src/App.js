import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blogs from './components/Blog'
import Users from './components/User'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import { initializeBlogs } from './reducer/blogReducer'
import { setUser } from './reducer/loginReducer'
import { initializeUsers } from './reducer/userReducer'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Box from '@material-ui/core/Box'

import Button from '@material-ui/core/Button'
/*
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
*/
import { makeStyles } from '@material-ui/core/styles'

import './index.css'
/*
function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
}
*/
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}))
const App = () => {
  const dispatch = useDispatch()
  const login = useSelector(state => state.login)
  const classes = useStyles()
  const [value, setValue] = useState(1)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const loggedinUser = JSON.parse(loggedUserJSON)
      dispatch(setUser(loggedinUser.user))
      blogService.setToken(loggedinUser.token)
    }
  }, [])

  const logoutEvent = () => {
    window.localStorage.clear()
    dispatch(setUser(null))
  }

  return (
    <div>
      <Router>
        <div className={classes.root}>
          <AppBar position="static">
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" indicatorColor='secondary' variant='standard' fullwidth='true' textColor='inherit'>
              <Tab label="Users" {...a11yProps(0)} component={Link} to='/users'/>
              <Tab label="Blogs" {...a11yProps(1)} component={Link} to='/blogs'/>
            </Tabs>
          </AppBar>
          <Notification />
        </div>
        <Switch>
          <Route path='/users'>
            <Users />
          </Route>
          <Route path='/'>
            <Blogs />
          </Route>
        </Switch>
      </Router>
      <Box mt={3} pl={2}>
        { login === null ? <div><LoginForm /></div> : <div><span>{login.name} logged in</span>  <Button color='secondary' variant='outlined' onClick = {logoutEvent}>logout</Button></div> }
      </Box>
    </div>

  )
}

export default App