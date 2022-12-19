import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { UserEntity } from "../entities/UserEntity";
import { BadRequestError } from "../errors/AsyncErrorResponse";

export const handleUserEmailOrSsnUniqueMiddleware = async(req: Request, res: Response, next: NextFunction) => {
  const {email, cpf} = req.body

  const userRepository = AppDataSource.getRepository(UserEntity);
  const emailExists = await userRepository.findOneBy({email});
  const ssnExists = await userRepository.findOneBy({cpf});

  if( emailExists || ssnExists){
    throw new BadRequestError("Unique infos error");
  }

  next();
}