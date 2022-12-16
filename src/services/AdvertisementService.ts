import { AppDataSource } from "../data-source";
import { AdvertisementEntity } from "../entities/AdvertisementEntity";
import { CoverImageEntity } from "../entities/CoverImageEntity";
import { BadRequestError } from "../errors/AsyncErrorResponse";
import { IAdvertisementRequest, IAdvertisementResponse } from "../interfaces/advertisementInterface";

export class AdvertisementService{
  static create = async(advertisementData: IAdvertisementRequest): Promise<IAdvertisementResponse> => {
    const advertisementRepository = AppDataSource.getRepository(AdvertisementEntity);
    const coverImageRepository = AppDataSource.getRepository(CoverImageEntity);

    const advertisement = await advertisementRepository.save(advertisementData)
    advertisementData.images.forEach(async(image) => await coverImageRepository.save({image, advertisement}))

    return advertisement
  }

  static readAll = async(): Promise<IAdvertisementResponse[]> => {
    const advertisementRepository = AppDataSource.getRepository(AdvertisementEntity);

    const advertisements = await advertisementRepository.find({
      select: {
        coverImage: {
          image: true
        }
      },
      relations: {
        coverImage: true
      }
    });

    return advertisements
  }

  static readById = async(id: string): Promise<IAdvertisementResponse> => {
    const advertisementRepository = AppDataSource.getRepository(AdvertisementEntity);

    const advertisement = await advertisementRepository.findOne({
      where: {id},
      select: {
        coverImage: {
          image: true
        }
      },
      relations: {
        coverImage: true
      }
    });

    if(!advertisement){
      throw new BadRequestError("Invalid Ad Id");
    }

    return advertisement
  }

  static deleteById = async(id: string): Promise<void> => {
    const advertisementRepository = AppDataSource.getRepository(AdvertisementEntity);

    const advertisement = await advertisementRepository.findOneBy({id});

    if(!advertisement){
      throw new BadRequestError("Invalid Ad Id");
    }

    await advertisementRepository.update(id, Object.assign(advertisement, advertisement.isActive=false))
  }
}