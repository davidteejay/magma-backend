'use strict';
module.exports = (sequelize, DataTypes) => {
  const role = sequelize.define('Role', {
    type: {
    type: DataTypes.STRING,
    allowNull: false
    }
  },
  {});
  Role.associate = models => {
    Role.hasMany(models.User, {
      foreignKey: 'roleId'
    });
  };
  return Role;
};