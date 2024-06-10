'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class usuario_principal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Usuario, {
        as: 'usuario',
        foreignKey: 'id_usuario'
      });
      this.belongsTo(models.ActividadPrincipal, {
        as: 'actividad_principal',
        foreignKey: 'id_principal'
      });
      this.hasMany(models.PrincipalesSecundarias, {
        as: 'principales_secundarias',
        foreignKey: 'id_principal'
      });
    }
  }
  usuario_principal.init({
    id_usuario: DataTypes.INTEGER,
    id_principal: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'usuario_principal',
    tableName: 'usuario_principales',
    timestamps: true,
    paranoid: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
  });
  return usuario_principal;
};