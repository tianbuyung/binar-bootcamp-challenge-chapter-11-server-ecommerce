"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Category extends Model {
		/**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
		static associate(models) {
			// define association here
			models.Category.hasMany(models.Product, {
				onDelete: "RESTRICT",
				onUpdate: "CASCADE",
			});
			// models.Category.belongsTo(models.Product)
		}
	}
	Category.init(
		{
			name: {
				type: DataTypes.STRING,
				unique: true,
				allowNull: false,
				validate: {
					notNull: true,
					notEmpty: true,
					len: [3, 255],
				},
			},
		},
		{
			sequelize,
			modelName: "Category",
			paranoid: true,
		}
	);
	return Category;
};
