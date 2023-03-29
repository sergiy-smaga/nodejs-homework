const request = require("supertest");
const { describe, expect, it } = require("@jest/globals");
const app = require("../../app");

describe("POST /users/login", () => {
  it("should return user, token and status code 200", () => {
    const testData = {
      email: "smaga@mail.com",
      password: "123qwe",
    };

    request(app)
      .post("/api/users/login")
      .send(testData)
      .expect(200, {
        token: expect.any(String),
        user: {
          email: testData.email,
          subscription: "starter",
        },
      });
  });

  it("should return unauthorized error when password wrong", () => {
    const testData = {
      email: "smaga@mail.com",
      password: "111qqq",
    };

    request(app).post("/api/users/login").send(testData).expect(401, {
      message: "Email or password is wrong",
    });
  });

  it("should return unauthorized error when email wrong", () => {
    const testData = {
      email: "smagasmaga@mail.com",
      password: "123qwe",
    };

    request(app).post("/api/users/login").send(testData).expect(401, {
      message: "Email or password is wrong",
    });
  });
});
