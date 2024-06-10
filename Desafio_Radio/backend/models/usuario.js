'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Rol, { 
        through: models.RolAsignado,
        foreignKey: 'id_usuario',
        as: 'roles'
      });

      this.belongsToMany(models.ActividadSecundaria, {
        through: models.Usuario_secundarias,
        as: 'actividades_secundarias',
        foreignKey: 'id_usuario'
      });

      this.belongsToMany(models.ActividadPrincipal, {
        through: models.usuario_principal,
        as: 'act_principales_usuario',
        foreignKey: 'id_usuario'
      });
      this.hasMany(models.usuario_principal, {
        as: 'usuario_principal',
        foreignKey: 'id_usuario'
      });

      this.hasMany(models.Usuario_secundarias, {
        as: 'usuario_secundarias',
        foreignKey: 'id_usuario'
      });

      this.hasMany(models.RolAsignado, { 
        as: 'rol', 
        foreignKey: 'id_usuario' });
    }
  }
  Usuario.init({
    nombre: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    apellido_uno: DataTypes.STRING,
    apellido_dos: DataTypes.STRING,
    password: DataTypes.STRING,
    url_foto: DataTypes.STRING,
    id_examen: {
      type: DataTypes.STRING,
      unique: true
    },
  }, {
    sequelize,
    modelName: 'Usuario',
    tableName: 'usuarios',
    timestamps: true,
    paranoid: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
  });
  return Usuario;
};