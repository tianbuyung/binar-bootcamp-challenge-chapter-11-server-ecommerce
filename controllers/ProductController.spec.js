/* eslint-disable */
/* eslint-disable no-undef */
const ProductController = require("./ProductController");
const Model = require("../models");
const { Product } = Model;
const request = require("supertest");
const app = require("../app");

describe("ProductController", () => {
	beforeAll(() => {
		Model.sequelize.query(`delete from "Products" where id = 21`);
	})

	test(`Product not found`, (done) => {
		request(app)
			.get("/product/21")
			.then((res) => {
				expect(res.statusCode).toBe(404);
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

	test(`get detail product but failed`, (done) => {
		request(app)
			.get("/product/1")
			.then((res) => {
				expect(res.statusCode).toBe(500);
				expect(res.body).toHaveProperty("message");
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

	test(`get popular product`, (done) => {
		request(app)
			.get("/product/popular")
			.then((res) => {
				expect(res.statusCode).toBe(200);
				expect(res.body).toHaveProperty("message");
				done();
			});
	});

	test(`get popular product but failed`, (done) => {
		request(app)
			.get("/product/popular")
			.then((res) => {
				expect(res.statusCode).toBe(500);
				expect(res.body).toHaveProperty("message");
				done();
			});
	});
});

describe("PRODUCT IN ADMIN PAGE /admin/get", () => {
	test(`unauthorized`, (done) => {
		request(app)
			.get("/admin/products")
			.then((res) => {
				expect(res.statusCode).toBe(401);
				done();
			});
	});

	test("get all products", (done) => {
		request(app)
		.get("/admin/products")
		.set({ 'Authorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkRvdWdsYXM2MEBob3RtYWlsLmNvbSIsImlhdCI6MTY2NzYxMzQ4M30.b3NPUiG9mfespp2tYtNG5pCitjH77XCs6JtyqHZsYvo" })
			.then((res) => {
				expect(res.statusCode).toBe(200);
				expect(res.body).toHaveProperty("message");
				expect(res.body).toHaveProperty("currentPage");
				expect(res.body).toHaveProperty("totalPages");
				expect(res.body).toHaveProperty("products");
				done();
			});
	});

	test("get all products but failed", (done) => {
		request(app)
		.get("/admin/products")
		.set({ 'Authorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkRvdWdsYXM2MEBob3RtYWlsLmNvbSIsImlhdCI6MTY2NzYxMzQ4M30.b3NPUiG9mfespp2tYtNG5pCitjH77XCs6JtyqHZsYvo" })
			.then((res) => {
				expect(res.statusCode).toBe(500);
				expect(res.body).toHaveProperty("message");
				done();
			});
	});

	test("get product detail", (done) => {
		request(app)
		.get("/admin/products/1")
		.set({ 'Authorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkRvdWdsYXM2MEBob3RtYWlsLmNvbSIsImlhdCI6MTY2NzYxMzQ4M30.b3NPUiG9mfespp2tYtNG5pCitjH77XCs6JtyqHZsYvo" })
			.then((res) => {
				expect(res.statusCode).toBe(200);
				expect(res.body).toHaveProperty("message");
				expect(res.body).toHaveProperty("product");
				done();
			});
	});

	test("get product detail but failed", (done) => {
		request(app)
		.get("/admin/products/1")
		.set({ 'Authorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkRvdWdsYXM2MEBob3RtYWlsLmNvbSIsImlhdCI6MTY2NzYxMzQ4M30.b3NPUiG9mfespp2tYtNG5pCitjH77XCs6JtyqHZsYvo" })
			.then((res) => {
				expect(res.statusCode).toBe(500);
				expect(res.body).toHaveProperty("message");
				done();
			});
	});

	// let data = "";
	// before(async () => {
	// 	data = await ProductController.getProduct();
	// });

	test("create product but failed", (done) => {
		request(app)
		.post("/admin/products")
			.set({ 'Authorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkRvdWdsYXM2MEBob3RtYWlsLmNvbSIsImlhdCI6MTY2NzYxMzQ4M30.b3NPUiG9mfespp2tYtNG5pCitjH77XCs6JtyqHZsYvo" })
			.send({
				"price": 3000,
				"name": "tambah barang",
				"CategoryId": 1,
				"imageUrl" : "",
			})
			.then((res) => {
				expect(res.statusCode).toBe(500);
				expect(res.body).toHaveProperty("message");
				done();
			});
	});

	test("create product", (done) => {
		request(app)
		.post("/admin/products")
			.set({ 'Authorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkRvdWdsYXM2MEBob3RtYWlsLmNvbSIsImlhdCI6MTY2NzYxMzQ4M30.b3NPUiG9mfespp2tYtNG5pCitjH77XCs6JtyqHZsYvo" })
			.send({
				"price": 3000,
				"name": "tambah barang",
				"CategoryId": 1,
				"imageUrl" : "",
			})
			.then((res) => {
				expect(res.statusCode).toBe(200);
				expect(res.body).toHaveProperty("message");
				expect(res.body).toHaveProperty("data");
				done();
			});
	});

	test("create product but its already exist", (done) => {
		request(app)
		.post("/admin/products")
			.set({ 'Authorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkRvdWdsYXM2MEBob3RtYWlsLmNvbSIsImlhdCI6MTY2NzYxMzQ4M30.b3NPUiG9mfespp2tYtNG5pCitjH77XCs6JtyqHZsYvo" })
			.send({
				"price": 3000,
				"name": "tambah barang",
				"CategoryId": 1,
				"imageUrl" : "",
			})
			.then((res) => {
				expect(res.statusCode).toBe(400);
				expect(res.body).toHaveProperty("message");
				done();
			});
	});

	test("delete product by id but failed", (done) => {
		request(app)
		.delete("/admin/products/21")
		.set({ 'Authorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkRvdWdsYXM2MEBob3RtYWlsLmNvbSIsImlhdCI6MTY2NzYxMzQ4M30.b3NPUiG9mfespp2tYtNG5pCitjH77XCs6JtyqHZsYvo" })
			.then((res) => {
				expect(res.statusCode).toBe(500);
				expect(res.body).toHaveProperty("message");
				done();
			});
	});

	test("delete product by id", (done) => {
		request(app)
		.delete("/admin/products/21")
		.set({ 'Authorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkRvdWdsYXM2MEBob3RtYWlsLmNvbSIsImlhdCI6MTY2NzYxMzQ4M30.b3NPUiG9mfespp2tYtNG5pCitjH77XCs6JtyqHZsYvo" })
			.then((res) => {
				expect(res.statusCode).toBe(200);
				expect(res.body).toHaveProperty("message");
				done();
			});
	});

	test("delete product by id but product is not exist", (done) => {
		request(app)
		.delete("/admin/products/50")
		.set({ 'Authorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkRvdWdsYXM2MEBob3RtYWlsLmNvbSIsImlhdCI6MTY2NzYxMzQ4M30.b3NPUiG9mfespp2tYtNG5pCitjH77XCs6JtyqHZsYvo" })
			.then((res) => {
				expect(res.statusCode).toBe(404);
				expect(res.body).toHaveProperty("message");
				done();
			});
	});

	test("edit product but failed", (done) => {
		request(app)
		.put("/admin/products/10")
			.set({ 'Authorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkRvdWdsYXM2MEBob3RtYWlsLmNvbSIsImlhdCI6MTY2NzYxMzQ4M30.b3NPUiG9mfespp2tYtNG5pCitjH77XCs6JtyqHZsYvo" })
			.send({
				"price": 3000,
				"name": "test ubah",
				"CategoryId": 2,
				"imageUrl" : "",
			})
			.then((res) => {
				expect(res.statusCode).toBe(500);
				expect(res.body).toHaveProperty("message");
				done();
			});
	});

	test("edit product", (done) => {
		request(app)
		.put("/admin/products/10")
			.set({ 'Authorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkRvdWdsYXM2MEBob3RtYWlsLmNvbSIsImlhdCI6MTY2NzYxMzQ4M30.b3NPUiG9mfespp2tYtNG5pCitjH77XCs6JtyqHZsYvo" })
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
});
