import { IUserRequest } from "../../interfaces/userInterface";
import { makeAddress } from "./addressFactory";

type OverrideUser = Partial<IUserRequest>;

export const makeUser = (user: OverrideUser = {}) => 
  ( 
    {
      name: "Example_name",
      email: "example_email@gmail.com",
      cpf: "12312312311",
      password: "example_password",
      phone: "12341234",
      birthDate: "2000-10-10",
      description: "Example user description",
      address: makeAddress(),
      ...user,
    }
  )