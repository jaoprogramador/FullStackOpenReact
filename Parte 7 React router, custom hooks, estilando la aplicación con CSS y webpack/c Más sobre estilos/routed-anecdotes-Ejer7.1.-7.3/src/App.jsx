import { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link, 
  useParams,
  useNavigate
} from 'react-router-dom'

import { Table,Form, Button, Navbar ,Nav } from 'react-bootstrap'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#" as="span">
                <Link to="/" style={padding}>anecdotes</Link>
                
              </Nav.Link>
              <Nav.Link href="#" as="span">
                <Link to="/create" style={padding}>create new</Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                <Link to="/about" style={padding}>about</Link>
              </Nav.Link>
              
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <Table striped>
      <tbody>
      {anecdotes.map(anecdote => (
        <tr key={anecdote.id}>
        <td>
          <Link to={`/anecdotes/${anecdote.id}`}>
            {anecdote.content}
          </Link>
        </td>
        <td>
        </td>
      </tr>
      ))}
      </tbody>
    </Table>
  </div>
);


const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [info, setInfo] = useState('')

  const navigate = useNavigate() // Hook para redireccionar

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content,
      author,
      info,
      votes: 0
    })

     // Establece el mensaje de notificación y redirige a la lista de anécdotas
     props.setNotification(`Anecdote '${content}' created!`)
     navigate('/') // Redirige a la lista de anécdotas

  }

  return (
    <div className="container">
      <h2>create a new anecdote</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
        <Form.Label>content:</Form.Label>
            <Form.Control
               name='content' value={content} onChange={(e) => setContent(e.target.value)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>
              author</Form.Label>
              <Form.Control name='author' value={author} onChange={(e) => setAuthor(e.target.value)} />
            </Form.Group>
        <Form.Group>
            <Form.Label>
              url for more info</Form.Label>
              <Form.Control name='info' value={info} onChange={(e)=> setInfo(e.target.value)} />
          </Form.Group>
        <Button variant="primary" type="submit">create</Button >
      </Form>
    </div>
  )

}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))

  // Temporizador para limpiar la notificación después de 5 segundos
  if (notification) {
    setTimeout(() => {
      setNotification('')
    }, 5000)
  }


  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }
  const Anecdote = ({ anecdotes }) => {
    const { id } = useParams();
    const anecdote = anecdotes.find(a => a.id === Number(id));
  
    if (!anecdote) return <p>Anecdote not found</p>;
  
    return (
      <div>
        <h2>{anecdote.content} by {anecdote.author}</h2>
        <p>has {anecdote.votes} votes</p>
        <p>for more info see <a href={anecdote.info}>{anecdote.info}</a></p>
      </div>
    );
  };
  
  

  return (
    <Router>
    <div className="container">
      <h1>Software anecdotes</h1>
      <Menu />
      <Routes>
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path="/create" element={<CreateNew addNew={addNew} setNotification={setNotification} />} />
        <Route path="/about" element={<About />} />
        <Route path="/anecdotes/:id" element={<Anecdote anecdotes={anecdotes} />} /> {/* Nueva ruta para el detalle de una anécdota */}
      </Routes>
      <Footer />
    </div>
  </Router>
  )
}

export default App
