import { AppDataSource } from "../data-source";
import { AdvertisementEntity } from "../entities/AdvertisementEntity";
import { CoverImageEntity } from "../entities/CoverImageEntity";
import { IAdvertisementRequest, IAdvertisementResponse } from "../interfaces/advertisementInterface";

export class AdvertisementService{
  static create = async(advertisementData: IAdvertisementRequest): Promise<IAdvertisementResponse> => {
    const advertisementRepository = AppDataSource.getRepository(AdvertisementEntity);
    const coverImageRepository = AppDataSource.getRepository(CoverImageEntity);

    const advertisement = await advertisementRepository.save(advertisementData)
    advertisementData.images.forEach(async(image) => await coverImageRepository.save({image, advertisement}))

    return advertisement
  }
}