import { AppDataSource } from "../data-source";
import { AdvertisementEntity } from "../entities/AdvertisementEntity";
import { IAdvertisementRequest, IAdvertisementResponse } from "../interfaces/advertisementInterface";

export class AdvertisementService{
  static create = async(advertisementData: IAdvertisementRequest): Promise<IAdvertisementResponse> => {
    const advertisementRepository = AppDataSource.getRepository(AdvertisementEntity);
    const advertisement = advertisementRepository.save(advertisementData)

    return advertisement
  }
}