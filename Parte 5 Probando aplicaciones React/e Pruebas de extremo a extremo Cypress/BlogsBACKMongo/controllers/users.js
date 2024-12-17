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

module.exports = usersRouter