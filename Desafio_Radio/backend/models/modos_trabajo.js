'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Modos_trabajo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.ActividadSecundaria, {
        foreignKey: 'id_modo',
        as: 'actividad_secundaria'
      });
    }
  }
  Modos_trabajo.init({
    nombre: {
      type: DataTypes.STRING,
      validate: {
        isIn: [['fonía', 'telegrafía', 'modos digitales']]
      }
    }

  }, {
    sequelize,
    modelName: 'Modos_trabajo',
    tableName: 'modos_trabajo',
  });
  return Modos_trabajo;
};