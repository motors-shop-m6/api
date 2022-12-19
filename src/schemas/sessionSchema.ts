import * as yup from "yup";
import { SchemaOf } from "yup";
import { ISessionRequest } from "../interfaces/sessionInterface";

export class SessionSchema {
  static create: SchemaOf<ISessionRequest> = yup.object().shape({
    email: yup.string().email("Email invalid").required("Field Required"),
    password: yup.string().max(20, "Max length twenty characters").required("Field Required")
  });
}