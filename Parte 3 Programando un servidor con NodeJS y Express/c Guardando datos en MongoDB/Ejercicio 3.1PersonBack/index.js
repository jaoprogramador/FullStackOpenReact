 {/*PASO 2
  ===========
 */}
 require('dotenv').config();  // Asegúrate de cargar las variables de entorno al inicio

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');

// Primero declara la instancia de Express
const app = express();  // Esto debe ir antes de usar `app.use`

// Middlewares
app.use(express.static('dist'));  //  Sirve archivos estáticos desde 'dist'
app.use(express.json());
app.use(cors());
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "https://static.cloudflareinsights.com"]
  }
}));


const password = process.argv[2];
//const url = `mongodb+srv://jaoprogramador:${password}@cluster0.pxu2t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const Person = require('./models/person')
const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB:::index.js')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

  app.use(express.json());


  {/*ADD PERSON*/}
  {/*============*/}
  app.post('/api/personsMG', (request, response) => {
    const body = request.body; 
    console.log('BACKJAO::api/personsMG ',body)
    if (!body.name || !body.tlf) {
      return response.status(400).json({ error: 'name or phone number missing' });
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
    return Date.now();  // Usamos el timestamp actual como ID único
{/*============
    const maxId = persons.length > 0
      ? Math.max(...persons.map(n => n.id))
      : 0
    return maxId + 1*/}
  }

  {/*DELETE PERSON*/}
  {/*============*/}
  app.delete('/api/personsMG/:id', (request, response) => {
    const id = request.params.id;  // MongoDB usa un id como string

    Person.findByIdAndDelete(id)  // Usar findByIdAndDelete
        .then(result => {
            if (result) {
                response.status(204).end();  // Persona eliminada
            } else {
                response.status(404).json({ error: 'person not found' });
            }
        })
        .catch(error => {
            console.error(error);
            response.status(500).json({ error: 'server error' });
        });

});
{/*UPDATE PERSON*/}
  {/*============*/}
  app.put('/api/personsMG/:id', (request, response) => {
    const id = request.params.id;
    const { name, tlf } = request.body;
  
    const updatedPerson = { name, tlf };
  
    Person.findByIdAndUpdate(id, updatedPerson, { new: true, runValidators: true, context: 'query' })
      .then(updatedPerson => {
        if (updatedPerson) {
          response.json(updatedPerson);  // Devolver la persona actualizada al frontend
        } else {
          response.status(404).json({ error: 'person not found' });
        }
      })
      .catch(error => {
        console.error(error);
        response.status(400).json({ error: 'malformatted id or validation error' });
      });
  });
  



  {/*GET PERSON*/}
  {/*============
  app.get('/api/personsMG', (request, response) => {
    Person.findById(request.params.id).then(person => {
      response.json(person)
    })
  })*/}

  app.get('/api/personsMG', async (req, res) => {
    try {
      const persons = await Person.find({});
      res.json(persons);
    } catch (error) {
      res.status(500).send({ error: 'Error al obtener las personas' });
    }
  });
   {/*GET PERSONBY ID*/}
  {/*=================*/}
  app.get('/api/personsMG/:id', (request, response) => {
    Person.findById(request.params.id)
      .then(person => {
        if (person) {
          response.json(person)
        } else {
          response.status(404).end() 
        }
      })
      .catch(error => {
        console.log(error)
        response.status(400).send({ error: 'malformatted id' })
      })
  })
  
  const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
  // controlador de solicitudes con endpoint desconocido
  app.use(unknownEndpoint)

  
  const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } 
  
    next(error)
  }
  
  // este debe ser el último middleware cargado, ¡también todas las rutas deben ser registrada antes que esto!
  app.use(errorHandler)
  const PORT = process.env.PORT
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })

