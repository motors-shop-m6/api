import cors from "cors";
import express from "express";
import "express-async-errors";
import "reflect-metadata";
import { handleAsyncErrorResponseMiddleware } from "./middlewares/handleAsyncErrorResponseMiddleware";
import { appRoutes } from "./routes";

export const app = express();
app.use(express.json());

appRoutes(app);
app.use(handleAsyncErrorResponseMiddleware);

const options: cors.CorsOptions = {
  methods: "GET, POST, PATCH, DELETE",
  origin: "*",
};
app.use(cors(options));
