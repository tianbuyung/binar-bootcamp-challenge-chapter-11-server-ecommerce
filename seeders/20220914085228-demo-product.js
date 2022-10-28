"use strict";

const { faker } = require("@faker-js/faker");

module.exports = {
	async up(queryInterface, Sequelize) {
		/**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
		const newData = [];

		for (let i = 0; i < 20; i++) {
			const seedData = {
				name: faker.commerce.productName(),
				price: faker.commerce.price(),
				CategoryId: Math.floor(Math.random() * 5) + 1,
				createdAt: new Date(),
				updatedAt: new Date()
			};

			newData.push(seedData);
		}

		await queryInterface.bulkInsert("Products", newData, {});
	},

	async down(queryInterface, Sequelize) {
		/**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
		await queryInterface.bulkDelete("Products", null, {});
	}
};
