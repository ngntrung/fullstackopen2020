import React from 'react'
import { useDispatch } from 'react-redux'
import { addNewItem } from '../reducers/anecdoteReducer'
import { notiSet, notiRemove } from '../reducers/notificationReducer'

const NewAnecdote = () => {
  const dispatch = useDispatch()

  const submitItem = async (event) => {
    event.preventDefault()
    const content = event.target.content.value
    event.target.content.value = ''
    dispatch(addNewItem(content))
    dispatch(notiSet(`you created ${content}`))
    setTimeout(() => dispatch(notiRemove()), 5000)
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

export default NewAnecdote
