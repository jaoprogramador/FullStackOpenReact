
import BlogForm from "./BlogForm"

const Blog = ({ blogs, name, setUser  }) => {
  const handleLogout = () => {
    // Limpia el estado de usuario
    setUser(null)

    // Elimina el token almacenado en localStorage
    localStorage.removeItem('loggedBlogAppUser')
  }
  if (name === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        {/* Aquí iría el formulario de inicio de sesión */}
      </div>
    )
  }

  
      return (
        <div>
            <h3>Blogs</h3>
            <h2> {name} Logged in Blogs app. 
              <button onClick={handleLogout}>Logout</button></h2>
            
            Has this Blogs:
            <ul>
            {blogs.map(blog => (
              <li key={blog.id}>{blog.title} by {blog.author}</li>
            ))}
          </ul>
          
        </div>
      )
    }
    export default Blog