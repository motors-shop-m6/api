import { NextFunction, Request, Response } from "express";
import { AnySchema } from "yup";
import { BadRequestError } from "../errors/AsyncErrorResponse";

export const handleSchemaMiddleware =
  (schema: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const schemaData = req.body;

    try {
      await schema.validate(schemaData, {
        abortEarly: false,
        stripUnknown: true,
      });

      next();
    } catch (err) {
      throw new BadRequestError("Invalid Fields");
    }
  };
