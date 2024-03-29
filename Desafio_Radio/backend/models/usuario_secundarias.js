
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Usuario_secundarias extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
        this.belongsTo(models.Usuario, {
          as: 'usuario_secundarias_secundarias',
          foreignKey: 'id_usuario'
        });
        this.belongsTo(models.ActividadSecundaria, {
          as: 'act_secundaria',
          foreignKey: 'id_secundaria'
        });
      }
    }
    Usuario_secundarias.init({
      id_usuario: DataTypes.INTEGER, 
      id_secundaria: DataTypes.INTEGER,
      premio: DataTypes.STRING
    }, {
      sequelize,
      modelName: 'Usuario_secundarias',
      tableName: 'usuario_secundarias',
      timestamps: true,
      paranoid: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
    });
  return Usuario_secundarias;
};