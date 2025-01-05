const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Session } = require('../models');
const { SECRET_KEY } = require('../util/config');

const router = express.Router();

// Ruta de inicio de sesión
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    if (user.disabled) {
      return res.status(401).json({ error: 'El usuario está deshabilitado' });
    }

    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    // Generar el token JWT
    const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });

    // Guardar la sesión en la base de datos
    await Session.create({ token, userId: user.id });

    res.status(200).json({ token, username: user.username });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

// Ruta de cerrar sesión
router.delete('/logout', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No se proporcionó token' });
  }

  try {
    // Eliminar la sesión de la base de datos
    await Session.destroy({ where: { token } });

    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

module.exports = router;
