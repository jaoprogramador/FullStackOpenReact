import { useState,useEffect ,useRef  } from 'react'
import Notification from './components/Notification'
import Footer from './components/Footer'
import Blog from './components/Blog'
import noteService from './services/notes'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'



const App = () => {
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)

  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState(
    'a new note...'
  ) 
  const [blogs, setBlogs] = useState([])


  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('')

  const blogFormRef = useRef()

  const notesToShow = showAll
  ? notes
  : notes.filter(note => note.important === true)


  

  

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
        console.log('error: ',error)
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)

        setNotes(notes.filter(n => n.id !== id))
      })
  }

  const handleLogin = async (event) => {
    console.log('logging in with', username, password)
    alert('JAO')
    event.preventDefault()
    console.log('handleLogin',username, password)
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      ) 
      console.log('handleLogin',username, password)
      //noteService.setToken(user.token)
      blogService.setToken(user.token)
      console.log('handleLogin token',user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      //setErrorMessage('Wrong credentials')
      setMessage('Wrong credentials')
      setMessageType('error',exception)

      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  
  
   
  
  { /* 
    COMENTARIO
 
  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, []) */ }

  useEffect(() => {
    console.log('CARGA NOTAS:::useEffect')
    { /* 
      CARGA NOTAS*/ }
    noteService
    .getAll()
    .then(initialNotes => {
      setNotes(initialNotes)
    })
    
    
    
  }, [])

  useEffect(() => {
    console.log('CARGA LOGIN:::useEffect')
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    console.log('CARGA LOGIN:::loggedUserJSON ',loggedUserJSON)
    if (loggedUserJSON) {
      
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      console.log('CARGA LOGIN:::user ',user)
      //noteService.setToken(user.token)
      blogService.setToken(user.token) 
    }
  }, [])
  useEffect(() => {
    console.log('CARGA BLOGS:::useEffect')
    { /* 
      CARGA BLOGS*/ }
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    fetchBlogs()
  }, [])

  const createBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility()
    try {
      const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        setUser(user)
        //blogService.setToken(user.token)
        console.log('APP.JS createBlog',user.token)
        const addedBlog = await blogService.create(newBlog)
        setBlogs(blogs.concat(addedBlog))
        setMessage(`a new blog ${addedBlog.title} by ${addedBlog.author} added`)
        setMessageType('success')

        setTimeout(() => {
          setMessage(null)
        }, 5000)

      }
    
      
    } catch (error) {
      console.error('Error creating blog', error)
      setMessage('Error adding blog')
      setMessageType('error')
      setTimeout(() => {
        setMessage(null)
      }, 5000)

    }
  }

const removeBlog = async (id) => {
  const blogToRemove = blogs.find(blog => blog.id === id) // Encuentra el blog específico
  const confirmDelete = window.confirm(`Are you sure you want to delete the blog  "${blogToRemove.title}"?`)

  if (!confirmDelete) {
    return // Si el usuario cancela, no se ejecuta la eliminación
  }

  try {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        setUser(user)
        //blogService.setToken(user.token)
        console.log('APP.JS createBlog',user.token)
        await blogService.remove(id)  // Asegúrate de que el servicio de blogs tenga un método remove
        setBlogs(blogs.filter(blog => blog.id !== id))
        setMessage('Blog eliminado exitosamente')
        setMessageType('success')
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      }
  } catch (error) {
    console.error('Error eliminando blog', error)
    setMessage('Error eliminando blog')
    setMessageType('error')
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }
}



  return (
    <div>
      {/* NOTIFICACION ERRORES, ALTAS */} 
      <Notification message={message} type={messageType} />
      
      {/* FORMULARIO DE LOGGIN */} 
      {user === null ?
      
      <LoginForm username={username}
      password={password}
      handleUsernameChange={({ target }) => setUsername(target.value)}
      handlePasswordChange={({ target }) => setPassword(target.value)}
      handleLogin={handleLogin}></LoginForm> :
        <div>{/* BLOG TABLE */} 
          <Blog blogs={blogs} name={user.name} setUser={setUser} removeBlog={removeBlog} setBlogs={setBlogs}></Blog>

          <Togglable buttonLabel='new note' ref={blogFormRef}>
            <BlogForm createBlog={createBlog} ></BlogForm> 
          </Togglable>

          <Footer></Footer> 
        </div>
      
      }

      {/* 
        LISTADO DE BLOGS
       
      {user && (
        <div>
          <Blog blogs={blogs} name={user.name} setUser={setUser}></Blog>
        </div>
      )}
      */}  
      
    </div>

    
  )
}

export default App