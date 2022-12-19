export interface IAdvertisementRequest {
  title: string;
  year: string;
  km: string;
  price: number;
  description: string;
  typeOfVehicle: boolean;
  images: string[];
}

export interface IAdvertisementResponse extends IAdvertisementRequest{
  id: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
