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

  static readById = async(req: Request, res: Response) => {
    const { id } = req.params    
    const advertisements = await AdvertisementService.readById(id);

    return res.send(advertisements)
  }

  static updateById = async(req: Request, res: Response) => {
    const { id } = req.params;
    const advertisementData = req.body;

    const advertisement = await AdvertisementService.updateById(id, advertisementData);

    return res.json(advertisement);
  }

  static deleteById = async(req: Request, res: Response) => {
    const { id } = req.params    
    await AdvertisementService.deleteById(id);

    return res.status(204).send()
  }
}