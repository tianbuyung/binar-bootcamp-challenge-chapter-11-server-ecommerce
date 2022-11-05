const request = require("supertest");
const app = require("../app");

const email = "Keven_West99@yahoo.com";
const password = "binarecommerce";
const jwtToken =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IktldmVuX1dlc3Q5OUB5YWhvby5jb20iLCJpYXQiOjE2Njc0ODU2NDcsImV4cCI6MTY2NzQ4OTI0N30.EiaOANiC6Aknr6vRsY5X_4ekAWZkuGS3f1rZUSbABX8";

describe("POST /admin", () => {
	test("Return status 200 and login get token", (done) => {
		request(app)
			.post("/admin")
			.send({ email, password })
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.then((res) => {
				expect(res.statusCode).toBe(200);
				expect(res.body).toHaveProperty("message");
				expect(res.body).toHaveProperty("token");
				done();
			});
	});
	test("Return status 401 and email is wrong", (done) => {
		request(app)
			.post("/admin")
			.send({ email: "wrongEmail", password })
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.then((res) => {
				expect(res.statusCode).toBe(401);
				expect(res.body).toHaveProperty("message", "Wrong email or password");
				done();
			});
	});
	test("Return status 401 and password is wrong", (done) => {
		request(app)
			.post("/admin")
			.send({ email, password: "wrongPassword" })
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.then((res) => {
				expect(res.statusCode).toBe(401);
				expect(res.body).toHaveProperty("message", "Wrong email or password");
				done();
			});
	});
	test("Return status 500 and error", (done) => {
		request(app)
			.post("/admin")
			.send({})
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.then((res) => {
				expect(res.statusCode).toBe(500);
				expect(res.body).toHaveProperty("message");
				done();
			});
	});
});

describe("GET /verify", () => {
	test("Return status 200 and authorized", (done) => {
		request(app)
			.get("/admin/verify")
			.set({ Authorization: jwtToken, Accept: "application/json" })
			.expect("Content-Type", /json/)
			.then((res) => {
				expect(res.statusCode).toBe(200);
				expect(res.body).toHaveProperty("message");
				done();
			});
	});
	test("Return status 403 and unauthorized", (done) => {
		request(app)
			.get("/admin/verify")
			.set({ Authorization: "wrongToken", Accept: "application/json" })
			.expect("Content-Type", /json/)
			.then((res) => {
				expect(res.statusCode).toBe(403);
				expect(res.body).toHaveProperty("message");
				done();
			});
	});
});
