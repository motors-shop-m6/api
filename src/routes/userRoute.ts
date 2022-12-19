import { Router } from "express";
import { UserController } from "../controllers/UserController";
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
    handleAccountIdNotFoundOrInvalidId,
    UserController.readById
  );

  routes.patch("/:id", 
    handleAccountIdNotFoundOrInvalidId,
    UserController.updateById
  );

  routes.delete("/:id", 
    handleAccountIdNotFoundOrInvalidId,
    UserController.deleteById
  );

  return routes;
}

