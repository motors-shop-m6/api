import { compareSync } from "bcryptjs";
import "dotenv/config";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../data-source";
import { UserEntity } from "../entities/UserEntity";
import { ForbiddenRequestError } from "../errors/AsyncErrorResponse";
import {
  ISessionRequest,
  ISessionResponse
} from "../interfaces/sessionInterface";

export class SessionService {
  static create = async (
    sessionData: ISessionRequest
  ): Promise<ISessionResponse> => {
    const userRepository = AppDataSource.getRepository(UserEntity);
    const user = await userRepository.findOneBy({ email: sessionData.email });

    if (!user) {
      throw new ForbiddenRequestError("Invalid Credentials");
    }

    const matchPassword = compareSync(sessionData.password, user.password);

    if (!matchPassword) {
      throw new ForbiddenRequestError("Invalid Credentials");
    }

    const session = jwt.sign({}, process.env.SECRET_KEY as string, {
      expiresIn: "1d",
      subject: user.id,
    });

    return { token: session, id: user.id };
  };
}
