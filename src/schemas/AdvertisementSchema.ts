import * as yup from "yup";
import { SchemaOf } from "yup";
import { IAdvertisementRequest } from "../interfaces/advertisementInterface";

export class AdvertisementSchema {
  static create: SchemaOf<IAdvertisementRequest> = yup.object().shape({
    title: yup.string().required("Field Required"),
    year: yup.string().required("Field Required"),
    km: yup.string().required("Field Required"),
    price: yup.number().required("Field Required"),
    description: yup.string().required("Field Required"),
    typeOfVehicle: yup.boolean().required("Field Required"),
    images: yup.array().required("Field Required"),
  });
}
