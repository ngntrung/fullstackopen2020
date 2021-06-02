
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/Login'
import Recommendation from './components/Recommendation'
import { useSubscription, useApolloClient } from '@apollo/client'
import { ALL_BOOKS, BOOK_ADDED } from './queries'
import Notify from './components/Noti'



const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [message, setMessage] = useState(null)
  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }
  const notify = (message) => {
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
    }, 10000)
  }
  const query_test = client.readQuery({ query: ALL_BOOKS })
  console.log(query_test)
  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => 
      set.map(p => p.id).includes(object.id)  

    const dataInStore = client.readQuery({ query: ALL_BOOKS, variables: {genre: "", author: ""} })
    console.log('update cache')
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      console.log('write query')
      client.writeQuery({
        query: ALL_BOOKS, 
        variables: {genre: "", author: ""},
        data: { allBooks : dataInStore.allBooks.concat(addedBook) }
      })
    }
  }
  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log('hello')
      const addedBook = subscriptionData.data.bookAdded
      notify(`${addedBook.title} book is added `)
      updateCacheWith(addedBook)
    }
  })

  if (!token) {
    return (
      <div>
        <Notify message={message}/>
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('login')}>login</button>
        </div>

        <Authors
          show={page === 'authors'}
        />

        <Books
          show={page === 'books'}
        />
        <LoginForm
          show={page === 'login'} setToken={ setToken } setPage={ setPage }
        />

      </div>
      
    )
  }

  return (
    <div>
      <Notify message={message}/>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommendation')}>recommend</button>
        <button onClick={() => logout() }>logout</button>
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'} 
      />

      <NewBook
        show={page === 'add'} updateCacheWith={updateCacheWith}
      />
      <Recommendation
        show={page === 'recommendation'}
      />

     

    </div>
  )
}

export default App