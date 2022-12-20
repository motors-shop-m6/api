import { IAddress } from "../../interfaces/addressInterface";

type OverrideAddress = Partial<IAddress>;

export const makeAddress = (address: OverrideAddress = {}) => 
  ( 
    {
      cep: "60606060",
      state: "BR",
      city: "Example_City",
      street: "Example_Street",
      number: "30",
      complement: "Example_Complement",
      ...address,
    }
  )