import { gql  } from '@apollo/client'

export const BOOK_DETAIL = gql `
  fragment BookDetail on Book {
    id
    title
    published
    author {
      name
    }
    genres
  }
`

export const CURRENT_USER = gql`
query {
  me{
    username
    favoriteGenre
  }
}
`
export const ALL_BOOKS = gql `
query findAllBooks($genre: String!, $author: String!){
  allBooks (genre: $genre, author: $author) {
    ...BookDetail
  }
}
${BOOK_DETAIL}
`

export const ALL_BOOKS_TEST = gql `
query findAllBooks($genre: String!, $author: String!){
  allBooks (genre: $genre, author: $author) {
    ...BookDetail
  }
}
${BOOK_DETAIL}
`

export const ALL_AUTHORS = gql `
query {
  allAuthors {
    name
    born
    bookCount
  }
}
`

export const EDIT_AUTHORS = gql `
mutation editAuthor ($name: String!, $setBornTo: Int!) {
  editAuthor (
    name: $name,
    setBornTo: $setBornTo
  ){
    name
    born
  }
}
`

export const CREATE_BOOK = gql `
mutation addBook ($title: String!, $author: String!, $published: Int!, $genres: [String!]!){
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ){
    ...BookDetail
  }
}
${BOOK_DETAIL}
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetail
    }
  }
  ${BOOK_DETAIL}
`