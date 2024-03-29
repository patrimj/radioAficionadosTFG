'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ActividadSecundaria extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Modos_trabajo, {
        foreignKey: 'id_modo',
        as: 'modo'
      });

      this.belongsTo(models.Modalidad, {
        foreignKey: 'id_modalidad',
        as: 'modalidad'
      });

      this.belongsToMany(models.Usuario, {
        through: models.Usuario_secundarias,
        as: 'usuarios',
        foreignKey: 'id_secundaria'
      });

      this.belongsToMany(models.ActividadPrincipal, {
        through: models.PrincipalesSecundarias,
        as: 'act_primarias',
        foreignKey: 'id_secundaria'
      });

      this.belongsTo(models.Usuario, {
        foreignKey: 'id_operador',
        as: 'operador'
      });
      this.hasMany(models.Usuario_secundarias, {
        as: 'act_secundarias_usuario',
        foreignKey: 'id_secundaria'
      });
    }
  }
  ActividadSecundaria.init({
    id_operador: DataTypes.INTEGER,
    nombre: DataTypes.STRING,
    url_foto: DataTypes.STRING,
    localizacion: DataTypes.STRING,
    fecha: DataTypes.DATE,
    frecuencia: DataTypes.STRING,
    banda: DataTypes.STRING,
    id_modo: DataTypes.INTEGER,
    id_modalidad: DataTypes.INTEGER,
    completada: DataTypes.BOOLEAN
  }, {
    
    sequelize,
    modelName: 'ActividadSecundaria',
    tableName: 'actividades_secundarias',
    timestamps: true,
    paranoid: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",

  });
  return ActividadSecundaria;
};