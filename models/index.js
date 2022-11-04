"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || "development";
// const config = require(__dirname + "/../config/config.js")[env];
const db = {};

// let sequelize;
// if (config.use_env_variable) {
// 	sequelize = new Sequelize(
// 		"postgres://gaxgayvkhhceks:b225b01699e5854f77692b59f73e05ce34613d91784dd5337ed6f5cd24074583@ec2-54-163-34-107.compute-1.amazonaws.com:5432/ddmtgvv0s2v3ob"
// 	);
// } else {
// 	sequelize = new Sequelize(
// 		"postgres://gaxgayvkhhceks:b225b01699e5854f77692b59f73e05ce34613d91784dd5337ed6f5cd24074583@ec2-54-163-34-107.compute-1.amazonaws.com:5432/ddmtgvv0s2v3ob"
// 	);
// }
// Option 2: Passing parameters separately (sqlite)
const sequelize = new Sequelize(
	"ddmtgvv0s2v3ob",
	"gaxgayvkhhceks",
	"b225b01699e5854f77692b59f73e05ce34613d91784dd5337ed6f5cd24074583",
	{
		dialect: "postgres",
		port: "5432",
		host: "ec2-54-163-34-107.compute-1.amazonaws.com",
	}
);


fs.readdirSync(__dirname)
	.filter((file) => {
		return (
			file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
		);
	})
	.forEach((file) => {
		const model = require(path.join(__dirname, file))(
			sequelize,
			Sequelize.DataTypes
		);
		db[model.name] = model;
	});

Object.keys(db).forEach((modelName) => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
