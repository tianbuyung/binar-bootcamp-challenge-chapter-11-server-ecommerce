/* eslint-disable */

const request = require("supertest");
const app = require("../app");
const jwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ik1heGltZTk2QHlhaG9vLmNvbSIsImlhdCI6MTY2NzU0Nzk2OCwiZXhwIjoxNjY3NTUxNTY4fQ.fbGL9F8S-OTK-QeXrYSZieF9vFM8ojG7mMUJBD8B61U";

describe("CREATE CART DETAIL /cartDetails", () => {
    test("Return status 200 and cart details", (done) => {
        request(app)
            .post("/cartDetails")
            .send({ "ProductId": 1, "qty": 1, "isIncrement": false })
            .set({ Authorization: jwtToken, Accept: "application/json" })
            .expect("Content-Type", /json/)
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.body).toHaveProperty("message");
                done();
            });
    });
    test("Return status 200 and cart details if it is qty increment", (done) => {
        request(app)
            .post("/cartDetails")
            .send({ "ProductId": 1, "qty": 1, "isIncrement": true })
            .set({ Authorization: jwtToken, Accept: "application/json" })
            .expect("Content-Type", /json/)
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.body).toHaveProperty("message");
                done();
            });
    });
});

describe("DELETE CART DETAIL /cartDetails", () => {
    test("Return status 200 and message", (done) => {
        request(app)
            .delete("/cartDetails/6")
            .set({ Authorization: jwtToken, Accept: "application/json" })
            .expect("Content-Type", /json/)
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.body).toHaveProperty("message");
                done();
            });
    });
    test("Return status 404 and message if cart details not found", (done) => {
        request(app)
            .delete("/cartDetails/6")
            .set({ Authorization: jwtToken, Accept: "application/json" })
            .expect("Content-Type", /json/)
            .then((res) => {
                expect(res.statusCode).toBe(404);
                expect(res.body).toHaveProperty("message");
                done();
            });
    });
    test("Return status 404 and message", (done) => {
        request(app)
            .delete("/cartDetails/1")
            .set({ Authorization: jwtToken, Accept: "application/json" })
            .expect("Content-Type", /json/)
            .then((res) => {
                expect(res.statusCode).toBe(404);
                expect(res.body).toHaveProperty("message");
                done();
            });
    });
});