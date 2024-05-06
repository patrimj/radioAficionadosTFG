'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PrincipalesSecundarias extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.ActividadPrincipal, {
        as: 'principal',
        foreignKey: 'id_principal'
      });
      this.belongsTo(models.ActividadSecundaria, {
        as: 'secundaria',
        foreignKey: 'id_secundaria'
      });
      this.hasMany(models.Usuario_secundarias, {
        as: 'usuario_secundarias', 
        foreignKey: 'id_secundaria'
       });
    }
  }
  PrincipalesSecundarias.init({
    id_principal: DataTypes.INTEGER,
    id_secundaria: DataTypes.INTEGER,
    premio: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PrincipalesSecundarias',
    tableName: 'principales_secundarias',
    timestamps: true,
    paranoid: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
  });
  return PrincipalesSecundarias;
};