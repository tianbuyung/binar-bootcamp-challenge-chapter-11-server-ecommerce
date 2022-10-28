"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Order extends Model {
		/**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
		static associate(models) {
			// define association here
			models.Order.belongsTo(models.Cart);
			models.Order.hasMany(models.OrderDetail, {
				onDelete: "CASCADE",
				onUpdate: "CASCADE"
			});
		}
	}
	Order.init({
		CartId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				isInt: true,
				notNull: true,
				notEmpty: true
			}
		},
		status: {
			type: DataTypes.ENUM("waiting payment", "done", "cancelled"),
			defaultValue: "waiting payment"
		},
		totalOrder: {
			type: DataTypes.NUMERIC,
			allowNull: false,
			validate: {
				isDecimal: true,
				notNull: true,
				notEmpty: true
			}
		}
	}, {
		sequelize,
		modelName: "Order",
	});
	return Order;
};
