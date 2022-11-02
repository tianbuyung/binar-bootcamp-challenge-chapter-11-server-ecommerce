/* eslint-disable */
/* eslint-disable no-undef */
const ProductController = require("./ProductController");
const request = require("supertest");
const app = require("../app");
const Model = require("../models");
const { Product, Category } = Model;

describe("GET DETAIL PRODUCT /product/id", () => {
	test(`Product not found`, (done) => {
		request(app)
			.get("/product/100")
			.then((res) => {
				expect(res.statusCode).toBe(400);
				expect(res.body).toHaveProperty("message");
				// expect(res.body).toHaveProperty("product");
				done();
			});
     });
     
     test(`get detail product`, (done) => {
		request(app)
			.get("/product/1")
			.then((res) => {
				console.log("🚀 ~ file: ProductController.spec.js ~ line 14 ~ .then ~ res", res.body)
				expect(res.statusCode).toBe(200);
				expect(res.body).toHaveProperty("message");
				expect(res.body).toHaveProperty("product");
				done();
			});
	});
});