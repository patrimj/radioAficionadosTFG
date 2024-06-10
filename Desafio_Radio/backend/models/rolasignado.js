'use strict';
const {
  Model
} = require('sequelize');
const {fa} = require("@faker-js/faker");
module.exports = (sequelize, DataTypes) => {
  class RolAsignado extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Usuario, {
        foreignKey: 'id_usuario',
        as: 'usuario',
      });
      this.belongsTo(models.Rol, {
        foreignKey: 'id_rol',
        as: 'rol',
      });
    }
  }
  RolAsignado.init({
    id_rol: DataTypes.INTEGER,
    id_usuario: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'RolAsignado',
    tableName: 'roles_asignados',
    timestamps: false
  });
  return RolAsignado;
};