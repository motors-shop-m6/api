import { Request, Response } from "express";
import { IAdvertisementRequest, IAdvertisementResponse } from "../interfaces/advertisementInterface";
import { AdvertisementService } from "../services/AdvertisementService";

export class AdvertisementController{
  static create = async(req: Request, res: Response) => {
    const advertisementData: IAdvertisementRequest = req.body;
    const advertisement: IAdvertisementResponse = await AdvertisementService.create(advertisementData);

    return res.status(201).send(advertisement);
  }

  static readAll = async(req: Request, res: Response) => {
    const advertisements = await AdvertisementService.readAll();

    return res.send(advertisements)
  }
}