const router = require('express').Router()

const { Note } = require('../models')
const { User } = require('../models')
const { tokenExtractor, userExtractor } = require('../middleware/auth');
const { Op } = require('sequelize');
//REFACTOR
/* const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch{
      res.status(401).json({ error: 'token invalid' })
    }
  }  else {
    res.status(401).json({ error: 'token missing' })
  }
  next()
} */

//Ahora el backend puede recuperar notas importantes con una solicitud a
//http://localhost:3001/api/notes?important=true y notas no importantes con una 
//solicitud a http://localhost:3001/api/notes?important=false
router.get('/', async (req, res) => {
  //const notes = await Note.findAll()
  //Conexión entre las tablas
  /* const users = await User.findAll({
    include: {
      model: Note
    }
  }) */
    console.log("CONTROLLER :::NOTES INI")
    try {
      let important = {
        [Op.in]: [true, false]
      }
      if ( req.query.important ) {
        important = req.query.important === "true"
      }
    
      const notes = await Note.findAll({
        attributes: { exclude: ['userId'] },
        include: {
          model: User,
          attributes: ['name']
        },
        where: {
          important,
          content: {
            [Op.substring]: req.query.search ? req.query.search : ''
          }
          //important: req.query.important === "true"
        }
    
      })
    
    res.json(notes)
  } catch(error) {
    console.log("CONTROLLER :::NOTES err",error)
    return res.status(400).json({ error })
  }
})

router.post('/', tokenExtractor, userExtractor, async (req, res) => {
//router.post('/', tokenExtractor, async (req, res) => {
  console.log("CONTROLLER :::NOTES INI")
  try {
    //const note = await Note.create(req.body)
    //Conexión entre las tablas
    /* const user = await User.findOne()
    const note = await Note.create({...req.body, userId: user.id}) */
    //id, content, important, date, userId
    const { id, content, important, date, userId } = req.body;

      if (!req.user) {
        return res.status(401).json({ error: 'Authentication required' });
      }
    console.log("CONTROLLER :::NOTES req.decodedToken.id",req.decodedToken)
    console.log("CONTROLLER :::NOTES req.user",req.user)
    const user = await User.findByPk(req.user.id)
    const note = await Note.create({
      //...req.body, userId: user.id, date: new Date()
      id, content, important, date: new Date(), userId: user.id
    })
    console.log("CONTROLLER :::NOTES user",user)
    console.log("CONTROLLER :::NOTES note",note)
    res.json(note)
  } catch(error) {
    console.log("CONTROLLER :::NOTES err",error)
    return res.status(400).json({ error })
  }
})
const noteFinder = async (req, res, next) => {
    req.note = await Note.findByPk(req.params.id)
    next()
  }
  
  router.get('/:id', noteFinder, async (req, res) => {
    if (req.note) {
      res.json(req.note)
    } else {
      res.status(404).end()
    }
  })
  
  router.delete('/:id', noteFinder, async (req, res) => {
    if (req.note) {
      await req.note.destroy()
    }
    res.status(204).end()
  })
  
  router.put('/:id', noteFinder, async (req, res) => {
    if (req.note) {
      req.note.important = req.body.important
      await req.note.save()
      res.json(req.note)
    } else {
      res.status(404).end()
    }
  })
  // /REFACTOR
/* router.get('/', async (req, res) => {
  const notes = await Note.findAll()
  res.json(notes)
})

router.post('/', async (req, res) => {
  try {
    const note = await Note.create(req.body)
    res.json(note)
  } catch(error) {
    return res.status(400).json({ error })
  }
})

router.get('/:id', async (req, res) => {
  const note = await Note.findByPk(req.params.id)
  if (note) {
    res.json(note)
  } else {
    res.status(404).end()
  }
})

router.delete('/:id', async (req, res) => {
  const note = await Note.findByPk(req.params.id)
  if (note) {
    await note.destroy()
  }
  res.status(204).end()
})

router.put('/:id', async (req, res) => {
  const note = await Note.findByPk(req.params.id)
  if (note) {
    note.important = req.body.important
    await note.save()
    res.json(note)
  } else {
    res.status(404).end()
  }
}) */

module.exports = router