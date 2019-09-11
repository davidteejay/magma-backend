module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    firstName: { type: Sequelize.STRING, allowNull: false },
    lastName: { type: Sequelize.STRING, allowNull: false },
    email: { type: Sequelize.STRING, allowNull: false, unique: true },
    managerEmail: { type: Sequelize.STRING, allowNull: false, },
    password: { type: Sequelize.STRING, allowNull: false },
    isVerified: { type: Sequelize.BOOLEAN, defaultValue: false },
    enableNotification: { type: Sequelize.BOOLEAN, defaultValue: true },
    createdAt: { type: Sequelize.DATE, allowNull: false },
    updatedAt: { type: Sequelize.DATE, allowNull: false }
  }),
  down: queryInterface => queryInterface.dropTable('Users')
};
