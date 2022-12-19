import "dotenv/config";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { BadRequestError } from "../errors/AsyncErrorResponse";

export const handleAuthTokenMiddleware = (req: Request, res: Response, next: NextFunction) =>{
  let token = req.headers.authorization;

  if(token?.includes("Bearer")){
    token = token.split(" ")[1];
  }

  jwt.verify(token as string, process.env.SECRET_KEY as string, (err: any, decoded: any) => {
    if(err){
      throw new BadRequestError("Invalid credentials");
    }

    req.user = {
      id: decoded.sub
    }
  })
  
  next();
}
