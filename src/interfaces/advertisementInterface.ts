export interface IAdvertisementRequest {
  title:string;
  year: string;
  km: string;
  price: number;
  description: string;
  typeOfVehicle: boolean;
}

export interface IAdvertisementResponse extends IAdvertisementRequest{
  id: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
