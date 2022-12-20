import { Router } from "express";
import { SessionController } from "../controllers/SessionController";
import { handleSchemaMiddleware } from "../middlewares/handleSchemaMiddleware";
import { SessionSchema } from "../schemas/sessionSchema";

const routes = Router();

export const sessionRoutes = () => {
  routes.post(
    "",
    handleSchemaMiddleware(SessionSchema.create),
    SessionController.create
  );

  return routes;
};
