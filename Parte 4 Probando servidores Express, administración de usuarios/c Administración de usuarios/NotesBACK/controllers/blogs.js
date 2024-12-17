const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
/* API CON PROMESAS
  de varias líneas 
blogsRouter.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
  })

  blogsRouter.post('/', (request, response, next) => {
    const blog = new Blog(request.body)
  
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
  })
    REFACTORIZAR ASYNC
    ===================
*/
blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({});
  console.log('Blogs fetched:', blogs);
  res.json(blogs);

});

blogsRouter.post('/', (request, response, next) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})




  module.exports = blogsRouter


