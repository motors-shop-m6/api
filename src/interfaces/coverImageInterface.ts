export interface IAdvertisementRequest {
  image: string;
}

export interface IAdvertisementResponse extends IAdvertisementRequest{
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
