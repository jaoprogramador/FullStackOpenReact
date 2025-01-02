const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();

// Ruta para obtener una tarea por ID
/* router.get('/todos/:id', async (req, res) => {
  console.log('TODOS.JS:::GET::todos/:id',req.params.id);
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});  */
// Ruta para actualizar una tarea por ID
/* router.put('/todos/:id', async (req, res) => {
  console.log('TODOS.JS:::PUT:::todos/:id',req.params.id);
  const { text, completed } = req.body;

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { text, completed },
      { new: true, runValidators: true } // Devuelve el documento actualizado
    );

    if (!updatedTodo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});  */

/* GET todos listing. */
router.get('/', async (_, res) => {
  console.log('TODOS.JS:::GET::INI /');
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo.
singleRouter.get('/', async (req, res) => {
  res.sendStatus(405); // Implement this
});
 */
singleRouter.get('/todos/:id', async (req, res) => {
  console.log('TODOS.JS:::GET::todos/:id',req.params.id);
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
  //res.sendStatus(405); // Implement this
});
/* PUT todo. */
singleRouter.put('/todos/:id', async (req, res) => {
  console.log('TODOS.JS:::PUT:::todos/:id',req.params.id);
  const { text, completed } = req.body;

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { text, completed },
      { new: true, runValidators: true } // Devuelve el documento actualizado
    );

    if (!updatedTodo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
  //res.sendStatus(405); // Implement this
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
