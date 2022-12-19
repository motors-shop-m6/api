import { Request, Response } from "express";
import { ISessionRequest, ISessionResponse } from "../interfaces/sessionInterface";
import { SessionService } from "../services/SessionService";

export class SessionController{
  static create = async(req: Request, res: Response) => {
    const sessionData: ISessionRequest = req.body;
    const session: ISessionResponse = await SessionService.create(sessionData);

    return res.status(201).send(session);
  }
}