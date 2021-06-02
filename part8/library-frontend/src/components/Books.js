import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const [filterList, setFilterList] = useState([])
  const [filterSelected, setFilterSelected] = useState(null)
  const [getBooks, results] = useLazyQuery(ALL_BOOKS)
  const [books, setBooks] = useState([])
  const booksQuery = useQuery(ALL_BOOKS, {
    variables: {genre: "", author: ""}
  })
  const fetchBook = (genre) => {
    getBooks({ variables: { genre: genre, author: "" } })
    setFilterSelected(genre)
  }

  useEffect(() => {
    if (results.data) {
      setBooks(results.data.allBooks)
    }
  }, [results])

  useEffect(() => {
    if (booksQuery.data) {
      setBooks(booksQuery.data.allBooks)
      setFilterList(Array.from(new Set(booksQuery.data.allBooks.map(book => book.genres).flat())))
    }
  }, [booksQuery])

  /*
  useEffect(() => {
    if (books) {
      setFilterList(Array.from(new Set(books.map(book => book.genres).flat())))
    }
  }, [books])
  */

  if (booksQuery.loading){
    return (
      <div>...loading</div>
    )
  }

  if (!props.show) {
    return null
  }
  /*
  const filterBooks = books.filter(book => filter ? book.genres.includes(filter) : book)
  const filterList = Array.from(new Set(books.map(book => book.genres).flat()))
  */
  return (
    <div>
      <h2>books</h2>
      {filterSelected ? <p>in genres <b>{filterSelected}</b></p> : null}
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
      {filterList.map((item, index) => <button key={index} onClick= {() => fetchBook(item) }> { item } </button>)}
      <button onClick = { ()=> fetchBook('') }>all genres</button>
    </div>
  )
}

export default Books