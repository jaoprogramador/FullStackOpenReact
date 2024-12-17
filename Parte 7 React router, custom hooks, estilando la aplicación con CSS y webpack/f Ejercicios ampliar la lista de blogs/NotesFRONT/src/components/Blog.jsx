
import BlogForm from "./BlogForm"
import { useDispatch ,useSelector } from 'react-redux';
import { likeBlog, deleteBlog } from '../redux/blogSlice';
import { clearUser } from '../redux/userSlice'; 
import { Link } from 'react-router-dom';
import { showNotification } from '../redux/notificationSlice';
import { useState } from 'react';

const Blog = ({  name, setUser, createBlog  }) => {
  
  const dispatch = useDispatch();
  const blogs = useSelector(state => state.blog.blogs); // Usar el estado de Redux
  console.log('blogs ',blogs)
  const [isBlogFormVisible, setIsBlogFormVisible] = useState(false);

  const handleLike = async (id) => {
    try{
      //const updatedBlog = dispatch(likeBlog(id)).unwrap();
      await dispatch(likeBlog(id)).unwrap(); 
      setTimeout(() => {
        dispatch(showNotification({ message: null, type: '' }));
      }, 3000);

    } catch (error) {
      dispatch(showNotification({ message: 'Error al crear el blog', type: 'error' }));
      setTimeout(() => {
        dispatch(showNotification({ message: null, type: '' }));

      }, 5000)
    }
    

  };

  const handleDelete = (id, title) => {
    if (window.confirm(`¿Seguro que quieres eliminar el blog "${title}"?`)) {
      dispatch(deleteBlog(id));
    }
  };




  

  const handleLogout = () => {
    // Limpia el estado de usuario
    //setUser(null)

    // Elimina el token almacen
    //localStorage.removeItem('loggedBlogAppUser')
    dispatch(clearUser()); // Limpia el usuario en Redux
    window.localStorage.removeItem('loggedNoteappUser'); // Borra el usuario de localStorage

  }
  const toggleBlogForm = () => {
    setIsBlogFormVisible(!isBlogFormVisible);
  };

  if (name === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        
      </div>
    )
  }

  
      return (
        <div>
            <h3>Blogs</h3>
            <h2> {name} Logged in Blogs app. 
              <button onClick={handleLogout}>Logout</button>
            </h2>
            
            <div>
              <button onClick={toggleBlogForm}>Create new</button>
            </div>
            {/* FORMULARIO CREAR BLOGS 
               ===========================*/}
            {isBlogFormVisible && (
              <div>
                <BlogForm createBlog={createBlog} />
              </div>
            )}

            <h3>Has this Blogs:</h3>
            
            <ul>
              {blogs.map(blog => (
                <li key={blog.id}>
                  <Link to={`/blogs/${blog.id}`}>
                    <strong>{blog.title}</strong>
                  </Link>
                  <span> by {blog.author}</span>
                  <p>Likes: {blog.likes}</p>
                  <button onClick={() => handleLike(blog.id)}>Like</button>
                  <button onClick={() => handleDelete(blog.id, blog.title)}>Delete</button>
                </li>
              ))}
            </ul>
          

      
          
        </div>
      )
    }
    export default Blog