const router = require('express').Router()

const { User } = require('../models')
const { Blog } = require('../models')
/*
router.get('/', async (req, res) => {
  // const users = await User.findAll() 
  const users = await User.findAll({
    include: {
      model: Note,
      attributes: { exclude: ['userId'] }
    }
  })

  res.json(users)
})

 router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body)
    res.json(user)
  } catch(error) {
    return res.status(400).json({ error })
  }
}) */
// Crear un nuevo usuario
router.post('/', async (req, res, next) => {
    try {
      const { name, username } = req.body;
      if (!name || !username) {
        return res.status(400).json({ error: 'Name and username are required' });
      }
      const newUser = await User.create({ name, username });
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  });
  // Obtener todos los usuarios
router.get('/', async (req, res, next) => {
  try {
    //const users = await User.findAll();
    const users = await User.findAll({
        include: {
          model: Blog,
          attributes: ['id', 'author', 'title', 'url','likes'], // Especifica los atributos que deseas obtener
        },
      });
  
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

// Actualizar el nombre de usuario por username
router.put('/:username', async (req, res, next) => {
  try {
    const { username } = req.params;
    const { newUsername } = req.body;
    if (!newUsername) {
      return res.status(400).json({ error: 'New username is required' });
    }
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    user.username = newUsername;
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});
router.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id)
  if (user) {
    res.json(user)
  } else {
    res.status(404).end()
  }
})

module.exports = router