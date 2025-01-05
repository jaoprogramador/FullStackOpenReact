require('dotenv').config()
//const { Sequelize } = require('sequelize')
//const { Sequelize, QueryTypes } = require('sequelize')
const { Sequelize, Model, DataTypes } = require('sequelize')
const sequelize = require('./config/database');
//const NoteModel = require('./models/note');
const Note = require('./models/note');
const Blog = require('./models/blog');
const express = require('express')
const app = express()
app.use(express.json());

// Inicializar el modelo
//const Note = NoteModel(sequelize);

// Sincronizar la base de datos
sequelize
  .authenticate()
  .then(() => {
    console.log('Conexión establecida correctamente.');
    return sequelize.sync(); // Sincroniza los modelos con la base de datos
  })
  .then(() => {
    console.log('Modelos sincronizados.');
  })
  .catch((error) => {
    console.error('No se pudo conectar a la base de datos:', error);
  });
  app.get('/api/notes', async (req, res) => {
    const notes = await Note.findAll();
    res.json(notes);
  });
  
  app.post('/api/notes', async (req, res) => {
    try {
      const note = await Note.create(req.body);
      res.json(note);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  app.get('/api/notes/:id', async (req, res) => {
    const note = await Note.findByPk(req.params.id);
    if (note) {
      console.log(note.toJSON())
      res.json(note);
    } else {
      res.status(404).end();
    }
  });
  
  app.put('/api/notes/:id', async (req, res) => {
    const note = await Note.findByPk(req.params.id);
    if (note) {
      note.important = req.body.important;
      await note.save();
      res.json(note);
    } else {
      res.status(404).end();
    }
  });
  // Ruta para obtener todos los blogs
app.get('/api/blogs', async (req, res) => {
  try {
    const blogs = await Blog.findAll();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los blogs' });
  }
});

// Ruta para añadir un nuevo blog
app.post('/api/blogs', async (req, res) => {
  const { author, url, title, likes } = req.body;
  try {
    const newBlog = await Blog.create({ author, url, title, likes });
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el blog' });
  }
});

// Ruta para eliminar un blog por ID
app.delete('/api/blogs/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findByPk(id);
    if (blog) {
      await blog.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Blog no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el blog' });
  }
});
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
  
/* const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
})

class Note extends Model {}
Note.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  important: {
    type: DataTypes.BOOLEAN
  },
  date: {
    type: DataTypes.DATE
  },
  creationYear: {
    type: DataTypes.INTEGER,
  },

}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'note'
}) 

//GETALL
app.get('/api/notes', async (req, res) => {
    //const notes = await sequelize.query("SELECT * FROM notes", { type: QueryTypes.SELECT })
    const notes = await Note.findAll()

    res.json(notes)
  })
  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })

  //ADD NEW 
  app.post('/api/notes', async (req, res) => {
    try {
        const note = await Note.create(req.body)
        return res.json(note)
      } catch(error) {
        return res.status(400).json({ error })
      }
    
  })
  //GETBYID
  app.get('/api/notes/:id', async (req, res) => {
    const note = await Note.findByPk(req.params.id)
    if (note) {
      //console.log(note)
      console.log(note.toJSON())
      res.json(note)
    } else {
      res.status(404).end()
    }
  })
  ///UPDATE 
  app.put('/api/notes/:id', async (req, res) => {
    const note = await Note.findByPk(req.params.id)
    if (note) {
      note.important = req.body.important
      await note.save()
      res.json(note)
    } else {
      res.status(404).end()
    }
  })
//ADD NEW v2
/* app.post('/api/notes', async (req, res) => {
    const note = Note.build(req.body)
    note.important = true
    await note.save()
  }) */

  
/* const main = async () => {
  try {
    await sequelize.authenticate()
    const notes = await sequelize.query("SELECT * FROM notes", { type: QueryTypes.SELECT })
    console.log(notes)
    sequelize.close() 

    // console.log('Connection has been established successfully.')
    //sequelize.close() 
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

main() */