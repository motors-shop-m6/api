import { Router } from "express";
import { ReviewController } from "../controllers/ReviewController";
import { handleAuthTokenMiddleware } from "../middlewares/handleAuthTokenMiddleware";
import { handleUniqueCommentMiddleware } from "../middlewares/handleUniqueCommentMiddleware";

const routes = Router();

export const reviewRoutes = () => {
  routes.post(
    `/:adsId`,
    handleAuthTokenMiddleware,
    handleUniqueCommentMiddleware,
    ReviewController.create
  );

  return routes;
};
