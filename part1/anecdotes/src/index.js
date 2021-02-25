import React, { useState } from 'react'
import ReactDOM from 'react-dom'
const Button = (props) => <button onClick={props.event}>{props.text}</button>
const Random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min


const App = () => {
  const [selected, setSelected] = useState(0)
  const selectNumber = () => setSelected(Random(0, anecdotes.length - 1))
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))
  const highestVote = points.indexOf(Math.max(...points))
  const vote = (props) => {
      const pointsCopy = [...points]
      pointsCopy[props] += 1
      setPoints(pointsCopy)
  }
  
  
 
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <Button event={() => vote(selected)} text='vote' />
      <Button event={selectNumber} text='next anecdote' />
      <h1>Anecdotes with the most votes</h1>
      <p>{anecdotes[highestVote]}</p>
      <p>has {points[highestVote]} votes</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)