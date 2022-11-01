// import supertest from "supertest";
// import App from "../../app";
const request = require("supertest");
const app = require("../app");

// const passport = require("passport");
// const UserController = require("../UserController");

//? pakai supertest
// describe("test UserController.getUserById", () => {
// 	test("tampil data user", async () => {
// 		await supertest(App).get('/users/').expect(404);
// 	});
// });

describe("coba pakai jest", () => {
	test("It should response the GET method", async () => {
		const response = await request(app).get("/");
		expect(response.statusCode).toBe(200);
     });
     
     test
});