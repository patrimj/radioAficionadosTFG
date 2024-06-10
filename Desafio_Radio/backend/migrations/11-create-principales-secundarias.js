'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('principales_secundarias', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_principal: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'actividades_principales',
            key: 'id'
          },
        },
      },
      id_secundaria: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'actividades_secundarias',
            key: 'id'
          },
        },
      },
      premio: {
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('principales_secundarias');
  }
};