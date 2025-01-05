'use strict';
const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('blogs', 'year', {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1991,
        max: new Date().getFullYear(),
      },
      defaultValue: new Date().getFullYear(),
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('blogs', 'year');
  }
};
