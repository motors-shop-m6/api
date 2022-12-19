import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { IUserRequest, IUserResponse } from "../interfaces/userInterface";
import { UserService } from "../services/UserService";

export class UserController{
  static create = async(req: Request, res: Response) => {
    const userData: IUserRequest = req.body;
    const user: IUserResponse = await UserService.create(userData);

    return res.status(201).send(instanceToPlain(user));
  }

  static readAll = async(req: Request, res: Response) => {
    const users = await UserService.readAll();

    return res.send(instanceToPlain(users))
  }

  static readById = async(req: Request, res: Response) => {
    const { id } = req.params    
    const users = await UserService.readById(id);

    return res.send(instanceToPlain(users))
  }

  static updateById = async(req: Request, res: Response) => {
    const { id } = req.params;
    const userData = req.body;

    const user = await UserService.updateById(id, userData);

    return res.json(instanceToPlain(user));
  }

  static deleteById = async(req: Request, res: Response) => {
    const { id } = req.params    
    await UserService.deleteById(id);

    return res.status(204).send()
  }
}