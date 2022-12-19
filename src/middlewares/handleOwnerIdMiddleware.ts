import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { AdvertisementEntity } from "../entities/AdvertisementEntity";
import { UserEntity } from "../entities/UserEntity";
import { UnauthorizedRequestError } from "../errors/AsyncErrorResponse";

export const handleOwnerIdMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.user.id;
  const paramsId = req.params;

  const userRepository = AppDataSource.getRepository(UserEntity);
  const user = await userRepository.findOneBy(paramsId);

  if (user!.id !== id) {
    throw new UnauthorizedRequestError("User credentials invalid");
  }

  next();
};

export const handleAdsOwnerIdMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user.id;
  const paramsId = req.params;

  const advertisementRepository =
    AppDataSource.getRepository(AdvertisementEntity);
  const advertisement = await advertisementRepository.findOne({
    where: {
      id: paramsId.id,
    },
    relations: {
      user: true,
    },
  });

  if (advertisement!.user.id !== userId) {
    throw new UnauthorizedRequestError("User credentials invalid");
  }

  next();
};
