import { Express } from "express";
import { advertisementRoutes } from "./advertisementRoute";
import { reviewRoutes } from "./reviewRoute";
import { sessionRoutes } from "./sessionRoute";
import { userRoutes } from "./userRoute";

export const appRoutes = (app:Express) =>{
  app.use("/advertisement", advertisementRoutes());
  app.use("/user", userRoutes());
  app.use("/review", reviewRoutes());
  app.use("/login", sessionRoutes());
}