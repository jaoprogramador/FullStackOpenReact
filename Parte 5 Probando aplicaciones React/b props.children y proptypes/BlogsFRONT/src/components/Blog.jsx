/* eslint-disable react/prop-types */
import { useState } from 'react'
import blogsService from '../services/blogs'

const Blog = ({ blogs, name, setUser, removeBlog, setBlogs }) => {
  // Estado para manejar la visibilidad de cada blog por su id
  const [visibility, setVisibility] = useState({})
  

  // Función para alternar la visibilidad de un blog específico
  const toggleVisibility = (id) => {
    setVisibility({
      ...visibility,
      [id]: !visibility[id] // Alterna el estado de visibilidad de ese blog
    })
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('loggedBlogAppUser')
    //window.localStorage.clear()
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  // Función para manejar el incremento de "likes" a nivel de frontend
  const handleLike = async (id) => {
    const blog = blogs.find(blog => blog.id === id)
    const updatedBlog = { ...blog, likes: blog.likes + 1 }

    try {
      // Llama al backend para actualizar los likes
      const returnedBlog = await blogsService.update(id, updatedBlog)
      
      // Actualiza el estado de los blogs con el blog actualizado
      setBlogs(blogs.map(b => (b.id === id ? returnedBlog : b)))
    } catch (error) {
      console.error('Error updating likes:', error)
    }

  }

  if (name === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        {/* Aquí iría el formulario de inicio de sesión */}
      </div>
    )
  }

  // Ordenar los blogs por el número de likes de mayor a menor
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <h1>Blogs</h1>
      <h3>
        {name} Logged in Blogs app.
        <button onClick={handleLogout}>Logout</button>
      </h3>

      <div>
        {sortedBlogs .map(blog => {
          const isVisible = visibility[blog.id] || false  // Visibilidad por defecto false

          return (
            <div style={blogStyle} key={blog.id}>
              <div style={{ display: isVisible ? 'none' : '' }}>
                {blog.title} <button onClick={() => toggleVisibility(blog.id)}>Show</button>
              </div>
              <br />
              <div style={{ display: isVisible ? '' : 'none' }}>
                {blog.title}
                <br />
                <a href={blog.url}>{blog.url}</a> <button onClick={() => toggleVisibility(blog.id)}>Hide</button>
                <br />
                Likes: {blog.likes}  <button onClick={() => handleLike(blog.id)}>Like</button>
                <br />
                {blog.author}
                <br />
                <button onClick={() => removeBlog(blog.id)}>remove</button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Blog
