module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Users', [{
    firstname: 'Jibson',
    lastname: 'Onyekelu',
    email: 'naimatdavid@mail.com',
    password: '$2b$10$fiqEMlgnIeVVJjHpZrXlfePcqtdcAHe87g5MTrm6DSuIpX7PtPFEy',
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {})
};
