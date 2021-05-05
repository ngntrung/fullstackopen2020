import { React, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setNoti } from '../reducer/notificationReducer'
import { likeBlogReducer, removeBlogReducer } from '../reducer/blogReducer'
import { Route, Switch, Link, useParams, useHistory } from 'react-router-dom'
import BlogForm from './BlogForm'
import CommentForm from './CommentForm'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Modal from '@material-ui/core/Modal'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  root: {
    minWidth: 275,
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #d9d9d9',
    borderRadius: 4,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}))

function rand() {
  return Math.round(Math.random() * 20) - 10
}


function getModalStyle() {
  const top = 30 + rand()
  const left = 45 + rand()

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  }
}


const Blogs = () => {
  const classes = useStyles()
  const [modalStyle] = useState(getModalStyle)
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()
  const history = useHistory()
  const blogs = useSelector(state => state.blogs)
  const loginUser = useSelector(state => state.login)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  if (!blogs){
    return null
  }

  const likeBlog = (blogObject) => {
    try{
      dispatch(likeBlogReducer(blogObject))
      dispatch(setNoti(`You just liked ${blogObject.title}`, 'success', 5))
    }catch (exception) {
      dispatch(setNoti(exception, 'error', 5))
    }
  }
  const removeBlog = async(blogObject) => {
    try{
      dispatch(removeBlogReducer(blogObject))
      dispatch(setNoti(`You just removed ${blogObject.title}`, 'success', 5))
      history.push('/blogs')
    } catch (exception) {
      dispatch(setNoti(exception, 'error', 5))
    }
  }
  const createBlog = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="createBlog-modal-title">Create a new blog</h2>
      <BlogForm />
    </div>
  )
  return(
    <div>
      <Switch>
        <Route path='/blogs/:id'>
          <BlogDetail blogs={blogs} likeBlog={likeBlog} removeBlog={removeBlog} loginUser={loginUser} />
        </Route>
        <Route path='/'>
          <Box mt={3} mb={3} pl={2}>
            <Grid container direction='row' justify='space-between' alignItems='center' spacing={1}>
              <Grid container item xs={3} spacing={3}>
                <Typography variant='h3'>Blog app</Typography>
              </Grid>
              <Grid container item xs={3} spacing={3}>
                <Button onClick={handleOpen} variant='contained' color='primary'>
                      create a new blog
                </Button>
              </Grid>
            </Grid>
          </Box>
          <Modal open={open} onClose={handleClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
            {createBlog}
          </Modal>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label='blogs table'>
              <TableBody>
                {blogs.map(blog =>
                  <TableRow key={blog.id}>
                    <TableCell><Link to={`/blogs/${blog.id}`} key={blog.id}> {blog.title} - {blog.author} </Link> </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Route>
      </Switch>
    </div>
  )
}

const BlogDetail = ({ blogs, likeBlog, removeBlog, loginUser }) => {
  const classes = useStyles()
  const blog = blogs.find(blog => blog.id === useParams().id)
  if (!blog) {
    return null
  }
  const removeEvent = (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title}`)){
      removeBlog({
        id: blog.id,
        title: blog.title,
      })
    }
  }
  const likeEvent = (event) => {
    event.preventDefault()
    likeBlog({
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      user: blog.user.id,
      likes: blog.likes + 1
    })
  }
  return (
    <div>
      <Card className={classes.root} variant='outlined'>
        <CardContent>
          <Typography variant='h5' color='textPrimary' gutterBottom>
            {blog.title} - {blog.author}
          </Typography>
          <Typography variant='body1' color='textPrimary' gutterBottom>
            {blog.url}
          </Typography>
          <div style={{ margin: 8 }}>
            <Typography variant='body1' color='textPrimary' gutterBottom>
              {blog.likes} likes
            </Typography>
            <Button variant='outlined' color='primary' onClick={likeEvent}>like</Button>
          </div>
          <Typography variant='body1' color='textPrimary' gutterBottom>
              added by {blog.user.name}
          </Typography>
        </CardContent>

        <CardContent>
          <Typography variant='h6' color='textPrimary' gutterBottom>
            Comments
          </Typography>
          <CommentForm blogId={blog.id} />
          {
            blog.comments ?
              <ul>
                {blog.comments.map((comment) => <li key={comment.id}>{comment.comment}</li>)}
              </ul>
              :
              <p>no comment yet!</p>
          }
        </CardContent>
        <CardActions>
          { loginUser && loginUser.id === blog.user.id ? <Button variant='contained' color='secondary' onClick = {removeEvent}>remove blog</Button> : null }
        </CardActions>
      </Card>
    </div>
  )
}
/*
const Blog = ({ blog }) => {

  return (
    <div className='blogItem'>
      {blog.title} {blog.author}
    </div>
  )
}
*/

export default Blogs