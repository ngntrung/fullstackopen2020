import React, {useState} from 'react'

const BlogForm = ({createBlog, loggedinUser} ) => {
    console.log(loggedinUser)
    const [newBlogTitle, setBlogTitle] = useState('')
    const [newBlogAuthor, setBlogAuthor] = useState('')
    const [newBlogUrl, setBlogUrl] = useState('')

    const handleBlogTitle = (event) => {
        setBlogTitle(event.target.value)
    }

    const handleBlogAuthor = (event) => {
        setBlogAuthor(event.target.value)
    }

    const handleBlogUrl = (event) => {
        setBlogUrl(event.target.value)
    }

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
          title: newBlogTitle,
          author: newBlogAuthor,
          url: newBlogUrl,
        })
        setBlogTitle('')
        setBlogAuthor('')
        setBlogUrl('')
        
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit = {addBlog}>
                <div>
                title
                <input value = {newBlogTitle} onChange = {handleBlogTitle} name = "title" />
                </div>
                <div>
                author
                <input value = {newBlogAuthor} onChange = {handleBlogAuthor} name = "author" />
                </div>
                <div>
                url
                <input value = {newBlogUrl} onChange = {handleBlogUrl} name = "url" />
                </div>
                <button type = "submit">Save</button>
            </form>
        </div>
    )
    
    
}

export default BlogForm