"use strict";
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("CartDetails", {
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
				onDelete: "CASCADE",
				onUpdate: "CASCADE"
			},
			ProductId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "Products"
				},
				onDelete: "RESTRICT",
				onUpdate: "CASCADE"
			},
			qty: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		}, {
			indexes: [{ unique: true, fields: ["cartId", "productId"] }]
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("CartDetails");
	}
};