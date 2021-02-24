import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => <button onClick = {props.eventHandler}>{props.type}</button>
const Statistic = (props) => {
  return (
    <>
      <tr>
        <td>{props.text}</td>
        <td>{props.value}</td>
      </tr>
 
    </>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const goodEvent = () => setGood (good + 1)
  const neutralEvent = () => setNeutral(neutral + 1)
  const badEvent = () => setBad(bad + 1)
  const total = good + neutral + bad
  if (total === 0) {
    return (
      <div>
        <h1>give feedback</h1>
        <Button eventHandler={goodEvent} type='good'/>
        <Button eventHandler={neutralEvent} type='neutral'/>
        <Button eventHandler={badEvent} type='bad'/>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
      
    )
  }
  
  return (
    <div>
      <h1>give feedback</h1>
      <Button eventHandler={goodEvent} type='good'/>
      <Button eventHandler={neutralEvent} type='neutral'/>
      <Button eventHandler={badEvent} type='bad'/>
    
      <h1>statistics</h1>
      <table>
        <tbody>
          <Statistic text = 'good' value = {good}/>
          <Statistic text = 'neutral' value = {neutral}/>
          <Statistic text = 'bad' value = {bad}/>
          <Statistic text = 'all' value = {total}/>
          <Statistic text = 'average' value = {(good * 1 + neutral * 0 + bad * -1) / total }/>
          <Statistic text = 'positive' value = {(good) / total * 100}/>
        </tbody>
      </table>
    </div>
  
    
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)