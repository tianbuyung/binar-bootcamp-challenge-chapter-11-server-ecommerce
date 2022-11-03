/* eslint-disable */
/* eslint-disable no-undef */
const request = require("supertest");
const app = require("../app");

describe("GET DETAIL PRODUCT /product/id", () => {
	test(`Product not found`, (done) => {
		request(app)
			.get("/product/100")
			.then((res) => {
				expect(res.statusCode).toBe(400);
				expect(res.body).toHaveProperty("message");
				done();
			});
     });
     
     test(`get detail product`, (done) => {
		request(app)
			.get("/product/1")
			.then((res) => {
				expect(res.statusCode).toBe(200);
				expect(res.body).toHaveProperty("message");
				expect(res.body).toHaveProperty("product");
				done();
			});
	});

	test(`id detail product is string`, (done) => {
		request(app)
			.get("/product/'1'")
			.then((res) => {
				expect(res.statusCode).toBe(400);
				expect(res.body).toHaveProperty("message");
				done();
			});
	});
});

describe("PRODUCT IN ADMIN PAGE /admin/get", () => {
	test(`unauthorized`, (done) => {
		request(app)
			.get("/admin")
			.then((res) => {
				expect(res.statusCode).toBe(401);
				done();
			});
	});

	test("get all products", (done) => {
		request(app)
		.get("/admin/products")
		.set({ 'Authorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkRvdWdsYXM2MEBob3RtYWlsLmNvbSIsImlhdCI6MTY2NzQ1NTQyNCwiZXhwIjoxNjY3NDU5MDI0fQ.IRU3bCUEfsYSPGwhUBpKI0IFQfQoWqI6p6JrlMXU-xU" })
			.then((res) => {
				expect(res.statusCode).toBe(200);
				expect(res.body).toHaveProperty("message");
				expect(res.body).toHaveProperty("currentPage");
				expect(res.body).toHaveProperty("totalPages");
				expect(res.body).toHaveProperty("products");
				done();
			});
	});

	test("get product detail", (done) => {
		request(app)
		.get("/admin/products/1")
		.set({ 'Authorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkRvdWdsYXM2MEBob3RtYWlsLmNvbSIsImlhdCI6MTY2NzQ1NTQyNCwiZXhwIjoxNjY3NDU5MDI0fQ.IRU3bCUEfsYSPGwhUBpKI0IFQfQoWqI6p6JrlMXU-xU" })
			.then((res) => {
				expect(res.statusCode).toBe(200);
				expect(res.body).toHaveProperty("message");
				expect(res.body).toHaveProperty("products");
				done();
			});
	});

	test("delete product by id", (done) => {
		request(app)
		.delete("/admin/products/21")
		.set({ 'Authorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkRvdWdsYXM2MEBob3RtYWlsLmNvbSIsImlhdCI6MTY2NzQ1NTQyNCwiZXhwIjoxNjY3NDU5MDI0fQ.IRU3bCUEfsYSPGwhUBpKI0IFQfQoWqI6p6JrlMXU-xU" })
			.then((res) => {
				expect(res.statusCode).toBe(200);
				expect(res.body).toHaveProperty("message");
				done();
			});
	});

	test("edit product", (done) => {
		request(app)
		.put("/admin/products/10")
			.set({ 'Authorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkRvdWdsYXM2MEBob3RtYWlsLmNvbSIsImlhdCI6MTY2NzQ1NTQyNCwiZXhwIjoxNjY3NDU5MDI0fQ.IRU3bCUEfsYSPGwhUBpKI0IFQfQoWqI6p6JrlMXU-xU" })
			.send({
				"price": 3000,
				"name": "test ubah",
				"CategoryId": 2,
				"imageUrl" : "",
			})
			.then((res) => {
				expect(res.statusCode).toBe(200);
				expect(res.body).toHaveProperty("message");
				done();
			});
	});

	test("create product", (done) => {
		request(app)
		.post("/admin/products")
			.set({ 'Authorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkRvdWdsYXM2MEBob3RtYWlsLmNvbSIsImlhdCI6MTY2NzQ1NTQyNCwiZXhwIjoxNjY3NDU5MDI0fQ.IRU3bCUEfsYSPGwhUBpKI0IFQfQoWqI6p6JrlMXU-xU" })
			.send({
				"price": 3000,
				"name": "test tambah",
				"CategoryId": 2,
				"imageUrl" : "",
			})
			.then((res) => {
				expect(res.statusCode).toBe(200);
				expect(res.body).toHaveProperty("message");
				expect(res.body).toHaveProperty("data");
				done();
			});
	});
});
