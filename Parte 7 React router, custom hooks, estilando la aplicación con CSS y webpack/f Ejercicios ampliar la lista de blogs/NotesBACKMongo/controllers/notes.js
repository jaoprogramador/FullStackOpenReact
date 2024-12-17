
const notesRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user'); 


//GENERAR TOKEN
//###############
const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

//PETICIONES HTTP
//################
notesRouter.get('/', async (request, response) => {
  //console.log('CONTROLLER NOTES GET')
  try{
    const notes = await Note.find({})
    //console.log('JSON NOTES ',notes)
    response.json(notes)
  } catch (error) {
    console.error('Error fetching notes:', error);
    response.status(500).json({ error: 'An error occurred while fetching notes' });
  }
})

notesRouter.get('/:id', (request, response, next) => {
  Note.findById(request.params.id)
    .then(note => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})
//PETICION de NOTAS por token de acceso
notesRouter.post('/', async (req, res) => {
  const jwt = require('jsonwebtoken')
  const body = req.body;

  const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)

  // Asegúrate de que el userId existe
  //const user = await User.findById(body.userId);
  //if (!user) {
  //  return res.status(400).json({ error: 'User not found' });
  //}

  const note = new Note({
    content: body.content,
    important: body.important || false,
    user: user._id
  });

  const savedNote = await note.save();
  res.status(201).json(savedNote);


  /*const body = request.body

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })
 FORMA VIEJA
  note.save()
    .then(savedNote => {
      response.status(201).json(savedNote)
    })
    .catch(error => next(error))
*/
/* FORMA SENCILLA
    try {

      const savedNote = await note.save()
      response.status(201).json(savedNote)
    } catch(exception) {
      next(exception)
    }*/

})

notesRouter.delete('/:id', (request, response, next) => {
  Note.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

notesRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const note = {
    content: body.content,
    important: body.important,
  }

  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
})

module.exports = notesRouter