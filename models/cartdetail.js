"use strict";
const {
	Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class CartDetail extends Model {
		/**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
		static associate(models) {
			// define association here
			models.CartDetail.belongsTo(models.Cart);
			models.CartDetail.belongsTo(models.Product);
		}
	}
	CartDetail.init({
		CartId: {
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
		}
	}, {
		sequelize,
		modelName: "CartDetail",
		indexes: [{ unique: true, fields: ["cartId", "productId"] }]
	});
	return CartDetail;
};