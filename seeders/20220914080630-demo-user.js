"use strict";

const { faker } = require("@faker-js/faker");
const hashPassword = require("../utils/hashPassword");

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
				name: faker.name.fullName(),
				email: faker.internet.email(),
				password: await hashPassword("binarecommerce"),
				createdAt: new Date(),
				updatedAt: new Date()
			};

			newData.push(seedData);
		}

		await queryInterface.bulkInsert("Users", newData, {});
	},

	async down(queryInterface, Sequelize) {
		/**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
		await queryInterface.bulkDelete("Users", null, {});
	}
};
