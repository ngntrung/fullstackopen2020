import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
let user_id = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const setUserId = newUserId => {
  user_id = newUserId
}
const config = {
  headers: { Authorization: token },
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
  console.log(response.data);
  return response.data
}

const update = async newObject => {
  const response = await axios.put(`${baseUrl}/${newObject.id}`, newObject, config)
  return response.status
}

const remove = async newObject => {
  const response = await axios.delete(`${baseUrl}/${newObject.id}`, newObject, config)
  return response.status
}

export default { getAll, create, setToken, update, remove, setUserId }