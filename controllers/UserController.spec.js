/* eslint-disable */
const request = require("supertest");
const app = require("../app");

describe("GET ALL CATEGORIES /categories", () => {
	test(`Return status 200 and list of categories`, (done) => {
		request(app)
			.get("/users/badge")
			.set(
				"Authorization",
				"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFrdXJuaWFAYmluYXJhY2FkZW15Lm9yZyIsImlhdCI6MTY2NzM5ODgxMywiZXhwIjoxNjY3NDAyNDEzfQ.HhJxwFxHqABDuSVUWnRx7uCLzg7nkL9t9cCD5h3gd2M"
			)
			.then((res) => {
				expect(res.statusCode).toBe(200);
				done();
			});
	});
});
