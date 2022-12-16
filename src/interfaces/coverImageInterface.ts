import { IAdvertisementResponse } from "./advertisementInterface";

export interface ICoverImage{
  id: string;
  image: string;
  addedAt: Date;
  updatedAt: Date;
  advertisementId: IAdvertisementResponse;
}
