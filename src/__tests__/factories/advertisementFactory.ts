import { IAdvertisementRequest } from "../../interfaces/advertisementInterface";

type OverrideAdvertisement = Partial<IAdvertisementRequest>;

export const makeAdvertisement = (advertisement: OverrideAdvertisement = {}) => 
  ( 
    {
      title: "Example_Ads",
      year: "1360",
      km: "260600",
      price: "20603000.00",
      description: "Ads description example",
      images:[ "http://res.cloudinary.com/tmartins/image/upload/v1671212359/motorshop/yqmebfb78ion0izouiee.png",							
      "http://res.cloudinary.com/tmartins/image/upload/v1671216063/motorshop/olhwamqxeawfw4l2ftox.png"],
      typeOfVehicle: "carro",
      ...advertisement
    }
  )