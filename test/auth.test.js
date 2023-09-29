const request = require("supertest");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { User } = require("../service/schemas/user");
const app = require("../app"); // Путь к вашему серверу
const { Host } = process.env;

describe("auth process", () => {
  beforeAll(async () => {
    await mongoose.connect(Host, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
  // ---------------- delete_Users_database_after_test----------

  // afterEach(async () => {
  //   await mongoose.connection.collection("users").deleteMany({});
  // });
  // ---------------------------register_test----------------------
  // test("Register user", async () => {
  //   await request(app)
  //     .post("/api/auth/users/register")
  //     .send({
  //       name: "testUser4",
  //       email: "test-user4@gmail.com",
  //       password: "123456",
  //     })
  //     .expect(201);
  // }, 400000);
  // ---------------------------login_test-------------------------

  test("Login user", async () => {
    const response = await request(app).post("/api/auth/users/login").send({
      email: "test-user4@gmail.com",
      password: "123456",
    });

    expect(response.status).toBe(200);

    expect(response.body).toMatchObject({
      user: {
        email: "test-user4@gmail.com",
        subscription: "starter",
      },
    });
    expect(typeof response.body.user.email).toBe("string");
    expect(typeof response.body.user.subscription).toBe("string");
    expect(typeof response.body.token).toBe("string");

    expect(response.body).toHaveProperty("token");
  }, 400000);
});
