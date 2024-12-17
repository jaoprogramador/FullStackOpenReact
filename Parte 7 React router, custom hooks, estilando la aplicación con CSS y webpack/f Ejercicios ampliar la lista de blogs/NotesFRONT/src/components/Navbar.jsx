import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../redux/userSlice';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';

const Navbar = () => {
  const user = useSelector((state) => state.users.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearUser());
    window.localStorage.removeItem('loggedNoteappUser'); // Limpia el almacenamiento local
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/blogs">
          Blogs
        </Button>
        <Button color="inherit" component={Link} to="/users">
          Users
        </Button>
        {user ? (
          <>
            <Typography variant="body1" style={{ marginRight: '10px' }}>
              {user.name} logged in
            </Typography>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
