import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addBlogReducer } from '../reducer/blogReducer'
import { setNoti } from '../reducer/notificationReducer'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '320',
    },
  },
}))

const BlogForm = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [newBlogTitle, setBlogTitle] = useState('')
  const [newBlogAuthor, setBlogAuthor] = useState('')
  const [newBlogUrl, setBlogUrl] = useState('')

  const handleBlogTitle = (event) => {
    setBlogTitle(event.target.value)
  }

  const handleBlogAuthor = (event) => {
    setBlogAuthor(event.target.value)
  }

  const handleBlogUrl = (event) => {
    setBlogUrl(event.target.value)
  }
  const addBlog = (event) => {
    event.preventDefault()
    try{
      dispatch(addBlogReducer({
        title: newBlogTitle,
        author: newBlogAuthor,
        url: newBlogUrl,
      }))
      dispatch(setNoti(`a new blog ${newBlogTitle} by ${newBlogAuthor} added`, 'success', 5))
    }catch (exception) {
      dispatch(setNoti(exception, 'error', 5))
    }
    setBlogTitle('')
    setBlogAuthor('')
    setBlogUrl('')

  }

  return (
    <div>
      <form onSubmit = {addBlog} className={classes.root} noValidate autoComplete="on">
        <TextField required id="title" fullWidth variant='standard' label="title" defaultValue="Blog Title" value = {newBlogTitle} onChange = {handleBlogTitle}/>
        <TextField required id="author" fullWidth variant='standard' label="author" defaultValue="Author" value = {newBlogAuthor} onChange = {handleBlogAuthor}/>
        <TextField required id="info" fullWidth variant='standard' label="url" defaultValue="Blog Info" value = {newBlogUrl} onChange = {handleBlogUrl}/>
        <Box mt={3}>
          <Button variant='contained' color='primary' type = "submit">Save</Button>
        </Box>
      </form>
    </div>
  )
}

export default BlogForm