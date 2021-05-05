import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type){
  case 'INIT_BLOGS':
    return action.data
  case 'LIKE_BLOG':
    return action.data
  case 'REMOVE_BLOG':
    return action.data
  case 'CREATE_BLOG':
    return [...state, action.data]
  case 'ADD_COMMENT':
    return action.data
  default:
    return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export const likeBlogReducer = (blogObject) => {
  return async dispatch => {
    await blogService.update(blogObject)
    const blogs = await blogService.getAll()
    dispatch({
      type: 'LIKE_BLOG',
      data: blogs,
    })
  }
}

export const removeBlogReducer = (blogObject) => {
  return async dispatch => {
    await blogService.remove(blogObject)
    const blogs = await blogService.getAll()
    dispatch({
      type: 'REMOVE_BLOG',
      data: blogs,
    })
  }
}

export const addBlogReducer = (blogObject) => {
  return async dispatch => {
    const blog = await blogService.create(blogObject)
    dispatch({
      type: 'CREATE_BLOG',
      data: blog,
    })
  }
}

export const addCommentReducer = (commentObject) => {
  return async dispatch => {
    await blogService.addComment(commentObject)
    const blogs = await blogService.getAll()
    dispatch({
      type: 'ADD_COMMENT',
      data: blogs,
    })
  }
}


export default blogReducer