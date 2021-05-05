let removeNoti = null

const notificationReducer = (state = {}, action) => {
  switch(action.type){
  case 'SET_NOTI':
    return { message: action.notiMessage, style: action.style }
  case 'REMOVE_NOTI':
    return null
  default:
    return state
  }
}

export const setNoti = (notiMessage, style, timeOut) => {

  if (removeNoti!==null) {
    clearTimeout(removeNoti)
  }
  return async dispatch => {
    await dispatch({
      type: 'SET_NOTI',
      notiMessage,
      style,
    })
    removeNoti = setTimeout(() => {
      dispatch({
        type: 'REMOVE_NOTI'
      })
    }, timeOut * 1000)
  }
}

export default notificationReducer