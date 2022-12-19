import { Router } from "express";
import { AdvertisementController } from "../controllers/AdvertisementController";
import { handleAuthTokenMiddleware } from "../middlewares/handleAuthTokenMiddleware";
import { handleCloudinary } from "../middlewares/handleCloudinary";
import { handleAlreadyInactive } from "../middlewares/handleIdAlreadyInactiveMiddleware";
import { handleAdsIdNotFoundOrInvalidId } from "../middlewares/handleIdNotFoundMiddleware";
import { handleAdsOwnerIdMiddleware } from "../middlewares/handleOwnerIdMiddleware";
import { handleSchemaMiddleware } from "../middlewares/handleSchemaMiddleware";
import { AdvertisementSchema } from "../schemas/AdvertisementSchema";
import { upload } from "../utils/cloudinaryUtil";

const routes = Router();

export const advertisementRoutes = () =>{
  routes.post("", 
    handleAuthTokenMiddleware,
    handleSchemaMiddleware(
      AdvertisementSchema.create
    ), 
    AdvertisementController.create
  );

  routes.get("/list", 
    AdvertisementController.readAll
  );

  routes.get("/:id", 
    handleAuthTokenMiddleware,
    handleAdsIdNotFoundOrInvalidId,
    handleAlreadyInactive,
    AdvertisementController.readById
  );

  routes.patch("/:id", 
    handleAuthTokenMiddleware,
    handleAdsIdNotFoundOrInvalidId,
    handleAlreadyInactive,
    handleAdsOwnerIdMiddleware,
    AdvertisementController.updateById
  );

  routes.delete("/:id", 
    handleAuthTokenMiddleware,
    handleAdsIdNotFoundOrInvalidId,
    handleAlreadyInactive,
    handleAdsOwnerIdMiddleware,
    AdvertisementController.deleteById
  );

  routes.post("/cloudinary",  
  handleAuthTokenMiddleware,
    upload.array("image", Infinity),
    handleCloudinary
  );

  return routes;
}

