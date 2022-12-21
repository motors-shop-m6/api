import * as yup from "yup";
import { SchemaOf } from "yup";
import { IUserRequest } from "../interfaces/userInterface";

export class UserSchema {
  static create: SchemaOf<Partial<IUserRequest>> = yup.object().shape({
    name: yup.string().required("Field Required"),
    email: yup.string().email("Email invalid").required("Field Required"),
    password: yup
      .string()
      .max(20, "Max length twenty characters")
      .required("Field Required"),
    cpf: yup.string().min(11).max(11).required("Field Required"),
    phone: yup.string().min(11).max(11).required("Field Required"),
    birthDate: yup.string().required("Field Required"),
    description: yup.string().required("Field Required"),
  });
}
