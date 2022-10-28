"use strict";
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("OrderDetails", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			OrderId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "Orders"
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
			price: {
				type: Sequelize.NUMERIC,
				allowNull: false
			},
			totalOrderDetail: {
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
		}, {
			indexes: [{ unique: true, fields: ["orderId", "productId"] }]
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("OrderDetails");
	}
};