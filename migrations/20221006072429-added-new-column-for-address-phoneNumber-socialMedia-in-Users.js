"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		/**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
		await queryInterface.addColumn("Users", "address", {
			type: Sequelize.DataTypes.STRING,
		});
		await queryInterface.addColumn("Users", "phoneNumber", {
			type: Sequelize.DataTypes.STRING,
		});
		await queryInterface.addColumn("Users", "twitter", {
			type: Sequelize.DataTypes.STRING,
		});
		await queryInterface.addColumn("Users", "instagram", {
			type: Sequelize.DataTypes.STRING,
		});
		await queryInterface.addColumn("Users", "facebook", {
			type: Sequelize.DataTypes.STRING,
		});
	},

	async down(queryInterface, Sequelize) {
		/**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
		await queryInterface.removeColumn("Users", "address");
		await queryInterface.removeColumn("Users", "phoneNumber");
		await queryInterface.removeColumn("Users", "twitter");
		await queryInterface.removeColumn("Users", "instagram");
		await queryInterface.removeColumn("Users", "facebook");
	},
};
