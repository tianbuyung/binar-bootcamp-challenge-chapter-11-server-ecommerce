/* eslint-disable */
/* eslint-disable no-undef */
const CategoryController = require("./CategoryController");
const request = require("supertest");
const app = require("../app");
const Model = require("../models");
const { Category, Product } = Model;

// jest.setTimeout(10000);

describe("GET ALL CATEGORIES /categories", () => {
	test(`Return status 200 and list of categories`, (done) => {
		request(app)
			.get("/categories")
			.then((res) => {
				expect(res.statusCode).toBe(200);
				expect(res.body).toHaveProperty("categories");
				expect(res.body).toHaveProperty("message");
				done();
			});
	});
});

describe("GET CATEGORY BY ID /categories/:id", () => {
	test(`Return status 200 and json of categegory`, (done) => {
		request(app)
			.get("/categories/3")
			.then((res) => {
				expect(res.statusCode).toBe(200);
				expect(res.body).toHaveProperty("data");
				done();
			});
	});
	test(`Return status 400 and error if id not valid`, (done) => {
		request(app)
			.get("/categories/axa")
			.then((res) => {
				expect(res.statusCode).toBe(400);
				done();
			});
	});

	test(`Return status 400 and error if id not exist in database`, (done) => {
		request(app)
			.get("/categories/89")
			.then((res) => {
				expect(res.statusCode).toBe(404);
				expect(res.body).toHaveProperty("message");
				done();
			});
	});
});

// const mockRequest = (body) => ({ body });
const mockResponse = () => {
	const res = {};
	res.json = jest.fn().mockReturnValue(res);
	res.status = jest.fn().mockReturnValue(res);
	return res;
};
;
const mockRequest = (body = {}) => ({ body });
const options = {
	json: {},
};
const optionsReq = {
	body: {},
	cookies: {},
	query: {},
	params: {},
};

describe("getCategory Function", () => {
	const categories = [
		{
			id: 1,
			name: "Automotive",
			createdAt: "2022-09-19T12:16:50.545Z",
			updatedAt: "2022-09-19T12:16:50.545Z",
			deletedAt: null,
		},
	];
	let data = "";
	beforeAll(async () => {
		// give the mock function a value
		// for the promise to be resolved with
		data = await Category.findAll();
	});

	test("Category shown attributes", (done) => {
		const req = mockRequest(optionsReq);
		const res = mockResponse(options);
		CategoryController.getCategories(req, res).then((d) => {
			console.log("data[0]?.dataValues", data[0]?.dataValues);
			expect(data[0]?.dataValues).toHaveProperty("name");
			expect(data[0]?.dataValues).toHaveProperty("id");
			expect(data[0]?.dataValues).toHaveProperty("createdAt");
			expect(data[0]?.dataValues).toHaveProperty("deletedAt");
			done();
		});
		// const data = await CategoryController.getCategories(req, res);
		// console.log("data", data?.data);
		// expect(data).toHaveProperty([]);
		// expect(res.status).toHaveBeenCalledWith(200);
		// expect(res.json).toHaveBeenCalledTimes(1);
	});
});
