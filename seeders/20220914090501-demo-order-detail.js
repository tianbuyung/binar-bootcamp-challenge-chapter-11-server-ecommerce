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
				OrderId: Math.floor(Math.random() * 5) + 1,
				ProductId: Math.floor(Math.random() * 20) + 1,
				qty: Math.floor(Math.random() * 20) + 1,
				price: faker.commerce.price(),
				totalOrderDetail: (Math.floor(Math.random() * 20) + 1) * faker.commerce.price(),
				createdAt: new Date(),
				updatedAt: new Date()
			};

			newData.push(seedData);
		}

		await queryInterface.bulkInsert("OrderDetails", newData, {});
	},

	async down(queryInterface, Sequelize) {
		/**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
		await queryInterface.bulkDelete("OrderDetails", null, {});
	}
};
