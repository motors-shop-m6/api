import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { handleAuthTokenMiddleware } from "../middlewares/handleAuthTokenMiddleware";
import { handleAccountIdNotFoundOrInvalidId } from "../middlewares/handleIdNotFoundMiddleware";
import { handleSchemaMiddleware } from "../middlewares/handleSchemaMiddleware";
import { handleUserEmailOrSsnUniqueMiddleware } from "../middlewares/handleUserEmailOrSsnUniqueMiddleware";
import { UserSchema } from "../schemas/UserSchema";

const routes = Router();

export const userRoutes = () =>{
  routes.post("", 
  handleUserEmailOrSsnUniqueMiddleware,
    // handleSchemaMiddleware(
    //   UserSchema.create
    // ), 
    UserController.create
  );

  routes.get("/list", 
    UserController.readAll
  );

  routes.get("/:id", 
    handleAuthTokenMiddleware,
    handleAccountIdNotFoundOrInvalidId,
    UserController.readById
  );

  routes.patch("/:id", 
    handleAuthTokenMiddleware,
    handleAccountIdNotFoundOrInvalidId,
    UserController.updateById
  );

  routes.delete("/:id", 
    handleAuthTokenMiddleware,
    handleAccountIdNotFoundOrInvalidId,
    UserController.deleteById
  );

  return routes;
}

