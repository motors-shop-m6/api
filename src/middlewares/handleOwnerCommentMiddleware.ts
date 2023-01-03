import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { AdvertisementEntity } from "../entities/AdvertisementEntity";
import { BadRequestError } from "../errors/AsyncErrorResponse";
import { regexExp } from "../utils/regexUtil";

export const handleOwnerCommentMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const adsId = req.params.id;

  const vehicleRepository =  AppDataSource.getRepository(AdvertisementEntity)

  if (!regexExp.uuid.test(adsId)) {
    throw new BadRequestError("Invalid Id Format");
  }

  const vehicle  = await vehicleRepository.findOne({where: {id: adsId}, relations: {user: true}})

  console.log(vehicle)

  if (vehicle?.user.id === req.user.id) {
    throw new BadRequestError("Owner doesn't can comment");
  }

  next();
};
