import { useState,useEffect  } from 'react'
import axios from 'axios'
import Note from './components/Note'

import Notification from './components/Notification'
import Footer from './components/Footer'
import Blog from './components/Blog'
import noteService from './services/notes'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'
import BlogForm from './components/BlogForm'



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

  const handleLogin = async (event) => {
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
      //setErrorMessage('Wrong credentials')
      setMessage('Wrong credentials')
      setMessageType('error')

      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  
  const loginForm = () => (
    
    <form onSubmit={handleLogin}>
      <div><h3>Log in to application</h3></div>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <br />
      <button type="submit">login</button>
    </form>      
  )
   { /* 
  const noteForm = () => (
    <form onSubmit={addNote}>
      <input
        value={newNote}
        onChange={handleNoteChange}
      />
      <button type="submit">save</button>
    </form>  
  )
*/ }
  

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
    }
  }, [])

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    fetchBlogs()
  }, [])

  const createBlog = async (newBlog) => {
    try {
      const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        setUser(user)
        blogService.setToken(user.token)
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




  return (
    <div>
      {/* --- v1
        <Notification message={errorMessage} />
      }*/}
      <Notification message={message} type={messageType} />
      {user === null ?
      loginForm() :
      <Blog blogs={blogs} name={user.name} setUser={setUser} ></Blog> 
      }

      {user === null ? 
      <br /> : 
      <BlogForm createBlog={createBlog} ></BlogForm> 
      }
     
     
     
      
      <Footer></Footer> 
    </div>

    
  )
}

export default App