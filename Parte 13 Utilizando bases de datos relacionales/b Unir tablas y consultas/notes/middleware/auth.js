//Ejercicio 13.10.
const jwt = require('jsonwebtoken');
const { SECRET } = require('../util/config');
const User = require('../models/user');

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.token = authorization.substring(7);
  }
  next();
};

const userExtractor = async (req, res, next) => {
  if (req.token) {
    try {
      const decodedToken = jwt.verify(req.token, SECRET);
      req.user = await User.findByPk(decodedToken.id);
    } catch (error) {
      return res.status(401).json({ error: 'Invalid token' });
    }
  } else {
    return res.status(401).json({ error: 'Token missing' });
  }
  next();
};

module.exports = {
  tokenExtractor,
  userExtractor,
};
