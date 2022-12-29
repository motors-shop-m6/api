export interface IAdvertisementRequest {
  title: string;
  year: string;
  km: string;
  price: number;
  description: string;
  typeOfVehicle: string;
  coverImage: string;
  images: string[];
}

export interface IAdvertisementResponse extends Partial<IAdvertisementRequest> {
  id: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
