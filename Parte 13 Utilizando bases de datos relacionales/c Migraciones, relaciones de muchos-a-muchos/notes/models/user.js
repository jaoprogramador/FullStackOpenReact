const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../util/db');

class User extends Model {
  static associate(models) {
    // Asociación con ReadingList (muchos a muchos con Blog)
    User.belongsToMany(models.Blog, {
      through: models.ReadingList, // Nombre del modelo intermedio
      as: 'readingList',          // Alias para esta asociación
      foreignKey: 'userId',       // Clave foránea en la tabla intermedia
    });

    // Asociación inversa para los blogs creados por el usuario
    User.hasMany(models.Blog, {
      foreignKey: 'userId',
      as: 'blogs', // Alias para los blogs creados por el usuario
    });

    // Asociación con las sesiones (para verificar si el usuario está habilitado y su sesión está activa)
    User.hasMany(models.Session, {
      foreignKey: 'userId',
      as: 'sessions', // Alias para las sesiones de un usuario
    });
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    disabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Indicador de si el usuario está deshabilitado
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true, // Sequelize gestionará `createdAt` y `updatedAt`
    modelName: 'user',
  }
);

module.exports = User;
