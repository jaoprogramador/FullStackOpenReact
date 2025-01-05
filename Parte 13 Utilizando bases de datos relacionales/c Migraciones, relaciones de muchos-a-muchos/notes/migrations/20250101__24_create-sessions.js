module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('sessions', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        token: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        },
        user_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'users', // Referencia a la tabla 'users'
            key: 'id'
          },
          onDelete: 'CASCADE', // Si el usuario es eliminado, eliminamos la sesión
        },
        created_at: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW
        },
        updated_at: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW
        }
      });
    },
  
    down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('sessions');
    }
  };
  