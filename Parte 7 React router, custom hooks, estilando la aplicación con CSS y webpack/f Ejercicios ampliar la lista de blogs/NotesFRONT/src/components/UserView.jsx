import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserById } from '../redux/userSlice';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
const UserView = () => {
  const dispatch = useDispatch();
  const { id } = useParams(); // Obtiene el id de los parámetros de la URL
  const user = useSelector((state) => state.users.user); // Selecciona el usuario específico del estado
  console.log('UserView user',user)
  useEffect(() => {
    if (id) {
      dispatch(fetchUserById(id)); // Llama a la acción para cargar el usuario específico
    }
  }, [dispatch, id]);

  // Verifica si el usuario existe antes de intentar acceder a sus propiedades
  if (!user) {
    return <p>Cargando usuario...</p>; // Muestra un mensaje de carga mientras se obtienen los datos
  }
  const handleLogout = () => {
    // Limpia el estado de usuario
    //setUser(null)
  
    // Elimina el token almacen
    //localStorage.removeItem('loggedBlogAppUser')
    dispatch(clearUser()); // Limpia el usuario en Redux
    window.localStorage.removeItem('loggedNoteappUser'); // Borra el usuario de localStorage
  
  }
  return (
    <div>
       <h3>Blogs details</h3>
        <h2> {user.name} Logged in Blogs app. 
          <button onClick={handleLogout}>Logout</button>
        </h2>
      <h3>added blogs</h3>
      <ul>
      {user.blogs && user.blogs.length > 0 ? ( // Asegúrate de que la propiedad 'blogs' exista y tenga elementos
          user.blogs.map((blog) => (
            <li key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>
                <strong>{blog.title}</strong>
              </Link>
              <span> by {blog.author}</span>
              <span> URL: {blog.url}</span>
              <p>Likes: {blog.likes}</p>
            </li>
          ))
        ) : (
          <p>No blogs found.</p>
        )}
      </ul>
    </div>
  );
};


export default UserView;
