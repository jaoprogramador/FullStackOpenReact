const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const redisClient = require('./redis/index');  
const indexRouter = require('./routes/index');
const todosRouter = require('./routes/todos');
require('dotenv').config();

const app = express();

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
console.log('app.js::::MONGO_URL', process.env.MONGO_URL);
// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.log('Error al conectar con MongoDB:', err));
  
// Asegúrate de que la conexión a Redis esté establecida antes de levantar el servidor
redisClient.getAsync('test-key') // Intento de lectura
  .then((value) => {
    console.log('Redis operativo. Valor de prueba:', value);
  })
  .catch((err) => {
    console.error('Redis no está disponible:', err);
  });


app.use('/', indexRouter);
app.use('/todos', todosRouter);
app.get('/statistics', async (req, res) => {
  try {
    const addedTodos = await redisClient.getAsync('added_todos');  // Obtener contador de Redis
    res.status(200).json({
      added_todos: parseInt(addedTodos || '0')  // Si no existe, devolvemos 0
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las estadísticas' });
  }
});

app.listen(4000, () => {
    console.log('Servidor Express escuchando en el puerto 4000');
  });
  
module.exports = app;
