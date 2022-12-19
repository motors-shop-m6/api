import request from "supertest";
import { DataSource } from "typeorm";
import { app } from "../../app";
import { AppDataSource } from "../../data-source";
import { makeUser } from "../factories/userFactory";

describe("User", () => {
  let connection: DataSource;

  beforeAll(
    async () =>
      await AppDataSource.initialize()
        .then((res) => (connection = res))
        .catch((err) =>
          console.log(`Error during Data Source initialization, ${err}`)
        )
  );

  afterAll(async () => await connection.destroy());

  it("should be able to create a user", async () => {
    const response = await request(app).post("/user").send(makeUser());
    await request(app)
      .post("/user")
      .send(
        makeUser({
          email: "example_email1@gmail.com",
          cpf: "12312312312",
        })
      );

    expect(response.body).toEqual(
      expect.objectContaining({
        id: response.body.id,
        name: "Example_name",
        email: "example_email@gmail.com",
        cpf: "12312312311",
        phone: "12341234",
        birthDate: "2000-10-10",
        description: "Example user description",
        createdAt: response.body.createdAt,
        updatedAt: response.body.updatedAt,
        address: {
          id: response.body.address.id,
          cep: "60606060",
          state: "BR",
          city: "Example_City",
          street: "Example_Street",
          number: "30",
          complement: "Example_Complement",
        },
      })
    );
    expect(response.status).toBe(201);
  });

  it("should not be able to create a user with email in use", async () => {
    await request(app).post("/user").send(makeUser());

    const response = await request(app)
      .post("/user")
      .send(
        makeUser({
          cpf: "12312312313",
        })
      );

    const data = { message: "Unique infos error" };

    expect(response.body).toEqual(data);
    expect(response.status).toBe(400);
  });

  it("should not be able to create a user with ssn in use", async () => {
    await request(app).post("/user").send(makeUser());

    const response = await request(app)
      .post("/user")
      .send(
        makeUser({
          email: "example_email2@gmail.com",
        })
      );

    const data = { message: "Unique infos error" };

    expect(response.body).toEqual(data);
    expect(response.status).toBe(400);
  });

  it("should be able to list users", async () => {
    const response = await request(app).get("/user/list");

    expect(response.body.length).toEqual(2);
    expect(response.status).toBe(200);
  });

  it("should be able to get a user", async () => {
    const userPermission = await request(app).post("/login").send({
      email: "example_email@gmail.com",
      password: "example_password",
    });

    const response = await request(app)
      .get(`/user/${userPermission.body.id}`)
      .set("Authorization", `Bearer ${userPermission.body.token}`);

    expect(response.body).toEqual(
      expect.objectContaining({
        id: userPermission.body.id,
        name: "Example_name",
        email: "example_email@gmail.com",
        cpf: "12312312311",
        phone: "12341234",
        birthDate: "2000-10-10",
        description: "Example user description",
        createdAt: response.body.createdAt,
        updatedAt: response.body.updatedAt,
        address: {
          id: response.body.address.id,
          cep: "60606060",
          state: "BR",
          city: "Example_City",
          street: "Example_Street",
          number: "30",
          complement: "Example_Complement",
        },
      })
    );

    expect(response.status).toBe(200);
  });

  it("should not be able to get a user with invalid uuid format", async () => {
    const userPermission = await request(app).post("/login").send({
      email: "example_email@gmail.com",
      password: "example_password",
    });

    const response = await request(app)
      .get(`/user/1`)
      .set("Authorization", `Bearer ${userPermission.body.token}`);

    const data = { message: "Invalid Id Format" };

    expect(response.body).toEqual(data);
    expect(response.status).toBe(400);
  });

  it("should not be able to get a user with invalid id", async () => {
    const userPermission = await request(app).post("/login").send({
      email: "example_email@gmail.com",
      password: "example_password",
    });

    const response = await request(app)
      .get(`/user/69ca4e4a-0b63-47ff-99cb-24fff39fcbb3`)
      .set("Authorization", `Bearer ${userPermission.body.token}`);

    const data = { message: "Invalid user Id" };

    expect(response.body).toEqual(data);
    expect(response.status).toBe(400);
  });
});
