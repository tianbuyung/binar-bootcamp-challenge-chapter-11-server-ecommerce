/* eslint-disable */
/* eslint-disable no-undef */
const AdminController = require("./AdminController");
const request = require("supertest");
const app = require("../app");
const Model = require("../models");
const { Admin } = Model;

describe("POST /admin", () => {
  test(`Return status 200 and login get token`, (done) => {
    request(app)
      .post("/admin")
      .send({ email: "Keven_West99@yahoo.com", password: "binarecommerce" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("message");
        expect(res.body).toHaveProperty("token");
        done();
      });
  });
});
