import { IAddress } from "./addressInterface";

export interface IUserRequest {
  name: string;
  email: string;
  password: string;
  cpf: string;
  phone: string;
  birthDate: string;
  description: string;
  address: IAddress;
}

export interface IUserResponse extends Partial<IUserRequest> {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  address: IAddress;
}
