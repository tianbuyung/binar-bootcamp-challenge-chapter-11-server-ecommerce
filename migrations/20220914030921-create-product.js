"use strict";
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Products", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			name: {
				type: Sequelize.STRING,
				unique: true,
				allowNull: false
			},
			price: {
				type: Sequelize.DECIMAL,
				allowNull: false
			},
			CategoryId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "Categories"
				},
				onDelete: "RESTRICT",
				onUpdate: "CASCADE"
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			deletedAt: {
				type: Sequelize.DATE
			}
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Products");
	}
};