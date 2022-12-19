import { Express } from "express";
import { advertisementRoutes } from "./advertisementRoute";
import { userRoutes } from "./userRoute";


export const appRoutes = (app:Express) =>{
  app.use("/advertisement", advertisementRoutes());
  app.use("/user", userRoutes());
}