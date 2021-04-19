const initialState = null

export const setFilter = (content) => {
  return {
    type: 'SET_FILTER',
    data: content
  }
}

const reducer = (state = initialState, action) => {
  if (action.type === 'SET_FILTER'){
    return action.data
  }
  return state
}

export default reducer