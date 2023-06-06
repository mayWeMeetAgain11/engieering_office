'use strict';
const { faker } = require('@faker-js/faker');
const { Engineer } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const workHoures = [];
    const engineers = await Engineer.findAll({ attributes: ['engineer_id'] });
    for (let i = 0; i < 150; i++) {
      workHoures.push({
        day: faker.date.weekday(),
        start_time: faker.date.between(),
        finish_time: faker.date.between(),
        engineer_id: engineers[Math.floor(Math.random() * engineers.length)].engineer_id,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    await queryInterface.bulkInsert('workhours', workHoures);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
