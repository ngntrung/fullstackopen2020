import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
let config = null

const setToken = newToken => {
  token = `bearer ${newToken}`
  config = { headers: { Authorization: token } }
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  const response = request.data.sort(function (a,b) {
    return b.likes - a.likes
  })
  return response
}

const create = async newObject => {
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async newObject => {
  const response = await axios.put(`${baseUrl}/${newObject.id}`, newObject, config)
  return response.status
}

const remove = async newObject => {
  const response = await axios.delete(`${baseUrl}/${newObject.id}`, config)
  return response.status
}

const addComment = async newObject => {
  const response = await axios.post(`${baseUrl}/${newObject.blogId}/comments`, newObject, config)
  return response.data
}

const blogService = { getAll, create, setToken, update, remove, addComment }
export default blogService