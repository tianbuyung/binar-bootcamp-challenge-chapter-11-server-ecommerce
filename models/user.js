"use strict";

const hashPassword = require("../utils/hashPassword");

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
		static associate(models) {
			// define association here
			models.User.hasMany(models.Cart, {
				onDelete: "RESTRICT",
				onUpdate: "CASCADE",
			});
		}
	}
	User.init(
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					// isAlpha: true,
					notNull: true,
					notEmpty: true,
					len: [3, 255],
				},
			},
			email: {
				type: DataTypes.STRING,
				unique: true,
				allowNull: false,
				validate: {
					isEmail: true,
					notNull: true,
					notEmpty: true,
				},
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					// isAlphanumeric: false,
					notNull: true,
					notEmpty: true,
					len: [6, 60],
				},
				set(value) {
					this.setDataValue("password", hashPassword(value));
				},
			},
			address: {
				type: DataTypes.STRING,
			},
			phoneNumber: {
				type: DataTypes.STRING,
				validate: {
					len: [10, 13],
				},
			},
			twitter: {
				type: DataTypes.STRING,
			},
			instagram: {
				type: DataTypes.STRING,
			},
			facebook: {
				type: DataTypes.STRING,
			},
		},
		{
			sequelize,
			modelName: "User",
			paranoid: true,
		}
	);
	return User;
};
