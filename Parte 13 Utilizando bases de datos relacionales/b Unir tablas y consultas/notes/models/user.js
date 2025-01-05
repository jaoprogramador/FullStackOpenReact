const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class User extends Model {}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      args: true,
      msg: 'El nombre de usuario ya está en uso',
    },
    validate: {
      isEmail: {
        msg: 'El nombre de usuario debe ser una dirección de correo electrónico válida',
      },
    },

  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'El nombre no puede estar vacío',
      },
    },

  },
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'user',
   // Sequelize añadirá `createdAt` y `updatedAt` automáticamente
   timestamps: true,
   modelName: 'user'
})

module.exports = User