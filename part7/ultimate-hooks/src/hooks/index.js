import { useState, useEffect } from 'react'
import axios from 'axios'

export const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])
  
    // ...
    useEffect(() => {
        const getAll = async () => {
            const response = await axios.get(baseUrl)
            setResources(response.data)
        }
        getAll()
    }, [baseUrl])
    
    const create = async (resource) =>  {
          const response = await axios.post(baseUrl, resource)
          setResources([...resources, response.data])
          return resources
    }


    const service = {
      create
    }
  
    return [
      resources, service
    ]
  }

