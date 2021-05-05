import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addCommentReducer } from '../reducer/blogReducer'
import { setNoti } from '../reducer/notificationReducer'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'

const CommentForm = ({ blogId }) => {
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')

  const handleComment = (event) => {
    setComment(event.target.value)
  }

  const addComment = (event) => {
    event.preventDefault()
    try{
      dispatch(addCommentReducer({
        comment,
        blogId
      }))
      dispatch(setNoti(`a new comment ${comment} added`, 'success', 5))
    }catch (exception) {
      console.log(exception)
      dispatch(setNoti(exception, 'error', 5))
    }
    setComment('')
  }

  return (
    <div>
      <form onSubmit = {addComment}>
        <TextField value = {comment} onChange = {handleComment} name = "comment"  variant='outlined' rows={3} multiline fullWidth margin='normal'/>
        <Grid container justify='flex-end'>
          <Grid item>
            <Button  variant='outlined' color='secondary' type = "submit">Add Comment</Button>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}

export default CommentForm