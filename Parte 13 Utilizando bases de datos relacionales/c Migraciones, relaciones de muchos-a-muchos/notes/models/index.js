/* const Note = require('./note')
const Blog = require('./blog')
const User = require('./user')
const Team = require('./team')
const Membership = require('./membership')
const UserNotes = require('./user_notes')

// Note.sync()
//Blog.sync()
//User.sync()
User.hasMany(Note)
Note.belongsTo(User)

User.belongsToMany(Team, { through: Membership })
Team.belongsToMany(User, { through: Membership })

User.belongsToMany(Note, { through: UserNotes, as: 'marked_notes' })
Note.belongsToMany(User, { through: UserNotes, as: 'users_marked' })

//User.hasMany(Blog);
//Blog.belongsTo(User); 

//Note.sync({ alter: true })
//User.sync({ alter: true })
//Blog.sync({ alter: true }) 

module.exports = {
  Note,
  Blog,
  User,
  Team, Membership, UserNotes
} */
  const Note = require('./note');
  const Blog = require('./blog');
  const User = require('./user');
  const Team = require('./team');
  const Membership = require('./membership');
  const UserNotes = require('./user_notes');
  const ReadingList = require('./reading_list'); // Asegúrate de incluir este modelo si es necesario
  
  // Configurar asociaciones
  const models = { Note, Blog, User, Team, Membership, UserNotes, ReadingList };
  
  Object.values(models).forEach((model) => {
    if (model.associate) {
      model.associate(models); // Registrar asociaciones definidas en los modelos
    }
  });
  
  // Exportar modelos
  module.exports = models;
  