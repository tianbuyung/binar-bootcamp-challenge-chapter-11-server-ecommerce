/* eslint-disable */

const request = require("supertest");
const app = require("../app");
const jwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ik1heGltZTk2QHlhaG9vLmNvbSIsImlhdCI6MTY2NzU0Nzk2OCwiZXhwIjoxNjY3NTUxNTY4fQ.fbGL9F8S-OTK-QeXrYSZieF9vFM8ojG7mMUJBD8B61U";

describe("GET ALL CARTS /carts", () => {
    test("Return status 200 and list of carts", (done) => {
        request(app)
            .get("/carts")
            .set({ Authorization: jwtToken, Accept: "application/json" })
            .expect("Content-Type", /json/)
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.body).toHaveProperty("message");
                expect(res.body).toHaveProperty("data");
                done();
            });
    });
});