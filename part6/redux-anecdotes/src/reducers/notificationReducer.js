const initialState = null
let removeNoti = null
export const notiSet = (notiMessage, timeOut) => {

  if (removeNoti!==null) {
    console.log('remove appears')
    clearTimeout(removeNoti)
  }
  return async dispatch => {
    await dispatch({
      type: 'SET_NOTI',
      notiMessage
    })
    removeNoti = setTimeout(() => {
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