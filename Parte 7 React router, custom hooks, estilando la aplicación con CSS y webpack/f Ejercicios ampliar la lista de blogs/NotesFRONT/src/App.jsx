import { useState,useEffect  } from 'react'
import axios from 'axios'
import Note from './components/Note'

import Notification from './components/Notification'
import Footer from './components/Footer'
import Blog from './components/Blog'
import noteService from './services/notes'
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'
import './index.css'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import UserView from './components/UserView'
import UserList from './components/UserList'
import BlogView from './components/BlogView'
import Navbar from './components/Navbar';

import { loginUser ,setUser, clearUser } from './redux/userSlice';

//version REDUX notificacion
import { useSelector, useDispatch } from 'react-redux';
import { showNotification ,hideNotification} from './redux/notificationSlice';

import { setBlogs, addBlog } from './redux/blogSlice';
import { fetchBlogs } from './redux/blogSlice';

import { BrowserRouter as Router, Routes, Route ,Navigate } from 'react-router-dom';
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TextField,
  Button,
  AppBar,
  Toolbar,
  Alert
} from '@mui/material'

const App = () => {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user); // Obtiene el usuario de Redux
  
  const [username, setUsername] = useState('jaoprogramador') 
  const [password, setPassword] = useState('12345') 
  //const [user, setUser] = useState(null)
  
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState(
    'a new note...'
  ) 
  const [blogs, setBlogs] = useState([])


  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('')


  const notesToShow = showAll
  ? notes
  : notes.filter(note => note.important === true)

  
  
  const addNote = (event) => {
    

    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5
    }

    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
         // Desplegar notificación de éxito
        dispatch(showNotification({ message: 'Nota agregada con éxito', type: 'success' }));

      })
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }
  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)

        setNotes(notes.filter(n => n.id !== id))
      })
  }

  /* const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      ) 
      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      
      setMessage('Wrong credentials')
      setMessageType('error')

      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  } */
    const handleLogin = async (event) => {
      console.log('handleLogin', username);
      console.log('handleLogin', password);
      event.preventDefault(); // Previene el comportamiento por defecto del formulario
      
      try {
        const resultAction = await dispatch(loginUser({ username, password }));
    
        if (loginUser.rejected.match(resultAction)) {
          // Si el resultado de la acción es un rechazo, mostramos la notificación
          dispatch(showNotification({ message: 'Login incorrecto', type: 'error' }));
        } else {
          dispatch(showNotification({ message: 'Login exitoso', type: 'success' }));
          // Si el login fue exitoso, puedes manejar la redirección o cualquier otra lógica aquí
          console.log('Login exitoso', resultAction.payload);
        }
      } catch (error) {
        // Esto generalmente no se debería alcanzar debido al manejo anterior, pero es bueno tenerlo
        dispatch(showNotification({ message: 'Error en el sistema', type: 'error' }));
        console.error('Login error:', error);
      } finally {
        setTimeout(() => {
          dispatch(hideNotification());
        }, 5000); // Elimina la notificación después de 5 segundos
      }
    };
  
    
  
   
  

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
      blogService.setToken(user.token)
      userService.setToken(user.token)
    }
  }, [])

  
  useEffect(() => {
    dispatch(fetchBlogs())
      .unwrap() // Para manejar errores explícitamente en la llamada asíncrona
      .catch((error) => {
        console.error('Error al cargar los blogs:', error);
      });
  }, [dispatch]);

  const createBlog = async (newBlog) => {
    try {
      //const dispatch = useDispatch();
      const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        setUser(user)
        blogService.setToken(user.token)
        console.log('APP.JS createBlog',user.token)
        const addedBlog = await blogService.create(newBlog)
        setBlogs(blogs.concat(addedBlog))
        
        // Despachar la acción para agregar el nuevo blog al store de Redux
        dispatch(addBlog(addedBlog))
        
        //setMessage(`a new blog ${addedBlog.title} by ${addedBlog.author} added`)
        //setMessageType('success')

        // Desplegar notificación de éxito
        dispatch(showNotification({ message: 'Blog agregada con éxito', type: 'success' }));
        setTimeout(() => {
          //setMessage(null)
          dispatch(showNotification({ message: null, type: '' }));
        }, 5000)

      }
    
      
    } catch (error) {
      console.error('Error creating blog', error)
      //setMessage('Error adding blog')
      //setMessageType('error')
      dispatch(showNotification({ message: 'Error al crear el blog', type: 'error' }));
      setTimeout(() => {
        setMessage(null)
      }, 5000)

    }
  }




  return (
    <div>
    
      <Notification message={message} type={messageType} />
      
      {user === null ? (
        <LoginForm
          handleSubmit={handleLogin}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          username={username}
          password={password}
        />
      ) : (
        <div>
         
          <Navbar />
          <Container>
            <h1>blog app</h1>
            <Routes>
              <Route path="/" element={<Navigate to="/blogs" />} />
              <Route path="/blogs" element={<Blog name={user.name} setUser={setUser} createBlog={createBlog}  />} />
              <Route path="/new-blog" element={<BlogForm createBlog={createBlog} />} />
              <Route path="/users" element={<UserList name={user.name} setUser={setUser} />} />
              <Route path="/users/:id" element={<UserView />} />
              <Route path="/blogs/:id" element={<BlogView />} /> 
            </Routes>
          </Container>
          
        </div>
        
          
       /*  <Blog name={user.name} setUser={setUser} /> */
        
      )}

      {/* {user === null ? 
      <br /> : 
      <BlogForm createBlog={createBlog} ></BlogForm> 
      } */}
      
      {/* LISTADO USUARIOS*/}
      {/* {user === null ? 
      <br /> : 
      <UserList name={user.name} setUser={setUser}></UserList>
      } */}
      
     {/* DETALLE USUARIOS 
    {user === null ? 
      <br /> : 
      <UserList name={user.name} setUser={setUser}></UserList>
      }
    */}
      <Footer></Footer> 
    </div>

    
  )
}

export default App