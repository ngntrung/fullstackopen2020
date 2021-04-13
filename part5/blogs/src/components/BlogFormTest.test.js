import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, cleanup } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  const blogObject = {
    title: 'Blog Test Title',
    author: 'Trung',
    url: 'http://google.com/blog_test',
  }

  test('call the submit event', () => {
    const createBlog = jest.fn()
    
    const component = render(<BlogForm createBlog={ createBlog } />)

    const form = component.container.querySelector('form')
    const blogTitle = component.container.querySelector('#blogTitle')
    const blogAuthor = component.container.querySelector('#blogAuthor')
    const blogUrl = component.container.querySelector('#blogUrl')
    
    fireEvent.change(blogTitle, {
      target: { value: blogObject.title }
    })
    fireEvent.change(blogAuthor, {
      target: { value: blogObject.author }
    })
    fireEvent.change(blogUrl, {
      target: { value: blogObject.url }
    })
    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe(blogObject.title)
    expect(createBlog.mock.calls[0][0].author).toBe(blogObject.author)
    expect(createBlog.mock.calls[0][0].url).toBe(blogObject.url)
  })
})