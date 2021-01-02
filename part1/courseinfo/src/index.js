import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}
const Part = (props) => {
  return(
    <>
      <p>{props.content} {props.exercises}</p>
     
    </>
  )
}
const Content = (props) => {
  return(
    <>
      <Part content = {props.content1} exercises={props.exercises1}/>
      <Part content = {props.content2} exercises={props.exercises2}/>
      <Part content = {props.content3} exercises={props.exercises3}/>
    </>
  )
 
}

const Total = (props) => {
  return(
    <>
      <p>Number of exercises {props.total}</p>
    </>
  )
}
const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content content1 = {part1} exercises1 = {exercises1} content2 = {part2} exercises2 = {exercises2} content3 = {part3} exercises3 = {exercises3} />
      <Total total = {exercises1 + exercises2 + exercises3}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
