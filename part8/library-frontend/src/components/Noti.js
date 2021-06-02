import React from 'react'

const Notify = ({message}) => {
  if ( !message ) {
    return null
  }
  return (
    <div style={{color: 'green'}}>
      {message}
    </div>
  )
}

export default Notify