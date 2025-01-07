module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.addColumn('users', 'disabled', {
        type: Sequelize.BOOLEAN,
        defaultValue: false, // por defecto, los usuarios no están deshabilitados
      });
    },
  
    down: async (queryInterface, Sequelize) => {
      await queryInterface.removeColumn('users', 'disabled');
    }
  };
  