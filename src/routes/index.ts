import { Express } from "express";
import { advertisementRoutes } from "./advertisementRoute";


export const appRoutes = (app:Express) =>{
  app.use("/advertisement", advertisementRoutes());
}