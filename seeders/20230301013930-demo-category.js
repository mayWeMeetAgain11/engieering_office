'use strict';
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const categories = [];
    for (let i = 0; i < 30; i++) {
      categories.push({
        name: faker.address.cityPrefix() + ' ' + faker.address.citySuffix(),
        image: faker.image.imageUrl(640, 480, 'city'),
        root_id: i > 7 ? Math.floor(Math.random() * 6 + 1) : null,
        evaluation_type: Math.random() < 0.5 ? true : false,
        parent_category_id: i > 7 ? Math.floor(Math.random() * i + 1) : null,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    await queryInterface.bulkInsert('categories', categories);
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
