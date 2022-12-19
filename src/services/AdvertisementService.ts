import { AppDataSource } from "../data-source";
import { AdvertisementEntity } from "../entities/AdvertisementEntity";
import { CoverImageEntity } from "../entities/CoverImageEntity";
import { UserEntity } from "../entities/UserEntity";
import { IAdvertisementRequest, IAdvertisementResponse } from "../interfaces/advertisementInterface";

export class AdvertisementService{
  static create = async(id: string, advertisementData: IAdvertisementRequest): Promise<IAdvertisementResponse> => {
    const userRepository = AppDataSource.getRepository(UserEntity);
    const advertisementRepository = AppDataSource.getRepository(AdvertisementEntity);
    const coverImageRepository = AppDataSource.getRepository(CoverImageEntity);

    const user = await userRepository.findOneBy({id})
    const advertisement = await advertisementRepository.save({...advertisementData, user: user!})
    advertisementData.images.forEach(async(image) => await coverImageRepository.save({image, advertisement}))

    return advertisement;
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

    const advertisement = await advertisementRepository.find({
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

    return advertisement[0];
  }

  static updateById = async(id: string, advertisementData: Partial<IAdvertisementRequest>): Promise<IAdvertisementResponse> => {
    const advertisementRepository = AppDataSource.getRepository(AdvertisementEntity);
    const coverImageRepository = AppDataSource.getRepository(CoverImageEntity);

    const advertisementUpdate = await advertisementRepository.findOneBy({id})

    const updatedAt = new Date();
    advertisementData.images?.map(async(image) => await coverImageRepository.save({image, advertisement: advertisementUpdate!}))
    delete advertisementData.images
    await advertisementRepository.update(id, Object.assign(advertisementUpdate!, {...advertisementData, updatedAt: updatedAt}))
    
    const advertisement = await advertisementRepository.find({where: {id},
      select: {
        coverImage: {
          image: true
        }
      },
      relations: {
        coverImage: true
      }
    });

    return advertisement[0]!;
  }

  static deleteById = async(id: string): Promise<void> => {
    const advertisementRepository = AppDataSource.getRepository(AdvertisementEntity);

    const advertisement = await advertisementRepository.findOneBy({id});

    await advertisementRepository.update(id, Object.assign(advertisement!, advertisement!.isActive=false));
  }
}