import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { CURRENT_USER } from '../queries'
import { ALL_BOOKS } from '../queries'

const Recommendation = (props) => {
  const getUser = useQuery(CURRENT_USER)
  const [currentUser, setCurrentUser] = useState(null)
  const [getBooks, results] = useLazyQuery(ALL_BOOKS)
  const [books, setBooks] = useState([])
  const fetchBook = (genre) => {
    getBooks({ variables: { genre: genre, author: "" } })
  }

  useEffect(() => {
    if (getUser.data){
      setCurrentUser(getUser.data.me)
      fetchBook(getUser.data.me.favoriteGenre)
    }//eslint-disable-next-line
  }, [getUser]) 

  useEffect(() => {
    if (results.data) {
      setBooks(results.data.allBooks)
    }
  }, [results])
 
  if (getUser.loading){
    return <div>loading....</div>
  }
 
  if (!props.show){
    return null
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>book in your favorite genre <b>{currentUser.favoriteGenre}</b></p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    
  )
}

export default Recommendation