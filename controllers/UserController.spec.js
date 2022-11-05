/* eslint-disable */
/* eslint-disable no-undef */

const request = require("supertest");
const app = require("../app");
const { Sequelize, where } = require("sequelize");
const Model = require("../models");
const { User } = Model;
const UserController = require("./UserController");

describe("Test User Controllers", () => {
	beforeAll(async () => {
		await User.destroy({
			where: {
				email: "capricondaniel@gmail.com",
			}
		});
	});

	test("create user but failed", (done) => {
		request(app)
			.post("/users")
			.send({
				"nama": "danieltan",
				"email": "capricondaniel@gmail.com",
				"password" : "danieltan",
			})
		.then((res) => {
			expect(res.statusCode).toBe(500);
			expect(res.body).toHaveProperty("message");
			done();
		});
	});

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

	test("login user but failed", (done) => {
		request(app)
			.post("/users/login")
			.send({
				"email": "capricondaniel@gmail.com",
				"password": "danieltan",
			})
			.then((res) => {
				expect(res.statusCode).toBe(500);
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

	test("user is unverified", (done) => {
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
				"Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlJvbGFuZG8uSGFydmV5NDZAeWFob28uY29tIiwiaWF0IjoxNjY3NjEzNzg0fQ.ObYv4csMLO414fJAPPB-rNx7EsoWutIBKXSwxA_vgrc",
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
				"Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlJvbGFuZG8uSGFydmV5NDZAeWFob28uY29tIiwiaWF0IjoxNjY3NjEzNzg0fQ.ObYv4csMLO414fJAPPB-rNx7EsoWutIBKXSwxA_vgrc",
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
				"Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlJvbGFuZG8uSGFydmV5NDZAeWFob28uY29tIiwiaWF0IjoxNjY3NjEzNzg0fQ.ObYv4csMLO414fJAPPB-rNx7EsoWutIBKXSwxA_vgrc",
			})
			.then((res) => {
				expect(res.statusCode).toBe(200);
				expect(res.body).toHaveProperty("message");
				expect(res.body).toHaveProperty("results");
				expect(res.body).toHaveProperty("badge");
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

	test("edit user but failed", (done) => {
		request(app)
			.put("/users/edit")
			.set({"Authorization" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlJvbGFuZG8uSGFydmV5NDZAeWFob28uY29tIiwiaWF0IjoxNjY3NjEzNzg0fQ.ObYv4csMLO414fJAPPB-rNx7EsoWutIBKXSwxA_vgrc"})
			.send({
				"name": "daniel",
				"address": "jl merdeka",
				"phoneNumber": "08132132130",
				"twitter": "",
				"instagram": "",
				"facebook": "",
			})
			.then((res) => {
				expect(res.statusCode).toBe(500);
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

	test("edit user", (done) => {
		request(app)
			.put("/users/edit")
			.set({"Authorization" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlJvbGFuZG8uSGFydmV5NDZAeWFob28uY29tIiwiaWF0IjoxNjY3NjEzNzg0fQ.ObYv4csMLO414fJAPPB-rNx7EsoWutIBKXSwxA_vgrc"})
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

	test("get detail user but failed", (done) => {
		request(app)
			.get("/users")
			.set({
				"Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlJvbGFuZG8uSGFydmV5NDZAeWFob28uY29tIiwiaWF0IjoxNjY3NjEzNzg0fQ.ObYv4csMLO414fJAPPB-rNx7EsoWutIBKXSwxA_vgrc",
			})
			.then((res) => {
				expect(res.statusCode).toBe(200);
				expect(res.body).toHaveProperty("message");
				expect(res.body).toHaveProperty("user");
				done();
			});
	});

	test("get detail user", (done) => {
		request(app)
			.get("/users")
			.set({
				"Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlJvbGFuZG8uSGFydmV5NDZAeWFob28uY29tIiwiaWF0IjoxNjY3NjEzNzg0fQ.ObYv4csMLO414fJAPPB-rNx7EsoWutIBKXSwxA_vgrc",
			})
			.then((res) => {
				expect(res.statusCode).toBe(200);
				expect(res.body).toHaveProperty("message");
				expect(res.body).toHaveProperty("user");
				done();
			});
	});
});
