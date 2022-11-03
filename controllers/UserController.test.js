const request = require("supertest");
const app = require("../app");
const { Sequelize } = require("sequelize");
require("dotenv").config();
const UserController = require("../controllers/UserController");

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
	
describe("Test User Controllers", () => {

	test("create user", (done) => {
		request(app)
			.post("/users")
			.send({
				"nama": "danieltan",
				"email": "capricondaniel@gmail.com",
				"password" : "danieltan",
			})
		.then((res) => {
			expect(res.statusCode).toBe(200);
			expect(res.body).toHaveProperty("message");
			done();
		});
	});

	test("create user but email already exist", (done) => {
		request(app)
			.post("/users")
			.send({
				"nama": "danieltan",
				"email": "capricondaniel@gmail.com",
				"password" : "danieltan",
			})
		.then((res) => {
			expect(res.statusCode).toBe(409);
			expect(res.body).toHaveProperty("message");
			done();
		});
	});
	
	test("login user", (done) => {
		request(app)
			.post("/users/login")
			.send({
				"email": "capricondaniel@gmail.com",
				"password": "danieltan",
			})
			.then((res) => {
				expect(res.statusCode).toBe(200);
				expect(res.body).toHaveProperty("message");
				expect(res.body).toHaveProperty("token");
				done();
			});
	});

	test("login user but wrong password", (done) => {
		request(app)
			.post("/users/login")
			.send({
				"email": "capricondaniel@gmail.com",
				"password": "danieltan123",
			})
			.then((res) => {
				expect(res.statusCode).toBe(401);
				expect(res.body).toHaveProperty("message");
				done();
			});
	});

	test("login user but wrong email", (done) => {
		request(app)
			.post("/users/login")
			.send({
				"email": "capricondaniel@gmail.com123",
				"password": "danieltan123",
			})
			.then((res) => {
				expect(res.statusCode).toBe(401);
				expect(res.body).toHaveProperty("message");
				done();
			});
	});

	test("verify user but failed", (done) => {
		request(app)
			.get("/users/verify")
			.set({
				"Authorization": "capricondaniel@gmail.com",
			})
			.then((res) => {
				expect(res.statusCode).toBe(403);
				expect(res.body).toHaveProperty("message");
				done();
			});
	});

	test("verify user", (done) => {
		request(app)
			.get("/users/verify")
			.set({
				"Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ikhhc3NpZV9CcmFrdXNAZ21haWwuY29tIiwiaWF0IjoxNjY3NDg2MTk3LCJleHAiOjE2Njc0ODk3OTd9.szY-9Pl0t5cMhxE6JrYyM5qKtXIKRHMz7HCh_9rOYfc",
			})
			.then((res) => {
				expect(res.statusCode).toBe(200);
				expect(res.body).toHaveProperty("message");
				done();
			});
	});

	test("get user badge but failed", (done) => {
		request(app)
			.get("/users/badge")
			.set({
				"Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ikhhc3NpZV9CcmFrdXNAZ21haWwuY29tIiwiaWF0IjoxNjY3NDg2MTk3LCJleHAiOjE2Njc0ODk3OTd9.szY-9Pl0t5cMhxE6JrYyM5qKtXIKRHMz7HCh_9rOYfc",
			})
			.then((res) => {
				expect(res.statusCode).toBe(500);
				expect(res.body).toHaveProperty("message");
				done();
			});
	});

	test("get user badge", (done) => {
		request(app)
			.get("/users/badge")
			.set({
				"Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ikhhc3NpZV9CcmFrdXNAZ21haWwuY29tIiwiaWF0IjoxNjY3NDg2MTk3LCJleHAiOjE2Njc0ODk3OTd9.szY-9Pl0t5cMhxE6JrYyM5qKtXIKRHMz7HCh_9rOYfc",
			})
			.then((res) => {
				expect(res.statusCode).toBe(200);
				expect(res.body).toHaveProperty("message");
				expect(res.body).toHaveProperty("results");
				expect(res.body).toHaveProperty("badge");
				done();
			});
	});

	test("edit user", (done) => {
		request(app)
			.put("/users/edit")
			.set({"Authorization" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ikhhc3NpZV9CcmFrdXNAZ21haWwuY29tIiwiaWF0IjoxNjY3NDg2MTk3LCJleHAiOjE2Njc0ODk3OTd9.szY-9Pl0t5cMhxE6JrYyM5qKtXIKRHMz7HCh_9rOYfc"})
			.send({
				"name": "daniel",
				"address": "jl merdeka",
				"phoneNumber": "08132132130",
				"twitter": "",
				"instagram": "",
				"facebook": "",
			})
			.then((res) => {
				expect(res.statusCode).toBe(200);
				expect(res.body).toHaveProperty("message");
				done();
			});
	});

	test("edit user but user not found", (done) => {
		request(app)
			.put("/users/edit")
			.set({"Authorization" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkRvbm5lbGxfQm9yZXJAZ21haWwuY29tIiwiaWF0IjoxNjY3NDcyNDAwLCJleHAiOjE2Njc0NzYwMDB9.Ws1IyPHOkjfCSTDVzhcynvxnwcvDlmm0Uze2IoO3_Zw"})
			.then((res) => {
				expect(res.statusCode).toBe(404);
				expect(res.body).toHaveProperty("message");
				done();
			});
	});

	test("get detail user", (done) => {
		request(app)
			.get("/users")
			.set({
				"Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ikhhc3NpZV9CcmFrdXNAZ21haWwuY29tIiwiaWF0IjoxNjY3NDg2MTk3LCJleHAiOjE2Njc0ODk3OTd9.szY-9Pl0t5cMhxE6JrYyM5qKtXIKRHMz7HCh_9rOYfc",
			})
			.then((res) => {
				expect(res.statusCode).toBe(200);
				expect(res.body).toHaveProperty("message");
				expect(res.body).toHaveProperty("user");
				done();
			});
	});
});
