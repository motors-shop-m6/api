import { Router } from "express";
import { AdvertisementController } from "../controllers/AdvertisementController";

const routes = Router();

export const advertisementRoutes = () =>{
  routes.post("", AdvertisementController.create);

  return routes;
}

