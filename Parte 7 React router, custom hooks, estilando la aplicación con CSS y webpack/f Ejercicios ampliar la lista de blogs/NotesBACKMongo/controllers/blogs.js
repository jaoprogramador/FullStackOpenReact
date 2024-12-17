const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

//GET TOKEN
//==========
const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

//API SELECT
//===========
blogsRouter.get('/', async (req, res) => {
  //const blogs = await Blog.find({});
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  //console.log('Blogs fetched:', blogs);
  res.json(blogs);

});

//API ADD
//===========
blogsRouter.post('/', async (request, response, next) => {
  const jwt = require('jsonwebtoken')
  const { title, author, url, likes } = request.body;
  console.log('POST BLOG')
  console.log('Authorization header:', request.headers.authorization)

  console.log('JWT',jwt)
  console.log('parameters --V',title, author, url, likes)
  console.log('token ',request.token)
  console.log('tokdecodedToken ',process.env.SECRET)
  // Verificamos el token
  //const token = getTokenFrom(request);
  const token = request.token; // Asegúrate de que el token se extraiga correctamente en el middleware
  const decodedToken = jwt.verify(token, process.env.SECRET);

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  // Buscamos al usuario autenticado que está haciendo la petición
  const user = await User.findById(decodedToken.id);

  // Creamos el nuevo blog asociado al usuario autenticado
  const blog = new Blog({
    title,
    author,
    url,
    likes,
    user: user._id // Asociamos el blog al usuario
  });

  try {
    const savedBlog = await blog.save();

    // Agregamos el blog recién creado a la lista de blogs del usuario
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    response.status(201).json(savedBlog);
  } catch (error) {
    next(error);
  }
});

/* GET USERS*/
//API DELETEBYID 
//=============== solo sea posible si el creador del blog es el mismo que el usuario autenticado.


blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    console.log('POST BLOG DELETE')
    const jwt = require('jsonwebtoken')
    
    const token = request.token;
    console.log('POST BLOG DELETE JWT',jwt)
    console.log('POST BLOG DELETE TOKEN',token)
    
    // Verificar el token
    const decodedToken = jwt.verify(token, process.env.SECRET);
    console.log('POST BLOG DELETE decodedToken',decodedToken)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' });
    }

    // Obtener el blog a eliminar
    const blog = await Blog.findById(request.params.id);

    if (!blog) {
      return response.status(404).json({ error: 'blog not found' });
    }

    // Verificar si el usuario autenticado es el creador del blog
    if (blog.user.toString() !== decodedToken.id.toString()) {
      return response.status(401).json({ error: 'only the creator can delete this blog' });
    }

    // Eliminar el blog si el usuario autenticado es el creador
    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();
  } catch (error) {
    console.log('CONTROLLER BLOG_DELETE ERROR',error)
    next(error);
  }
});

//API UPDATE
//===========

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true });
  response.json(updatedBlog);
});

// API UPDATE LIKES
// Actualiza solo el número de likes de un blog específico
blogsRouter.put('/:id/like', async (request, response, next) => {
  try {
    console.log('CONTROLLER BLOG_LIKE')
    const blogId = request.params.id;
    console.log('CONTROLLER BLOG_LIKE',blogId)
    // Incrementa los likes usando $inc para incrementar sin recibir el valor específico
    const updatedBlog = await Blog.findByIdAndUpdate(
      blogId,
      { $inc: { likes: 1 } }, // Incrementa en 1 el valor actual de 'likes'
      { new: true } // Devuelve el blog actualizado
    );
    console.log('CONTROLLER BLOG_LIKE updatedBlog',updatedBlog)

    if (updatedBlog) {
      response.json(updatedBlog);
    } else {
      response.status(404).json({ error: 'Blog not found' });
    }
  } catch (error) {
    console.log('CONTROLLER BLOG_LIKE ERROR',error)
    next(error);
  }
});
// API ADD COMMENTS
//Añadir comentarios
blogsRouter.post('/:id/comments', async (request, response, next) => {
  const { comment } = request.body;
  try {
    const blog = await Blog.findById(request.params.id);
    if (!blog) {
      return response.status(404).json({ error: 'Blog not found' });
    }

    blog.comments = blog.comments.concat(comment);  // Agrega el comentario al array
    await blog.save();
    response.status(201).json(blog);
  } catch (error) {
    next(error);
  }
});

// API GET BLOG BY ID
// ===================
blogsRouter.get('/:id', async (req, res, next) => {
  try {
    // Obtén el blog por ID y usa `populate` para incluir los datos del usuario asociado
    const blog = await Blog.findById(req.params.id).populate('user', { username: 1, name: 1 });
    
    // Si el blog no se encuentra, responde con un error 404
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    // Si el blog se encuentra, envíalo como respuesta en formato JSON
    res.json(blog);
  } catch (error) {
    next(error);
  }
});


  module.exports = blogsRouter


