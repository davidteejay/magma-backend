module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn( 'Users', 'roleId', Sequelize.INTEGER );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn( 'Users', 'roleId' );
  }
};
