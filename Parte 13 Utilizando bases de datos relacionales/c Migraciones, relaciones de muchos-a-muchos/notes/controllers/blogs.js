const router = require('express').Router()
const { Op } = require('sequelize');
const { Blog } = require('../models')
const { User } = require('../models')
const { tokenExtractor, userExtractor } = require('../middleware/auth');
//Ejercicio 13.11.
//router.delete('/blogs/:id', tokenExtractor, userExtractor, async (req, res) => {
  router.delete('/:id', tokenExtractor, userExtractor, async (req, res) => {

  const blogId = req.params.id;
  const userId = req.user.id;

  try {
    const blog = await Blog.findByPk(blogId);

    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    if (blog.userId !== userId) {
      return res.status(403).json({ error: 'You are not authorized to delete this blog' });
    }

    await blog.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while trying to delete the blog' });
  }
});

//Ejercicio 13.10.
//router.post('/blogs', tokenExtractor, userExtractor, async (req, res) => {
router.post('/', tokenExtractor, userExtractor, async (req, res) => {
  try {  
    console.log("CONTROLLER :::BLOGS req.body",req.body)
    const { title, content, likes, url, author, year } = req.body;

      if (!req.user) {
        return res.status(401).json({ error: 'Authentication required' });
      }

      const blog = await Blog.create({
        title,
        content,
        userId: req.user.id,
        likes,
        url,
        author,
        year
      });

      res.status(201).json(blog);
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ error: error.errors[0].message });
    }
    console.log("CONTROLLER :::BLOGS error",error)
    res.status(400).json({ error: 'Error al crear el blogs' });
  }
});

//REFACTOR
router.get('/', async (req, res) => {
  console.log("CONTROLLER :::BLOGS I´NI")
  try {
    //const blogs = await Blog.findAll()
    const blogs = await Blog.findAll({
      include: {
        model: User,
        attributes: ['id', 'username', 'name'], // Especifica los atributos que deseas obtener
      },
    });
    console.log("CONTROLLER :::BLOGS blogs",blogs)
    res.json(blogs)
  } catch (error) {
    console.log("CONTROLLER :::BLOGS error",error)
    res.status(400).json({ error: 'Error al mostrar los blogs' });
  }
})

/* router.post('/', async (req, res) => {
  console.log("CONTROLLER:::BLOGS CREATE INI:",req.body)
  try {
    const blogs = await Blog.create(req.body)
    res.json(blogs)
  } catch(error) {
    console.log("CONTROLLER:::BLOGS CREATE error:",error)
    //return res.status(400).json({ error })
    return res.status(400).json({ error: 'Error al actualizar los likes' });

  }
})  */
const blogFinder = async (req, res, next) => {
    req.blog = await Blog.findByPk(req.params.id)
    next()
  }
  
 router.get('/:id', blogFinder, async (req, res) => {
    if (req.blog) {
      res.json(req.blog)
    } else {
      res.status(404).end()
    }
  })
  
  /* router.delete('/:id', blogFinder, async (req, res) => {
    if (req.blog) {
      await req.blog.destroy()
    }
    res.status(204).end()
  })  */
  
  router.put('/:id', blogFinder, async (req, res) => {
    if (req.blog) {
      
      //req.blog.like = req.body.like
      req.blog.likes = req.body.likes;  
      await req.blog.save()
      res.json(req.blog)
    } else {
      res.status(404).end()
    }
  })
  //Ejercicio 13.13. GET /api/blogs?search=react
  // Ejercicio 13.14.
  /* router.get('/api/blogs', async (req, res) => {
    const searchQuery = req.query.search;
  
    // Construir el objeto 'where' condicionalmente
    const where = searchQuery
      ? {
          [Op.or]: [
            {
              title: {
                [Op.iLike]: `%${searchQuery}%`, // Filtrado insensible a mayúsculas y minúsculas
              },
            },
            {
              author: {
                [Op.iLike]: `%${searchQuery}%`, // Filtrado insensible a mayúsculas y minúsculas
              },
            },
          ],
        }
      : {};
  
    try {
      const blogs = await Blog.findAll({
        where,
        include: {
          model: User,
          attributes: ['id', 'username', 'name'],
        },
      });
      res.json(blogs);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los blogs' });
    }
  }); */
  //Ejercicio 13.15.los blogs en función de los likes en orden descendente

  router.get('/api/blogs', async (req, res) => {
    try {
      const blogs = await Blog.findAll({
        order: [['likes', 'DESC']], // Ordenar por 'likes' en orden descendente
        include: {
          model: User,
          attributes: ['id', 'username', 'name'],
        },
      });
      res.json(blogs);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los blogs' });
    }
  });
  //número de blogs de cada autor y el número total de likes
  router.get('/api/authors', async (req, res) => {
    try {
      const authors = await Blog.findAll({
        attributes: [
          'author',
          [sequelize.fn('COUNT', sequelize.col('id')), 'articles'],
          [sequelize.fn('SUM', sequelize.col('likes')), 'likes'],
        ],
        group: ['author'],
        order: [[sequelize.fn('SUM', sequelize.col('likes')), 'DESC']],
        raw: true,
      });
  
      res.json(authors);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los autores' });
    }
  });
  
  
    module.exports = router