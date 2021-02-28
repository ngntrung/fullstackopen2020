import React from 'react'

const Header = ({ course }) => {
    return (
      <h1>{course.name}</h1>
    )
  }
  
  const Total = ({ parts }) => {
    const sum = parts.reduce((total, part) => total + part.exercises, 0)
    return(
      <strong>total of {sum} exercises</strong>
    ) 
  }
  
  const Part = (props) => {
    return (
      <p>
        {props.name} {props.exercises}
      </p>    
    )
  }
  
  const Content = ({ parts }) => {
    return (
      <div>
        {parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises}/>)}
        <Total parts = {parts}/>
      </div>
    )
  }
  
  const Course = ({course}) => {
    return (
      <div>
        <Header course = {course} />
        <Content parts = {course.parts} />
      </div>
    )
  }

  export default Course