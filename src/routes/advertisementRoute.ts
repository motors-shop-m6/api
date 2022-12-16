import { Router } from "express";
import { AdvertisementController } from "../controllers/AdvertisementController";
import { handleCloudinary } from "../middlewares/handleCloudinary";
import { handleSchemaMiddleware } from "../middlewares/handleSchemaMiddleware";
import { AdvertisementSchema } from "../schemas/AdvertisementSchema";
import { upload } from "../utils/cloudinaryUtil";

const routes = Router();

export const advertisementRoutes = () =>{
  routes.post("", 
    handleSchemaMiddleware(
      AdvertisementSchema.create
    ), 
    AdvertisementController.create
  );

  routes.get("/list", 
  AdvertisementController.readAll
);



  routes.post("/cloudinary", 
    upload.array("image", Infinity),
    handleCloudinary
  );

  return routes;
}

