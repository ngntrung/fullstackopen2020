import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const addItem = async (content) => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const likeItem = async(id) => {
  const objectToChange = await axios.get(`${baseUrl}/${id}`)
  const newObject = {
    content: objectToChange.data.content,
    votes: objectToChange.data.votes + 1,
    id: objectToChange.data.id
  }
  const response = await axios.put(`${baseUrl}/${id}`, newObject)
  return response
}

export default { getAll, addItem, likeItem }