import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { likeItem } from '../reducers/anecdoteReducer'
import { notiSet } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const like = (id, object) => {
    dispatch(likeItem(id))
    dispatch(notiSet(`you voted ${object}`, 5))
  }
  const filter = useSelector(state => state.filter)
  const initialAnecdotes = useSelector(state => state.anecdotes).sort(function(a, b){
    return b.votes - a.votes
  })
  const anecdotes = filter === null ? initialAnecdotes : initialAnecdotes.filter(item => item.content.includes(filter))

  return (
    anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
        has {anecdote.votes}
          <button onClick={() => like(anecdote.id, anecdote.content) }>vote</button>
        </div>
      </div>
    )
  )
}

export default AnecdoteList
