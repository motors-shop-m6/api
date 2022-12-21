import cors from "cors";
import express from "express";
import "express-async-errors";
import "reflect-metadata";
import { handleAsyncErrorResponseMiddleware } from "./middlewares/handleAsyncErrorResponseMiddleware";
import { appRoutes } from "./routes";
const options: cors.CorsOptions = {
  methods: "GET, POST, PATCH, DELETE",
  origin: "*",
};

export const app = express();
app.use(express.json());
app.use(cors(options));

appRoutes(app);
app.use(handleAsyncErrorResponseMiddleware);

