require('dotenv').config();

module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Users', [{
    firstName: 'Super',
    lastName: 'Administrator',
    email: process.env.SUPER_ADMIN_EMAIL,
    password: '$2a$10$.4K1/UgLex9laLMXspBzEOWG/M3QLrOOO09yn8B4ZU05xvTf7Jec.',
    role: 'superAdmin',
    isVerified: true,
    gender: 'Male',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstName: 'Tosin',
    lastName: 'Alabi',
    email: 'tosin@mail.com',
    password: 'tosin1234',
    isVerified: false,
    gender: 'Male',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstName: 'Jibson',
    lastName: 'Onyekelu',
    email: 'naimatdavid@mail.com',
    password: '$2b$10$fiqEMlgnIeVVJjHpZrXlfePcqtdcAHe87g5MTrm6DSuIpX7PtPFEy',
    isVerified: true,
    gender: 'Male',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstName: 'Frank',
    lastName: 'Lampard',
    email: 'frank@gmail.com',
    password: 'frank1234',
    isVerified: false,
    gender: 'Female',
    createdAt: new Date(),
    updatedAt: new Date()
  }], {}),

  down: (queryInterface) => queryInterface.bulkDelete('Users', null, {})
};
