import request from "supertest";
import { DataSource } from "typeorm";
import { app } from "../../app";
import { AppDataSource } from "../../data-source";
import { makeAdvertisement } from "../factories/advertisementFactory";

describe("Advertisement", () => {
  let connection: DataSource;

  beforeAll(async () => 
    await AppDataSource.initialize()
    .then((res) => connection = res)
    .catch((err) => console.log(`Error during Data Source initialization, ${err}`))
  );

  afterAll(async () => await connection.destroy());

  it("should be able to create a ad", async () => {
    const response = await request(app).post("/advertisement").send(makeAdvertisement());

    console.log(makeAdvertisement())
    expect(response.body.advertisement).toEqual(expect.objectContaining(makeAdvertisement()));
    expect(response.status).toBe(201);
  });

  it("should not be able to create a ad without required fields", async () => {
    const response = await request(app).post("/advertisement").send({});

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Invalid Fields");
    expect(response.status).toBe(400);
  });

});