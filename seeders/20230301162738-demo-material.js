'use strict';
const {faker} = require('@faker-js/faker');
const { Category, Contractor } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const materials = [];
    const contractors = await Contractor.findAll({
      attributes: ['contractor_id']
    });
    const categories = await Category.findAll({
      attributes: ['category_id']
    });
    for (let i = 0; i < 30; i++) {
      materials.push({
        name: faker.commerce.productMaterial(),
        contractor_id: contractors[Math.floor(Math.random() * contractors.length)].contractor_id,
        category_id: categories[Math.floor(Math.random() * categories.length)].category_id,
        image: faker.image.imageUrl(640, 480, 'nature'),
        rate: Math.floor(Math.random() * 4 + 1),
        unit_price: faker.commerce.price(),
        qualification: faker.commerce.productDescription(),
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    await queryInterface.bulkInsert('materials', materials);
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
