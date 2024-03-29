'use strict';

const {genSecundarias} = require("../factories/secundaria.factory");
const {genUsuarioSec} = require("../factories/usuario-secundaria.factory");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const actividades = genUsuarioSec(2);

    await queryInterface.bulkInsert('usuario_secundarias', actividades, {});
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
