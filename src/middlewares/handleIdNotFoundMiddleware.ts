import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { AdvertisementEntity } from "../entities/AdvertisementEntity";
import { BadRequestError } from "../errors/AsyncErrorResponse";
import { regexExp } from "../utils/regexUtil";

export const handleIdNotFoundOrInvalidId = async(req: Request, res: Response, next: NextFunction) => { 
  const { id } = req.params;

  if(!regexExp.uuid.test(id)){
    throw new BadRequestError("Invalid Id Format");
  }

  const advertisementRepository = AppDataSource.getRepository(AdvertisementEntity);
  const advertisementNotFound = await advertisementRepository.findOneBy({id})

  if(!advertisementNotFound){
    throw new BadRequestError("Invalid Ad Id");
  }

  next()
}