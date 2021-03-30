const BlogForm = ({handleSubmit, blogTitle, blogAuthor, blogUrl, handleBlogTitle, handleBlogAuthor, handleBlogUrl}) => (
    <div>
      <h2>create new</h2>
      <form onSubmit = {handleSubmit}>
        <div>
          title
          <input value = {blogTitle} onChange = {handleBlogTitle} name = "title" />
        </div>
        <div>
          author
          <input value = {blogAuthor} onChange = {handleBlogAuthor} name = "author" />
        </div>
        <div>
          url
          <input value = {blogUrl} onChange = {handleBlogUrl} name = "url" />
        </div>
        <button type = "submit">Save</button>
      </form>
    </div>
    
)

export default BlogForm