import express from "express";
import "express-async-errors";
import cors from "cors";
import "reflect-metadata";

export const app = express();
app.use(express.json());

const options: cors.CorsOptions = {
  methods: "GET, POST, PATCH, DELETE",
  origin: "*",
};
app.use(cors(options));
