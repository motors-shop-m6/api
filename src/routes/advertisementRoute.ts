import { Router } from "express";
import { AdvertisementController } from "../controllers/AdvertisementController";
import { handleSchemaMiddleware } from "../middlewares/handleSchemaMiddleware";
import { AdvertisementSchema } from "../schemas/AdvertisementSchema";

const routes = Router();

export const advertisementRoutes = () =>{
  routes.post("", handleSchemaMiddleware(AdvertisementSchema.create), AdvertisementController.create);

  return routes;
}

