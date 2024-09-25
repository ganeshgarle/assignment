const request = require("supertest");
const app = require("../app");

describe("convertNumberToWords", () => {
  
  test("should return words for valid input", async () => {
    const response = await request(app)
      .post("/convert")
      .send({ number: 0 })
      .expect("Content-Type", /json/)
      .expect(200);
    expect(response.body).toEqual({ status: "success", words: "zero" });
  });

  test("should return error for negative number", async () => {
    const response = await request(app)
      .post("/convert")
      .send({ number: -1 })
      .expect("Content-Type", /json/)
      .expect(400);
    expect(response.body).toEqual({
      status: "error",
      message: "Number must be an integer between 0 and 999",
    });
  });

  test("should return error for number greater than oe equal to 1000", async () => {
    const response = await request(app)
      .post("/convert")
      .send({ number: -1 })
      .expect("Content-Type", /json/)
      .expect(400);
    expect(response.body).toEqual({
      status: "error",
      message: "Number must be an integer between 0 and 999",
    });
  });
});

describe("Integration Tests", () => {
  test("POST /convert - should return words for valid input", async () => {
    const response = await request(app)
      .post("/convert")
      .send({ number: 123 })
      .expect("Content-Type", /json/)
      .expect(200);
    expect(response.body).toEqual({
      status: "success",
      words: "one hundred twenty three",
    });
  });

  test("POST /convert - should return error for negative number", async () => {
    const response = await request(app)
      .post("/convert")
      .send({ number: -1 })
      .expect("Content-Type", /json/)
      .expect(400);
    expect(response.body).toEqual({
      status: "error",
      message: "Number must be an integer between 0 and 999",
    });
  });

  test("POST /convert - should return error for number out of range", async () => {
    const response = await request(app)
      .post("/convert")
      .send({ number: 1000 })
      .expect("Content-Type", /json/)
      .expect(400);
    expect(response.body).toEqual({
      status: "error",
      message: "Number must be an integer between 0 and 999",
    });
  });

  test("POST /convert - should return error for non-integer input", async () => {
    const response = await request(app)
      .post("/convert")
      .send({ number: "abc" })
      .expect("Content-Type", /json/)
      .expect(400);
    expect(response.body).toEqual({
      status: "error",
      message: "Number must be an integer between 0 and 999",
    });
  });

});
