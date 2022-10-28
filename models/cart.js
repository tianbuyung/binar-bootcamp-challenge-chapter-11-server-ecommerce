"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Cart extends Model {
		/**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
		static associate(models) {
			// define association here
			models.Cart.belongsTo(models.User);
			models.Cart.hasMany(models.CartDetail, {
				onDelete: "CASCADE",
				onUpdate: "CASCADE"
			});
			models.Cart.hasOne(models.Order, {
				onDelete: "RESTRICT",
				onUpdate: "CASCADE"
			});
		}
	}
	Cart.init({
		UserId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				isInt: true,
				notNull: true,
				notEmpty: true
			}
		},
		isBought: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
			allowNull: false,
			validate: {
				notNull: true,
				notEmpty: true
			}
		}
	}, {
		sequelize,
		modelName: "Cart",
	});
	return Cart;
};
