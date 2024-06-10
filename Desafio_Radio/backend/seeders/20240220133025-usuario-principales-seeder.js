'use strict';

const {genSecundarias} = require("../factories/secundaria.factory");
const {genUsuarioPrinc} = require("../factories/usuario-principal.factory");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const actividades = genUsuarioPrinc(2);

    await queryInterface.bulkInsert('usuario_principales', actividades, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
