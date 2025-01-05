require('express-async-errors');
const express = require('express')
const app = express()

const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')
const { tokenExtractor, userExtractor } = require('./middleware/auth');

const notesRouter = require('./controllers/notes')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const readingListRouter = require('./controllers/readinglists');

app.use(express.json())

app.use('/api/notes', notesRouter)
//app.use('/api/blogs', blogsRouter)
app.use('/api/blogs', tokenExtractor, userExtractor, blogsRouter);//Ejercicio 13.10.
app.use('/api/readinglists', readingListRouter);
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use((err, req, res, next) => {
  if (err.name === 'SequelizeValidationError') {
    const errors = err.errors.map(e => e.message);
    return res.status(400).json({ error: errors });
  }
  console.error(err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()