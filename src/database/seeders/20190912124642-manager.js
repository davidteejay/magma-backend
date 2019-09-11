module.exports = {
  up: queryInterface => {
    const managerSeed = [{
      id: 1,
      email: 'oluwacrypto@gmail.com',
      role: 'line manager',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 2,
      email: 'magma@gmail.com',
      role: 'line manager',
      createdAt: new Date(),
      updatedAt: new Date()
    }];
    return queryInterface.bulkInsert('managers', managerSeed, {});
  },

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('managers', null, {})
};
