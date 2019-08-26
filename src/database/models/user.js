
export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    isVerified: { type: DataTypes.BOOLEAN, defaultValue: false }
  }, {});
  User.associate = models => {
    User.hasMany(models.Request, {
      as: 'requester',
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return User;
};
