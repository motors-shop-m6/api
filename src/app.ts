import cors from "cors";
import express from "express";
import "express-async-errors";
import "reflect-metadata";
import { appRoutes } from "./routes";


export const app = express();
app.use(express.json());
appRoutes(app)

const options: cors.CorsOptions = {
  methods: "GET, POST, PATCH, DELETE",
  origin: "*",
};
app.use(cors(options));
