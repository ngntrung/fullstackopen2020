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
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content content1 = {course.parts[0].name} exercises1 = {course.parts[0].exercise} content2 = {course.parts[1].name} exercises2 = {course.parts[1].exercises} content3 = {course.parts[2].name} exercises3 = {course.parts[2].exercises} />
      <Total total = {course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
