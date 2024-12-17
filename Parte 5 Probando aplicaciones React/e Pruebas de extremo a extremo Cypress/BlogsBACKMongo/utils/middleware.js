const logger = require('./logger')
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    return response.status(400).json({ error: 'expected `username` to be unique' })
  }else if (error.name ===  'JsonWebTokenError') {
    return response.status(401).json({ error: 'token invalid' })
  }else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired'
    })
  }



  next(error)
}
const tokenExtractor = (request, response, next) => {
  console.log('MIDDLEWARE::::tokenExtractor')
  const authorization = request.get('authorization');
  console.log('authorization',authorization)
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7); // Extrae el token del encabezado Bearer
  } else {
    request.token = null; // Si no hay token, asigna null
  }
  console.log('authorization EN REQUESTOKEN',request.token)
  next(); // Pasa al siguiente middleware
};

// Middleware userExtractor
const userExtractor = async (request, response, next) => {
  console.log('MIDDLEWARE::::userExtractor')
  const authorization = request.get('authorization');
  console.log('authorization',authorization)
  let token = null;

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    token = authorization.substring(7);
  }
  console.log('token',token)
  if (token) {
    try {
      const decodedToken = jwt.verify(token, process.env.SECRET);
      console.log('decodedToken',decodedToken)
      if (decodedToken.id) {
        request.user = await User.findById(decodedToken.id);
        console.log('request.user',request.user)
      }
    } catch (error) {
      console.error('Token verification failed:', error.message);
    }
  }

  next();
};



module.exports = {
  userExtractor,
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor
}