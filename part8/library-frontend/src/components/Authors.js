  
import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHORS } from '../queries'
import Select from 'react-select'



const Authors = (props) => {
  const [ editAuthor ] = useMutation(EDIT_AUTHORS, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const results = useQuery(ALL_AUTHORS)

  const submitChange = async (event) => {
    event.preventDefault()
    editAuthor({ variables: { name: name.value, setBornTo: born } })
    setName('')
    setBorn('')
  }

  if (!props.show) {
    return null
  }
  if (results.loading) {
    return <div>loading...</div>
  }
  const authors = results.data.allAuthors
  const authorList = authors.map(author => ({ value: author.name, label: author.name}))
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h2>Set birth year</h2>
      <form onSubmit={submitChange}>
        <div>
          <Select defaultValue={name} onChange={setName} options={authorList}></Select>
        </div>
        <div>
          <p>born</p>
          <input type='number' value={ born } onChange={({ target }) => setBorn(Number(target.value))}/>
        </div>
        <div>
          <button type='submit'>update author</button>
        </div>
        
      </form>
    </div>
  )
}

export default Authors
