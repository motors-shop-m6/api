import { Router } from "express";
import { AdvertisementController } from "../controllers/AdvertisementController";
import { handleCloudinary } from "../middlewares/handleCloudinary";
import { handleAlreadyInactive } from "../middlewares/handleIdAlreadyInactiveMiddleware";
import { handleIdNotFoundOrInvalidId } from "../middlewares/handleIdNotFoundMiddleware";
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

  routes.get("/:id", 
    handleIdNotFoundOrInvalidId,
    handleAlreadyInactive,
    AdvertisementController.readById
  );

  routes.patch("/:id", 
    handleIdNotFoundOrInvalidId,
    handleAlreadyInactive,
    AdvertisementController.updateById
  );

  routes.delete("/:id", 
    handleIdNotFoundOrInvalidId,
    handleAlreadyInactive,
    AdvertisementController.deleteById
  );

  routes.post("/cloudinary", 
    upload.array("image", Infinity),
    handleCloudinary
  );

  return routes;
}

