const jwt = require('jsonwebtoken')
const router = require('express').Router()

const { SECRET } = require('../util/config')
const User = require('../models/user')

router.post('/', async (request, response) => {
  const body = request.body
  console.log("LOGIN CONTROLLER:::body",body)
  const user = await User.findOne({
    where: {
      username: body.username
    }
  })
  console.log("LOGIN CONTROLLER:::user",user)
  const passwordCorrect = body.password === 'secret'
  console.log("LOGIN CONTROLLER:::passwordCorrect",passwordCorrect)
  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }
  
  if (user.disabled) {
    return response.status(401).json({
      error: 'account disabled, please contact admin'
    })
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  }
  console.log("LOGIN CONTROLLER:::userForToken",userForToken)
  const token = jwt.sign(userForToken, SECRET)
  console.log("LOGIN CONTROLLER:::token",userForToken)
  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = router