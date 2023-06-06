'use strict';
const {faker} = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const contractors = [];
    for (let i = 0; i < 30; i++) {
      contractors.push({
        first_name: faker.name.firstName(),
        last_name: faker.name.firstName(),
        name: faker.company.companyName(),
        address: faker.address.streetAddress(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        phone: faker.phone.number(),
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    await queryInterface.bulkInsert('contractors', contractors);
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
