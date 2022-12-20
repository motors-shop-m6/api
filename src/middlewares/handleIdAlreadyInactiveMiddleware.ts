import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { AdvertisementEntity } from "../entities/AdvertisementEntity";
import { BadRequestError } from "../errors/AsyncErrorResponse";

export const handleAlreadyInactive = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const advertisementRepository =
    AppDataSource.getRepository(AdvertisementEntity);
  const advertisement = await advertisementRepository.findOneBy({ id });

  if (!advertisement!.isActive) {
    throw new BadRequestError("Id is Inactive");
  }

  next();
};
