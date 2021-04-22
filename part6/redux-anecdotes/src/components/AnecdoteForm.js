import React from 'react'
import { connect } from 'react-redux'
import { addNewItem } from '../reducers/anecdoteReducer'
import { notiSet } from '../reducers/notificationReducer'

const NewAnecdote = (props) => {
  const submitItem = async (event) => {
    event.preventDefault()
    const content = event.target.content.value
    event.target.content.value = ''
    props.addNewItem(content)
    props.notiSet(`you created ${content}`, 10)
  }
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit = { submitItem }>
        <div><input name='content' /></div>
        <button>create</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  addNewItem, notiSet
}

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(NewAnecdote)

export default ConnectedAnecdoteForm
