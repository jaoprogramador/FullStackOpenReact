import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../redux/userSlice';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap'
const handleLogout = () => {
  // Limpia el estado de usuario
  //setUser(null)

  // Elimina el token almacen
  //localStorage.removeItem('loggedBlogAppUser')
  dispatch(clearUser()); // Limpia el usuario en Redux
  window.localStorage.removeItem('loggedNoteappUser'); // Borra el usuario de localStorage

}

const UserList = ({  name, setUser  }) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const status = useSelector((state) => state.users.status); 
    useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]); 

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>Error loading users</p>; 
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
          <button onClick={handleLogout}>Logout</button></h2>
        
        
      <h3>Users list</h3>
      <Table striped>
        <tbody>
        <tr >
            <td><strong>Name </strong> </td>
            <td><strong>Likes </strong></td>
        </tr>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
              <Link to={`/users/${user.id}`}>
                  <strong>{user.name}</strong>
                </Link>
              </td>
              <td>
              {user.blogs.length}
              </td>
            </tr>
         ))}
        </tbody>
      </Table>
      {/* <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
           {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>
                  <strong>{user.name}</strong>
                </Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))} 
        </tbody>
      </table> */}
    </div>
  );
};

export default UserList;
