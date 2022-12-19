import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { UserEntity } from "../entities/UserEntity";
import { ForbiddenRequestError } from "../errors/AsyncErrorResponse";

export const handleOwnerIdMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.user.id;
  const paramsId = req.params;
  
  const userRepository = AppDataSource.getRepository(UserEntity);
  const user = await userRepository.findOneBy(paramsId);

  if(user!.id !== id){
    throw new ForbiddenRequestError("User credentials invalid");
  }

  // const advertisementRepository = AppDataSource.getRepository(AdvertisementEntity);
  // const advertisement = await advertisementRepository.findOneBy({adId})
  // logic ad 

  next();
}
