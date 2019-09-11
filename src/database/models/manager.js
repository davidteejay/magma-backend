
module.exports = (sequelize, DataTypes) => {
  const Manager = sequelize.define('Manager', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {});
  Manager.associate = function (models) {
    Manager.hasMany(models.User, {
      as: 'Surbodinates',
      foreignKey: 'email',
      onDelete: 'CASCADE'
    });
  };
  return Manager;
};
