require('dotenv').config();
const { Sequelize, QueryTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

const main = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión establecida con éxito.');

    /* const blogs = await sequelize.query('SELECT * FROM blogs', { type: QueryTypes.SELECT });
    blogs.forEach(blog => {
      console.log(`${blog.author}: '${blog.title}', ${blog.likes} likes`);
    });
    const notes = await sequelize.query('SELECT * FROM notes', { type: QueryTypes.SELECT });
    notes.forEach(note => {
      console.log(`${note.id}: '${note.content}', ${note.important} important`);
    }); */
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  } finally {
    await sequelize.close();
  }
};

main();
