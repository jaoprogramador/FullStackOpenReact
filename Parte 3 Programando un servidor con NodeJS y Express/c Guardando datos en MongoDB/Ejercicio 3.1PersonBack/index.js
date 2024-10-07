 {/*PASO 2
  ===========
 */}
 require('dotenv').config();

 const express = require('express');
 const mongoose = require('mongoose');
 

const app = express();  // Definir la instancia de Express
//const Person = require('./models/person')

const password = process.argv[2];
//const url = `mongodb+srv://jaoprogramador:${password}@cluster0.pxu2t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const Person = require('./models/person')
const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })
  {/*ADD PERSON*/}
  {/*============*/}
  app.post('/api/persons', (request, response) => {
    const body = request.body
  
    if (body.content === undefined) {
      return response.status(400).json({ error: 'content missing' })
    }
  
    const person = new Person({
      name: body.name,
      tlf: body.tlf,
      id: generateId(),
    })
  
    person.save()
        .then(savedPerson => {
            response.json(savedPerson);
        })
        .catch(error => {
            console.error(error);
            response.status(400).send({ error: 'malformatted data' });
        });

  
  })
  const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(n => n.id))
      : 0
    return maxId + 1
  }

  {/*DELETE PERSON*/}
  {/*============*/}
  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
  })

  {/*GET PERSON*/}
  {/*============*/}
  app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
      response.json(person)
    })
  })

  const PORT = process.env.PORT
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })

{/*PASO 2
  ==========
const url = `mongodb+srv://jaoprogramador:eBQlFg3kNN2M0pbL@cluster0.pxu2t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
mongoose.set('strictQuery', false);
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('connected to MongoDB'))
  .catch(error => console.error('error connecting to MongoDB:', error.message));

const personSchema = new mongoose.Schema({
  name: String,
  tlf: String,
});

const Person = mongoose.model('Person', personSchema);

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons);
  }).catch(error => {
    console.error(error);
    response.status(500).end();
  });
});

const PORT = process.env.PORT || 3001; // Usa la variable de entorno o 3001 como predeterminado

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

*/}

 {/*PASO 1
  ==========
  require('dotenv').config()

// Importa el módulo express
const express = require('express');

const morgan = require('morgan');  // Importa Morgan
const app = express();
app.use(express.json())
// Configura Morgan con el formato 'tiny'
app.use(morgan('tiny'));
const cors = require('cors')
app.use(express.static('dist'))
app.use(cors())


const Person = require('./models/person')

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
    "tlf": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "tlf": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "tlf": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "tlf": "39-23-6423122"
  }
];

// Ruta para devolver la lista de personas
 {/*
app.get('/api/persons', (req, res) => {
  res.json(persons);
});

//CAMBIO MONGO
app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(person)
  })
})

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


  app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
      response.json(person)
    })
  })

  const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(n => n.id))
      : 0
    return maxId + 1
  }
  
  app.post('/api/persons', (request, response) => {
    const body = request.body
  
    if (body.content === undefined) {
      return response.status(400).json({ error: 'content missing' })
    }
  
    const person = new Person({
      name: body.name,
      tlf: body.tlf,
      id: generateId(),
    })
  
    person.save().then(savedPerson => {
      response.json(savedPerson)
    })
  
  })

// Definir el puerto donde escuchará la aplicación
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
*/}