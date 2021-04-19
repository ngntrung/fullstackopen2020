const initialState = null

export const notiSet = (notiMessage, timeOut) => {
  return async dispatch => {
    await dispatch({
      type: 'SET_NOTI',
      notiMessage
    })
    setTimeout(() => {
      dispatch({
        type: 'REMOVE_NOTI'
      })
    }, timeOut * 1000)
  }
}

export const notificationReducer = (state = initialState, action) => {
  switch(action.type){
  case 'SET_NOTI':
    return action.notiMessage
  case 'REMOVE_NOTI':
    return null
  default:
    return state
  }
}

export default notificationReducer