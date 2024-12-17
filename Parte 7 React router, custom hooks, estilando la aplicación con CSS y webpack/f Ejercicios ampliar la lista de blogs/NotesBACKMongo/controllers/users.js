const bcrypt = require('bcrypt')
const User = require('../models/user')
const usersRouter = require('express').Router()
/* GET USERS*/
/* ==========
usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users)
  })*/

/* GET USERS CON JOIN DE USER-NOTES*/
/* ==================================*/
  usersRouter.get('/', async (request, response) => {
    //const users = await User
    //  .find({}).populate('notes')
      const users = await User
    .find({}).populate('notes', { content: 1, important: 1 })


  
    response.json(users)
  })
/* ADD USERS*/
/* ==========*/
usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})
/* GET USERSBYID*/
/* ==============*/
usersRouter.get('/:id', async (request, response, next) => {
  try {
    console.log('POST GETUSERSBYID ')
    const jwt = require('jsonwebtoken')
    
    const token = request.token;
    console.log('GETUSERSBYID JWT',jwt)
    console.log('POST BLOG DELETE TOKEN',token)
    
    // Verificar el token
    const decodedToken = jwt.verify(token, process.env.SECRET);
    console.log('GETUSERSBYID decodedToken',decodedToken)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' });
    }

    // Obtener el blog a eliminar
    const user = await User.findById(request.params.id).populate('blogs', {
      title: 1, // Incluye solo el campo `title` del blog
      author: 1, // Puedes añadir otros campos si lo deseas
  
    });
    
    if (!user) {
      return response.status(404).json({ error: 'user not found' });
    }


    console.log('GETUSERSBYID RESPUESTA user',user)
      return response.json(user);
  } catch (error) {
    console.log('CONTROLLER GETUSERSBYID ERROR',error)
    next(error);
  }
});

// API GET USER BY ID
// ===================
usersRouter.get('/:id', async (req, res, next) => {
  console.log("USERCONTROLLER get id ",req.params.id)
  try {
    // Obtén el blog por ID y usa `populate` para incluir los datos del usuario asociado
    const user = await User.findById(req.params.id).populate('blogs', { title: 1, author: 1 , url: 1, likes: 1 });
    console.log("USERCONTROLLER user ",user)
    // Si el blog no se encuentra, responde con un error 404
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Si el user se encuentra, envíalo como respuesta en formato JSON
    res.json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter