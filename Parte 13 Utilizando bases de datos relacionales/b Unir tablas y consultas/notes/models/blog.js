const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../util/db')
const User = require('./user');

class Blog extends Model {}

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
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'blog',
  }
);
Blog.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Blog, { foreignKey: 'userId' });

module.exports = Blog;
