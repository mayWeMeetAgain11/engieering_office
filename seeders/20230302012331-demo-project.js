'use strict';
const {faker} = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const projects = [];
    for (let i = 0; i < 30; i++) {
      projects.push({
        name: faker.address.streetName() + ' ' + faker.address.streetSuffix(),
        finished: Math.random() < 0.5 ? true : false,
        comment: faker.lorem.paragraph(),
        accepted: Math.random() < 0.5 ? true : false,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    await queryInterface.bulkInsert('projects', projects);
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
