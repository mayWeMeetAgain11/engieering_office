'use strict';

const { faker } = require('@faker-js/faker');
const { Manager, Engineer } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const engineers = [];
    const managers = await Manager.findAll({ attributes: ['manager_id'] });
    for (let i = 0; i < 50; i++) {
      let card_id;
      do {
        card_id = faker.datatype.uuid();
        const existingManager = await Engineer.findOne({ where: { card_id: card_id } });
        if (existingManager) {
          card_id = null;
        }
      } while (!card_id);
      engineers.push({
        first_name: faker.name.firstName(),
        last_name: faker.name.firstName(),
        card_id: card_id,
        job: faker.name.jobTitle(),
        address: faker.address.streetAddress(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        manager_id: managers[Math.floor(Math.random() * managers.length)].manager_id,
        salary: faker.datatype.number({
          'min': 1000,
          'max': 5000
        }),
        phone: faker.phone.number(),
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    await queryInterface.bulkInsert('engineers', engineers);
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
