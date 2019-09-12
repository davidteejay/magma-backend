module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Users', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      firstName: { type: Sequelize.STRING, allowNull: false,},
      lastName: { type: Sequelize.STRING, allowNull: false},
      email: { type: Sequelize.STRING, allowNull: false, unique: true },
      password: { type: Sequelize.STRING, allowNull: false },
      isVerified: { type: Sequelize.BOOLEAN, allowNull: true },
      gender: { type: Sequelize.ENUM('Male', 'Female', 'Other'), allowNull: true },
      birthDate: { type: Sequelize.DATEONLY, allowNull: true },
      prefferedLanguage: { type: Sequelize.STRING, allowNull: true },
      prefferedCurrency: { type: Sequelize.STRING, allowNull: true },
      address: { type: Sequelize.TEXT, allowNull: true },
      role: { type: Sequelize.ENUM('superAdmin', 'travelAdmin', 'travelTeamMember', 'manager', 'requester'), allowNull: true, defaultValue: "requester" },
      department: { type: Sequelize.STRING, allowNull: true },
      managerId: { type: Sequelize.INTEGER, allowNull: true },
      phoneNumber: { type: Sequelize.STRING, allowNull: true },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    }),
    down: (queryInterface) => queryInterface.dropTable('Users')
  };
  