import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, cleanup } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  const userObject = {
    blogs: [
      {
      title: "Hello world 3",
      author: "Trung",
      url: "http://google.com/blog_test_35",
      id: "60686962e660537005033d07"
      },
      ],
    user: {
      username: "ron",
      name: "Ron Wesley",
      id: "6059bc0400fbec5321456cde"
    }
    
    }
  
  const blogObject = {
    likes: 0,
    title: "Hello world 3",
    author: "Trung",
    url: "http://google.com/blog_test_35",
    user: {
      username: "ron",
      name: "Ron Wesley",
      id: "6059bc0400fbec5321456cde"
      },
    id: "60686962e660537005033d07"
  }

  let component

  beforeEach(() => {
    component = render(
      <Blog blog={blogObject} loggedinUser={userObject} />
    )
  })
  
  afterEach(cleanup)

  test('test at start not display detail', () => {
    const div = component.container.querySelector('.moreInfo')
    expect(div).toHaveStyle('display: none')

  })

  test('after click detail will be shown', () => {
    const showButton = component.getByText('view')
    fireEvent.click(showButton)
    const div = component.container.querySelector('.moreInfo')
    expect(div).not.toHaveStyle('display: none')
  })

  test('double click likes', () => {
    const mockHandler = jest.fn()
    let componentTest

    componentTest = render(
      <Blog blog={blogObject} loggedinUser={userObject} likeBlog={mockHandler} />
    )

    const likeButton = componentTest.container.querySelector('.likeBtn')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})



