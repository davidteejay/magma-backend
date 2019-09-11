export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    managerEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    isVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
    enableNotification: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {});
  User.associate = models => {
    User.hasMany(models.Notifications, {
      as: 'notification',
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    User.hasMany(models.Notifications, {
      as: 'Email',
      foreignKey: 'userEmail',
      onDelete: 'CASCADE',
    });
    User.hasMany(models.Notifications, {
      as: 'enabled',
      foreignKey: 'enabled',
      onDelete: 'CASCADE',
    });
    User.hasMany(models.Request, {
      as: 'requester',
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    User.belongsTo(models.Manager, {
      as: 'manager',
      foreignKey: 'managerEmail',
      targetKey: 'email',
      onDelete: 'CASCADE',
    });
  };
  return User;
};
