import React from 'react'
import { useSelector } from 'react-redux'
import { Switch, Route, Link, useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  root: {
    minWidth: 275,
  },
})

const Users = () => {
  const users = useSelector(state => state.users)

  if (!users) {
    return null
  }
  return (
    <div>
      <Switch>
        <Route path='/users/:id'>
          <User users={users}/>
        </Route>
        <Route path='/users'>
          <UserList users={users}/>
        </Route>
      </Switch>
    </div>
  )
}
const UserList = ({ users }) => {
  const classes = useStyles()
  return (
    <div>
      <Box mt={3} mb={3} pl={2}>
        <Grid container direction='row' justify='flex-start' alignItems='center' spacing={1}>
          <Grid container item xs={3} spacing={3}>
            <Typography variant='h3'>Users</Typography>
          </Grid>
        </Grid>
      </Box>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label='users table'>
          <TableHead>
            <TableRow>
              <TableCell>name</TableCell>
              <TableCell>blogs created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user =>
              <TableRow key={user.id}>
                <TableCell><Link to={`users/${user.id}`}>{user.name} </Link> </TableCell>
                <TableCell>{user.blogs.length}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
const User = ({ users }) => {
  const classes = useStyles()
  const user = users.find(u => u.id === useParams().id)
  if(!user){
    return null
  }
  return (
    <div>
      <Card className={classes.root} variant='outlined'>
        <CardContent>
          <Typography variant='h3' color='textPrimary' gutterBottom>
            {user.name}
          </Typography>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label='blogs table'>
              <TableHead>
                <TableRow>
                  <TableCell>Added blogs</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {user.blogs.map(blog =>
                  <TableRow key={blog.id}>
                    <TableCell><Link to={`/blogs/${blog.id}`}>{blog.title} </Link> </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </div>
  )
}

export default Users