import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const get = () => {
    return axios.get(baseUrl)
}

const create = newObject => {
    return axios.post(baseUrl, newObject)
}
const remove = id => {
    return axios.delete(`${baseUrl}/${id}`)
}
const exportServices = {get, create, remove}
export default exportServices