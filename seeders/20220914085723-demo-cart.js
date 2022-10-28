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

		for (let i = 0; i < 5; i++) {
			const seedData = {
				UserId: Math.floor(Math.random() * 20) + 1,
				isBought: Math.floor(Math.random() * 1) ? true : false,
				createdAt: new Date(),
				updatedAt: new Date()
			};

			newData.push(seedData);
		}

		await queryInterface.bulkInsert("Carts", newData, {});
	},

	async down(queryInterface, Sequelize) {
		/**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
		await queryInterface.bulkDelete("Carts", null, {});
	}
};
