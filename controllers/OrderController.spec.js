/* eslint-disable */

const request = require("supertest");
const app = require("../app");
const jwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ik1heGltZTk2QHlhaG9vLmNvbSIsImlhdCI6MTY2NzU0Nzk2OCwiZXhwIjoxNjY3NTUxNTY4fQ.fbGL9F8S-OTK-QeXrYSZieF9vFM8ojG7mMUJBD8B61U";

describe("CREATE ORDER /orders", () => {
    test("Return status 200 and order", (done) => {
        request(app)
            .post("/orders")
            .send({ "totalOrder": 1000 })
            .set({ Authorization: jwtToken, Accept: "application/json" })
            .expect("Content-Type", /json/)
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.body).toHaveProperty("message");
                expect(res.body).toHaveProperty("data");
                done();
            });
    });

    test("Return status 400 and error", (done) => {
        request(app)
            .post("/orders")
            .send({ "totalOrder": 1000 })
            .set({ Authorization: "otherUser", Accept: "application/json" })
            .expect("Content-Type", /json/)
            .then((res) => {
                expect(res.statusCode).toBe(400);
                expect(res.body).toHaveProperty("message");
                done();
            });
    });
});

describe("UPDATE ORDER STATUS /orders", () => {
    test("Return status 200 and message", (done) => {
        request(app)
            .put("/orders/1")
            .send({ "status": "done" })
            .set({ Authorization: jwtToken, Accept: "application/json" })
            .expect("Content-Type", /json/)
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.body).toHaveProperty("message");
                done();
            });
    });

    test("Return status 400 and error status", (done) => {
        request(app)
            .put("/orders/1")
            .send({ "status": "xxx" })
            .set({ Authorization: "otherUser", Accept: "application/json" })
            .expect("Content-Type", /json/)
            .then((res) => {
                expect(res.statusCode).toBe(400);
                expect(res.body).toHaveProperty("message");
                done();
            });
    });

    test("Return status 404 and error status", (done) => {
        request(app)
            .put("/orders/99")
            .send({ "status": "done" })
            .set({ Authorization: "otherUser", Accept: "application/json" })
            .expect("Content-Type", /json/)
            .then((res) => {
                expect(res.statusCode).toBe(404);
                expect(res.body).toHaveProperty("message");
                done();
            });
    });
});

describe("GET ALL ORDERS /orders", () => {
    test(`Return status 200 and list of orders`, (done) => {
        request(app)
            .get("/orders")
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.body).toHaveProperty("message");
                expect(res.body).toHaveProperty("data");
                done();
            });
    });
});

describe("GET ALL ORDER /orders", () => {
    test(`Return status 200 and list of orders`, (done) => {
        request(app)
            .get("/orders/1")
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.body).toHaveProperty("message");
                expect(res.body).toHaveProperty("data");
                done();
            });
    });
});