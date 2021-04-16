import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { likeItem } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state).sort(function(a, b){
    return b.votes - a.votes
  })
  return (

    anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
        has {anecdote.votes}
          <button onClick={() => dispatch(likeItem(anecdote.id)) }>vote</button>
        </div>
      </div>
    )
  )
}

export default AnecdoteList
