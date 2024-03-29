'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ActividadPrincipal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Usuario, {
        through: models.usuario_principal,
        as: 'act_principales_usuario',
        foreignKey: 'id_principal'
      });

      this.belongsToMany(models.ActividadSecundaria, { 
        through: models.PrincipalesSecundarias,
        as: 'act_secundarias',
        foreignKey: 'id_principal'
      });
    }
  }
  ActividadPrincipal.init({
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    url_foto: DataTypes.STRING,
    completada: DataTypes.BOOLEAN,
    solucion: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'ActividadPrincipal',
    tableName: 'actividades_principales',
    timestamps: true,
    paranoid: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",

  });
  return ActividadPrincipal;
};