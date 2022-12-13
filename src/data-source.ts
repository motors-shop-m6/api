import "dotenv/config";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource(
  process.env.NODE_ENV === "test"
    ? {
        type: "sqlite",
        database: ":memory:",
        synchronize: true,
        entities: ["src/entities/*.ts"],
      }
    : {
        type: "postgres",
        host: "localhost",
        port: Number(process.env.POSTGRES_PORT),
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PWD,
        database: process.env.POSTGRES_DB,

        ssl: { rejectUnauthorized: false },
        synchronize: false,
        logging: true,
        entities: ["dist/entities/*.js"],
      }
);
