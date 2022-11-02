// import supertest from "supertest";
// import App from "../../app";
const { mockReq, mockRes } = require("../utils/interceptor");
const request = require("supertest");
const app = require("../app");
	const { Sequelize } = require("sequelize");
	require("dotenv").config();

// const passport = require("passport");
const UserController = require("../UserController");

//? pakai supertest
// describe("test UserController.getUserById", () => {
// 	test("tampil data user", async () => {
// 		await supertest(App).get('/users/').expect(404);
// 	});
// });


describe("coba pakai jest", () => {
	beforeAll(async () => {

		const sequelize = new Sequelize(
		process.env.DB_DEV,
		process.env.DB_USERNAME_DEV,
		null,
		{
			host: "localhost",
			dialect: "mysql" /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */,
		}
	);
	const testConnection = async () => {
		try {
			await sequelize.authenticate();
			console.log("Connection has been established successfully.");
		} catch (error) {
			console.error("Unable to connect to the database:", error);
		}
	};

	testConnection();
	});
	
	test("It should response the GET method", async () => {
		const response = await request(app).get("/");
		expect(response.statusCode).toBe(200);
	});

	test("with mock request and mock response", async () => {
		let req = mockReq();
		req.body.email = "capricondaniel@gmail.com";
		req.body.password = "danieltan";
		const res = mockRes();

		await UserController.login(req, res);

		expect(req.send).toHaveBeenCalledTimes(1);
		expect(req.status).toBeGreaterThanOrEqual(200);
	});
});
