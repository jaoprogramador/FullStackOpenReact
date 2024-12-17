const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');  // Importar tu aplicación Express
const Blog = require('../models/blog');  // Importar el modelo de Blog
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const api = supertest(app);
let token = null;

const initialBlogs = [
  {
    title: "First blog",
    author: "John Doe",
    url: "http://example.com/first",
    likes: 5
  },
  {
    title: "Second blog",
    author: "Jane Doe",
    url: "http://example.com/second",
    likes: 10
  }
];

// Limpiar la base de datos y agregar blogs iniciales antes de cada prueba
beforeEach(async () => {
  await Blog.deleteMany({});  // Limpiar la base de datos
  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();

  // Crea un usuario y obtén el token
  const newUser = {
    username: 'testuser',
    name: 'Test User',
    password: 'password123',
  };

  const userResponse = await api.post('/api/users').send(newUser);

  const userForToken = {
    username: newUser.username,
    id: userResponse.body.id,
  };

  token = jwt.sign(userForToken, process.env.SECRET);

  // Agrega un blog para probar
  const newBlog = {
    title: 'Blog de prueba',
    author: 'Juan',
    url: 'http://prueba.com',
    likes: 10,
    user: userResponse.body.id,
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', `Bearer ${token}`);

},10000);

test('a valid blog can be added with token', async () => {
  const newBlog = {
    title: 'Nuevo blog con token',
    author: 'Test Author',
    url: 'http://example.com',
    likes: 15,
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', `Bearer ${token}`)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/blogs');
  const titles = response.body.map(r => r.title);
  expect(titles).toContain('Nuevo blog con token');
});



/*
=================================================TEST1
=================================================
test('blogs are returned as JSON and the correct amount is returned', async () => {
  const response = await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);

  expect(response.body).toHaveLength(initialBlogs.length);
});
=================================================TEST2
=================================================
test('the unique identifier property of blog posts is named id', async () => {
  const response = await api.get('/api/blogs');
  
  // Verificar que todos los blogs tengan un campo id
  const blogs = response.body;
  blogs.forEach((blog) => {
    // Trazas para ver el blog en consola
    console.log('Blog data:', blog);
    
    // Trazas específicas para ver las propiedades id y _id
    console.log('id is defined:', blog.id);
    console.log('_id is undefined:', blog._id);
    expect(blog.id).toBeDefined(); // Verificar que 'id' esté definido
    expect(blog._id).toBeUndefined(); // Verificar que '_id' no esté presente
  });
});
=================================================TEST3
=================================================
test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'New blog',
    author: 'New Author',
    url: 'http://newexample.com',
    likes: 3
  };

  // Obtener la cantidad de blogs antes del POST
  const blogsAtStart = await api.get('/api/blogs');

  // Hacer una solicitud POST para crear un nuevo blog
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)  // Verifica que el código de respuesta sea 201 (Created)
    .expect('Content-Type', /application\/json/);

  // Obtener la cantidad de blogs después del POST
  const blogsAtEnd = await api.get('/api/blogs');
  expect(blogsAtEnd.body).toHaveLength(blogsAtStart.body.length + 1);  // La cantidad debería aumentar en 1

  // Verificar que el nuevo blog esté en la lista de blogs
  const titles = blogsAtEnd.body.map(blog => blog.title);
  expect(titles).toContain('New blog');
});
=================================================TEST4
=================================================
test('if the likes property is missing, it defaults to 0', async () => {
  const newBlog = {
    title: 'Blog without likes',
    author: 'Author without likes',
    url: 'http://example.com/without-likes'
    // Nota: No se incluye la propiedad "likes"
  };

  // Hacer la solicitud POST
  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)  // Verificar que el blog se cree correctamente
    .expect('Content-Type', /application\/json/);

  // Verificar que el campo likes sea 0 por defecto
  expect(response.body.likes).toBe(0);

  // Puedes agregar más verificaciones, como asegurarte de que el blog fue creado
  const blogsAtEnd = await api.get('/api/blogs');
  const createdBlog = blogsAtEnd.body.find(blog => blog.title === 'Blog without likes');
  expect(createdBlog.likes).toBe(0);  // Verifica que se haya guardado con likes = 0
});
=================================================TEST5
=================================================
test('blog without title is not added', async () => {
  const newBlog = {
    author: 'Author without title',
    url: 'http://example.com/without-title',
    likes: 5
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400);  // Verifica que la respuesta sea un 400 Bad Request

  const blogsAtEnd = await api.get('/api/blogs');
  expect(blogsAtEnd.body).toHaveLength(initialBlogs.length);  // El número de blogs no cambia
});
=================================================TEST6
=================================================
test('blog without url is not added', async () => {
  const newBlog = {
    title: 'Blog without URL',
    author: 'Author without url',
    likes: 5
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400);  // Verifica que la respuesta sea un 400 Bad Request

  const blogsAtEnd = await api.get('/api/blogs');
  expect(blogsAtEnd.body).toHaveLength(initialBlogs.length);  // El número de blogs no cambia
});*/




afterAll(async () => {
  await mongoose.connection.close(); // Cerrar conexión
});

