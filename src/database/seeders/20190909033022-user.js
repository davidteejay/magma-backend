module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Users', [{
    firstName: 'Tosin',
    lastName: 'Alabi',
    email: 'tosin@mail.com',
    managerEmail: 'oluwacrpto@gmail.com',
    password: '$2b$10$pMdypzif2yODRw6UlIiu2OZAyuYH7JUgquHd4cSCo5Xm29WICHIuy',
    isVerified: true,
    enableNotification: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstName: 'Jibson',
    lastName: 'Onyekelu',
    email: 'naimatdavid@mail.com',
    managerEmail: 'oluwacrpto@gmail.com',
    password: '$2b$10$fiqEMlgnIeVVJjHpZrXlfePcqtdcAHe87g5MTrm6DSuIpX7PtPFEy',
    isVerified: true,
    enableNotification: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstName: 'Frank',
    lastName: 'Lampard',
    email: 'frank@gmail.com',
    managerEmail: 'oluwacrpto@gmail.com',
    password: 'frank1234',
    isVerified: false,
    enableNotification: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstName: 'Frank',
    lastName: 'alabi',
    email: 'frank123@gmail.com',
    managerEmail: 'oluwacrpto@gmail.com',
    password: '$2b$10$bWOgNEUdUwdwUTalAYe0YOXbbDqj2S5I9iRHig0CuJpPpx7z0OkjC',
    isVerified: true,
    enableNotification: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstName: 'Frank',
    lastName: 'alabi',
    email: 'viola10@gmail.com',
    managerEmail: 'oluwacrpto@gmail.com',
    password: '$2b$10$bWOgNEUdUwdwUTalAYe0YOXbbDqj2S5I9iRHig0CuJpPpx7z0OkjC',
    isVerified: true,
    enableNotification: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }], {})
};
