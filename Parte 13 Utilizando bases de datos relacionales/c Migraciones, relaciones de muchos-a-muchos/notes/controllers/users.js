const router = require('express').Router()
const { tokenExtractor, userExtractor } = require('../middleware/auth');
const { User } = require('../models')
const { Blog } = require('../models')
const { Team } = require('../models')
const { Note } = require('../models')
const { ReadingList } = require('../models');

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
        include: [
          {
            model: Blog,
            attributes: ['id', 'author', 'title', 'url','likes'], // Especifica los atributos que deseas obtener
          },
          
          {
            model: Team,
            attributes: ['name', 'id'],
            through: {
              attributes: []
            }    
          }
        ]
        
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
/**
 * GET /api/users/:id
 * Devuelve la información de un usuario, incluyendo su lista de lectura.
 * Soporta filtrado por blogs leídos/no leídos a través del query parameter `read`.
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { read } = req.query;

    // Buscar al usuario por ID
    const user = await User.findByPk(id, {
      attributes: ['name', 'username'], // Campos que queremos devolver
      include: {
        model: Blog,
        as: 'readingList', // Nombre del alias definido en el modelo User
        attributes: ['id', 'url', 'title', 'author', 'likes', 'year'],
        through: {
          attributes: ['id', 'read'], // Incluir información de la tabla intermedia
          where: read !== undefined ? { read: read === 'true' } : {}, // Filtro por `read`
        },
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});
// Obtener información del usuario por ID, incluyendo la lista de lectura
/* router.get('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: ['id', 'name', 'username'], // Campos básicos del usuario
      include: [
        {
          model: Blog,
          as: 'readingList', // Alias definido en la relación
          attributes: ['id', 'url', 'title', 'author', 'likes', 'year'],
          through: {
            model: ReadingList,
            attributes: ['read', 'id'], // Incluir solo estos campos de la tabla intermedia
          },
        },
      ],
    });

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error del servidor' });
  } */


  /* const user = await User.findByPk(req.params.id, {
    attributes: { exclude: [''] } ,
    include:[{
        model: Note,
        attributes: { exclude: ['userId'] }
      },
      {
        model: Note,
        as: 'marked_notes',
        attributes: { exclude: ['userId']},
        through: {
          attributes: []
        },
        include: {
          model: User,
          attributes: ['name']
        }
      },
      {
        model: Team,
        attributes: ['name', 'id'],
        through: {
          attributes: []
        }
      },
    ]
  })

  if (user) {
    res.json(user)
  } else {
    res.status(404).end()
  } */

  /* const user = await User.findByPk(req.params.id, {
    include: {
        model: Note
      }
    }
  )

  if (user) {
    res.json({
      username: user.username,
      name: user.name,
      note_count: user.notes.length
    })

  } else {
    res.status(404).end()
  } 
})*/

const isAdmin = async (req, res, next) => {
  const user = await User.findByPk(req.decodedToken.id)
  if (!user.admin) {
    return res.status(401).json({ error: 'operation not allowed' })
  }
  next()
}

router.put('/:username', tokenExtractor, isAdmin, async (req, res) => {
  const user = await User.findOne({
    where: {
      username: req.params.username
    }
  })

  if (user) {
    user.disabled = req.body.disabled
    await user.save()
    res.json(user)
  } else {
    res.status(404).end()
  }
})
module.exports = router