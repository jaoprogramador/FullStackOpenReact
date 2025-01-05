const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../util/db');

class Blog extends Model {
  static associate(models) {
    // Asociación con User (pertenece a un usuario)
    Blog.belongsTo(models.User, { 
      foreignKey: 'userId',
      as: 'owner', // Alias para identificar al creador del blog
    });

    // Asociación inversa para los usuarios que leen este blog
    Blog.belongsToMany(models.User, {
      through: models.ReadingList, // Nombre del modelo intermedio
      as: 'readers',              // Alias para esta asociación
      foreignKey: 'blogId',       // Clave foránea en la tabla intermedia
    });
  }
}

Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.TEXT,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    year: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1991,
        max: new Date().getFullYear(),
      },
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true, // Sequelize gestionará `createdAt` y `updatedAt`
    modelName: 'blog',
  }
);

module.exports = Blog;
