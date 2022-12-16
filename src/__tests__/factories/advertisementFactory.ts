import { IAdvertisementRequest } from "../../interfaces/advertisementInterface";

type OverrideAdvertisement = Partial<IAdvertisementRequest>;

export const makeAdvertisement = (advertisement:OverrideAdvertisement = {}) => 
  ( 
    {
      title: "ads test",
      year: "1360",
      km: "260600",
      price: 20603000,
      description: "ads description test",
      typeOfVehicle: false,
      ...advertisement,
    }
  )