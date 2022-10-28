"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class OrderDetail extends Model {
		/**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
		static associate(models) {
			// define association here
			models.OrderDetail.belongsTo(models.Order);
			models.OrderDetail.belongsTo(models.Product);
		}
	}
	OrderDetail.init({
		OrderId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				isInt: true,
				notNull: true,
				notEmpty: true
			}
		},
		ProductId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				isInt: true,
				notNull: true,
				notEmpty: true
			}
		},
		qty: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				isInt: true,
				notNull: true,
				notEmpty: true
			}
		},
		price: {
			type: DataTypes.NUMERIC,
			allowNull: false,
			validate: {
				isDecimal: true,
				notNull: true,
				notEmpty: true
			}
		},
		totalOrderDetail: {
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
		modelName: "OrderDetail",
		indexes: [{ unique: true, fields: ["orderId", "productId"] }]
	});
	return OrderDetail;
};