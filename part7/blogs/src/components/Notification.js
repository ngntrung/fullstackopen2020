import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from '@material-ui/lab'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  if (!notification){
    return null
  }
  return (
    <div>
      {!notification.style
        ?
        null
        :
        <Alert severity= {notification.style}>
          {notification.message}
        </Alert>
      }
    </div>
  )
}


export default Notification