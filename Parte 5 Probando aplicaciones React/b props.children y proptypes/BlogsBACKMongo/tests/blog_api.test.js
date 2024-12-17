const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app'); // La instancia de tu aplicación Express
const Blog = require('../models/blog');
const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  const blog = new Blog({
    title: 'Test Blog',
    author: 'Test Author',
    url: 'http://testurl.com',
    likes: 10,
  });
  await blog.save();
  const initialBlogs = [
    { title: 'Test Blog 1', author: 'Author 1', url: 'http://testurl1.com', likes: 5 },
    { title: 'Test Blog 2', author: 'Author 2', url: 'http://testurl2.com', likes: 10 },
  ];

  await Blog.insertMany(initialBlogs);

});

test('a blog can be deleted', async () => {
  const blogsAtStart = await Blog.find({});
  const blogToDelete = blogsAtStart[0];

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204); // Código de éxito al eliminar sin contenido

  const blogsAtEnd = await Blog.find({});

  expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1);

  const titles = blogsAtEnd.map(r => r.title);

  expect(titles).not.toContain(blogToDelete.title);
});
test('a blog can be updated', async () => {
    const blogsAtStart = await Blog.find({});
    const blogToUpdate = blogsAtStart[0];
  
    const updatedLikes = { likes: 15 }; // Vamos a actualizar el número de "likes"
  
    const result = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedLikes)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  
    expect(result.body.likes).toBe(updatedLikes.likes);
  
    const blogsAtEnd = await Blog.find({});
    const updatedBlog = blogsAtEnd.find(b => b.id === blogToUpdate.id);
  
    expect(updatedBlog.likes).toBe(updatedLikes.likes);
  });
  
afterAll(() => {
  mongoose.connection.close();
});
