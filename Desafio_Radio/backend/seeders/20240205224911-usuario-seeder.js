'use strict';

const {genUsuarios} = require("../factories/usuario.factory");
const RolesConexion = require("../database/roles.conexion");
const rolesConx = new RolesConexion();
const {aleatorio} = require("../helpers/comun");
const {login} = require("../controllers/auth.controller");

let roles = [];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const users = await genUsuarios(3);

    for (const user of users) {
      if (roles.length < 1) roles = await rolesConx.mostrarRoles();

      await queryInterface.bulkInsert('usuarios', [user]);

      const datosIdUsuario = await queryInterface.sequelize.query(
          `SELECT id FROM usuarios WHERE email = '${user.email}';`
      );

      const idUsuario = datosIdUsuario[0][0].id;

      const idRol = aleatorio(1, roles.length);

      await queryInterface.bulkInsert(
          'roles_asignados',
          [{
            id_rol: idRol,
            id_usuario: idUsuario
          }],
      );
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('usuarios', null, {});
  }
};
