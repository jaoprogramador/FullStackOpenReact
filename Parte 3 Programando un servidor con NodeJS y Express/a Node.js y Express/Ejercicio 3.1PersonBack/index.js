// Importa el módulo express
const express = require('express');

const morgan = require('morgan');  // Importa Morgan
const app = express();
app.use(express.json())
// Configura Morgan con el formato 'tiny'
app.use(morgan('tiny'));






// Crear un token personalizado para registrar el cuerpo de la solicitud
morgan.token('body', (req) => {
    return JSON.stringify(req.body);  // Serializa el cuerpo de la solicitud
  });
  
  // Configurar morgan con formato 'tiny' y agregar el token del cuerpo
  app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));
  

// Datos de la agenda telefónica
let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
];

// Ruta para devolver la lista de personas
app.get('/api/persons', (req, res) => {
  res.json(persons);
});

app.get('/info', (req, res) => {
    const numberOfPersons = persons.length;
    const currentDate = new Date();
  
    res.send(`
      <p>Phonebook has info for ${numberOfPersons} people</p>
      <p>${currentDate}</p>
    `);
  });

  app.get('/api/info', (req, res) => {
    res.send('<h1>Hello World!</h1>')

  })
  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
  })

/*

  app.post('/api/persons', (request, response) => {
    const body = request.body
  
    if (!body.content) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    }
  
    const person = {
      content: body.content,
      important: Boolean(body.important) || false,
      id: generateId(),
    }
  
    person = person.concat(person)
  
    response.json(person)
  })
  */
  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    
    
  const person = persons.find(person => person.id === id)
  
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
  
  
  
  })

  const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(n => n.id))
      : 0
    return maxId + 1
  }
  
  app.post('/api/persons', (request, response) => {
    const body = request.body
  
    if (!body.name) {
      return response.status(400).json({ 
        error: 'name missing' 
      })
    }
  
    const person = {
      name: body.name,
      number: body.number,
      id: generateId(),
    }
  
    persons = persons.concat(person)
  
    response.json(person)
  })

// Definir el puerto donde escuchará la aplicación
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});