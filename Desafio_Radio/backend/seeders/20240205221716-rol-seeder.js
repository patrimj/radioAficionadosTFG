'use strict';

const {genUsuarios} = require("../factories/usuario.factory");
const {genRoles} = require("../factories/rol.factory");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const roles = await genRoles(['admin', 'operador', 'aficionado']);

    await queryInterface.bulkInsert('roles', roles);
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
