"use strict";
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Orders", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			CartId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "Carts"
				},
				onDelete: "RESTRICT",
				onUpdate: "CASCADE"
			},
			totalOrder: {
				type: Sequelize.NUMERIC
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Orders");
	}
};