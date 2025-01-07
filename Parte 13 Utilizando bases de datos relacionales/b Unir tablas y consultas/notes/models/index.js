const Note = require('./note')
const Blog = require('./blog')
const User = require('./user')

Note.sync()
Blog.sync()
User.sync()
User.hasMany(Note)
Note.belongsTo(User)

/* User.hasMany(Blog);
Blog.belongsTo(User); */

Note.sync({ alter: true })
User.sync({ alter: true })
Blog.sync({ alter: true })//PRUEBA

module.exports = {
  Note,
  Blog,
  User
}