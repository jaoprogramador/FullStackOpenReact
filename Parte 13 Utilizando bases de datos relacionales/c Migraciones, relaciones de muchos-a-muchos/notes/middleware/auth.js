const jwt = require('jsonwebtoken');
const { SECRET } = require('../util/config');
const { User, Session } = require('../models');

// Función para extraer el token del encabezado Authorization
const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.token = authorization.substring(7); // Extrae el token del encabezado
  }
  next();
};

// Función para extraer el usuario desde el token y verificar la validez del token
const userExtractor = async (req, res, next) => {
  if (req.token) {
    try {
      const decodedToken = jwt.verify(req.token, SECRET); // Verifica el token
      req.user = await User.findByPk(decodedToken.userId); // Obtiene el usuario de la base de datos

      if (!req.user) {
        return res.status(401).json({ error: 'Usuario no encontrado' });
      }

      // Verifica si el usuario está deshabilitado
      if (req.user.disabled) {
        return res.status(401).json({ error: 'El usuario está deshabilitado' });
      }

      // Verifica que la sesión esté activa en la base de datos
      const session = await Session.findOne({ where: { token: req.token, userId: req.user.id } });

      if (!session) {
        return res.status(401).json({ error: 'Sesión no válida o cerrada' });
      }

    } catch (error) {
      return res.status(401).json({ error: 'Token inválido o expirado' });
    }
  } else {
    return res.status(401).json({ error: 'Token faltante' });
  }
  next(); // Continua a la siguiente función del middleware
};

module.exports = {
  tokenExtractor,
  userExtractor,
};
