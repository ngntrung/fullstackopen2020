/* eslint-disable no-case-declarations */
/*
const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]


const getId = () => (100000 * Math.random()).toFixed(0)


const asObject = (anecdote) => {
  return {
    content: anecdote,
    votes: 0
  }
}
*/
import anecdoteService from '../services/acnedotes'

export const initialData = () => {
  return async dispatch => {
    const data = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_DATA',
      data
    })

  }
}

export const likeItem = (id) => {
  return async dispatch => {
    const response = await anecdoteService.likeItem(id)
    dispatch({
      type: 'LIKE',
      data: response.data
    })
  }
}

export const addNewItem = content => {
  return async dispatch => {
    const data = await anecdoteService.addItem(content)
    dispatch({
      type: 'ADD_NEW',
      data
    })
  }
}

const reducer = (state = [], action) => {
  switch(action.type){
  case 'LIKE':
    return state.map(item => item.id !== action.data.id ? item : action.data)

  case 'ADD_NEW':
    return [...state, action.data]

  case 'INIT_DATA':
    return action.data

  default:
    return state
  }

}

export default reducer