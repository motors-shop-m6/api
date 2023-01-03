import { Router } from "express";
import { ReviewController } from "../controllers/ReviewController";
import { handleAuthTokenMiddleware } from "../middlewares/handleAuthTokenMiddleware";
import { handleAdsIdNotFoundOrInvalidId } from "../middlewares/handleIdNotFoundMiddleware";
import { handleOwnerCommentMiddleware } from "../middlewares/handleOwnerCommentMiddleware";
import { handleUniqueCommentMiddleware } from "../middlewares/handleUniqueCommentMiddleware";

const routes = Router();

export const reviewRoutes = () => {
  routes.post(
    `/:id`,
    handleAuthTokenMiddleware,
    handleOwnerCommentMiddleware,
    handleUniqueCommentMiddleware,
    handleAdsIdNotFoundOrInvalidId,
    ReviewController.create
  );

  return routes;
};
