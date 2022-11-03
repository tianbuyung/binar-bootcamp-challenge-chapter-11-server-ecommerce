
const request = require("supertest");
const app = require("../app");
const { Sequelize } = require("sequelize");
require("dotenv").config();
const UserController = require("../controllers/UserController");

//? pakai supertest
// describe("test UserController.getUserById", () => {
// 	test("tampil data user", async () => {
// 		await supertest(App).get('/users/').expect(404);
// 	});
// });


const mockReq = () => {
	const req = {};
	req.body = jest.fn().mockReturnValue(req);
	req.params = jest.fn().mockReturnValue(req);
	return req;
}

const mockRes = () => {
	const res = {};
	res.send = jest.fn().mockReturnValue(res);
	res.status = jest.fn().mockReturnValue(res);
	res.json = jest.fn().mockReturnValue(res);
	return res;
}
	
describe("coba pakai jest", () => {
	beforeAll(async () => {

		const sequelize = new Sequelize(
		process.env.DB_DEV,
		process.env.DB_USERNAME_DEV,
		null,
		{
			host: "localhost",
			dialect: "postgres" /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */,
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

	test("login user", async (done) => {
		let req = mockReq();
		req.body.email = "capricondaniel@gmail.com";
		req.body.password = "danieltan";
		const res = mockRes();

		await UserController.login(req, res);
		
		expect(req.send).toHaveBeenCalledTimes(1);
		expect(req.status).toBeGreaterThanOrEqual(200);
		done();
	});
	
	test("get detail user", async () => {
		let req = mockReq();
		req.authotization = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNhcHJpY29uZGFuaWVsQGdtYWlsLmNvbSIsImlhdCI6MTY2NzM4MTkyOSwiZXhwIjoxNjY3Mzg1NTI5fQ.y2QMTaYuDkAU2ZrcpbwfGMu0qDr4y7fwArerIgoxrZE";
		let res = mockRes();
		const response = await UserController.getUserById(req, res);
		expect(response.statusCode).toBe(200);
	})
});
