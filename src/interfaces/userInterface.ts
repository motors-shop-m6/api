export interface IUserRequest {
  name: string;
  email: string;
  password: string;
  cpf: string;
  phone: string;
  birthDate: string;
  description: string;
}

export interface IUserResponse extends Partial<IUserRequest>{
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
