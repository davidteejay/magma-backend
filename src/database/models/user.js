module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
    type:  DataTypes.STRING,
    allowNull: false
    },
    lastName: { 
     type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    gender: {
      type: DataTypes.ENUM('Male', 'Female', 'Other'),
      allowNull: true
    },
    birthDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    prefferedLanguage: {
      type: DataTypes.STRING,
      allowNull: true
    },
    prefferedCurrency: {
      type: DataTypes.STRING,
      allowNull: true
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    role: {
      type: DataTypes.ENUM('superAdmin', 'travelAdmin', 'travelTeamMember', 'manager', 'requester'),
      allowNull: true,
      defaultValue: "requester"
    },
    department: {
      type: DataTypes.STRING,
      allowNull: true
    },
    managerId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true
    },
  }, {});
  return User;
};
