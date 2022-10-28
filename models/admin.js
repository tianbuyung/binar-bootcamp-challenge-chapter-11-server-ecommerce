"use strict";

const hashPassword = require("../utils/hashPassword");

const {
	Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Admin extends Model {
		/**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
		static associate(models) {
			// define association here
		}
	}
	Admin.init({
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				isAlpha: true,
				notNull: true,
				notEmpty: true,
				len: [3, 255]
			}
		},
		email: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
			validate: {
				isEmail: true,
				notNull: true,
				notEmpty: true
			}
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				isAlphanumeric: true,
				notNull: true,
				notEmpty: true,
				len: [6, 20]
			},
			set(value) {
				this.setDataValue("password", hashPassword(value));
			}
		}
	}, {
		sequelize,
		modelName: "Admin",
		paranoid: true
	});
	return Admin;
};