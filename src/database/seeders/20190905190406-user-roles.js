module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Roles', [{
    id: 1,
    type: 'superAdmin',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 2,
    type: 'travelAdmin',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 3,
    type: 'travelTeamMember',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 4,
    type: 'manager',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 5,
    type: 'user',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 6,
    type: 'guest',
    createdAt: new Date(),
    updatedAt: new Date()
  }], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Roles', null, {})
};
