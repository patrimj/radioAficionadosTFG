'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('actividades_secundarias', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_operador: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'usuarios',
            key: 'id'
          },
        }
      },
      nombre: {
        type: Sequelize.STRING
      },
      url_foto: {
        type: Sequelize.STRING
      },
      localizacion: {
        type: Sequelize.STRING
      },
      fecha: {
        type: Sequelize.DATE
      },
      frecuencia: {
        type: Sequelize.STRING
      },
      banda: {
        type: Sequelize.STRING
      },
      id_modo: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'modos_trabajo',
            key: 'id'
          },
        }
      },
      id_modalidad: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'modalidad',
            key: 'id'
          },
        }
      },
      completada: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('actividades_secundarias');
  }
};