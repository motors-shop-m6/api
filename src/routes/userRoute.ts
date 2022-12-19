import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { handleIdNotFoundOrInvalidId } from "../middlewares/handleIdNotFoundMiddleware";
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
    handleIdNotFoundOrInvalidId,
    UserController.readById
  );

  routes.patch("/:id", 
    handleIdNotFoundOrInvalidId,
    UserController.updateById
  );

  routes.delete("/:id", 
    handleIdNotFoundOrInvalidId,
    UserController.deleteById
  );

  return routes;
}

