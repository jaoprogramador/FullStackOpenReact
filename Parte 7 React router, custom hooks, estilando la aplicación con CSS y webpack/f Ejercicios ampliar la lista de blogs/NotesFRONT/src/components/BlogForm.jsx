import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    
    // Llamar a la función para crear el blog con los valores del formulario
    createBlog({
      title,
      author,
      url
    })

    // Limpiar los campos del formulario después de agregar el blog
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create a new blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Title: 
          <input 
            type="text" 
            value={title} 
            onChange={({ target }) => setTitle(target.value)} 
            placeholder="Enter blog title"
          />
        </div>
        <div>
          Author: 
          <input 
            type="text" 
            value={author} 
            onChange={({ target }) => setAuthor(target.value)} 
            placeholder="Enter blog author"
          />
        </div>
        <div>
          URL: 
          <input 
            type="text" 
            value={url} 
            onChange={({ target }) => setUrl(target.value)} 
            placeholder="Enter blog URL"
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default BlogForm
