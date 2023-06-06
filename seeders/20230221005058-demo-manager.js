'use strict';
const { faker } = require('@faker-js/faker');
const { Office, Manager } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const managers = [];
    const offices = await Office.findAll({ attributes: ['office_id'] });
    for (let i = 0; i < 30; i++) {
      let card_id;
      do {
        card_id = faker.datatype.uuid();
        const existingManager = await Manager.findOne({ where: { card_id: card_id } });
        if (existingManager) {
          card_id = null;
        }
      } while (!card_id);
      managers.push({
        first_name: faker.name.firstName(),
        last_name: faker.name.firstName(),
        card_id: card_id,
        office_id: offices[Math.floor(Math.random() * offices.length)].office_id,
        address: faker.address.streetAddress(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        manage_id: i > 0 ? Math.floor(Math.random() * i + 1) : null,
        salary: faker.datatype.number({
          'min': 1000,
          'max': 5000
        }),
        phone: faker.phone.number(),
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    await queryInterface.bulkInsert('managers', managers);
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
