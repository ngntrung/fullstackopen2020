import React from 'react'

const Notification = ({ message }) => {
  return (
    <div className= 'notification success'>
      <h1>{message}</h1>
    </div>
  )
}


export default Notification