import { AppDataSource } from "../data-source";
import { AdvertisementEntity } from "../entities/AdvertisementEntity";
import { ImageEntity } from "../entities/ImageEntity";
import { UserEntity } from "../entities/UserEntity";
import {
  IAdvertisementRequest,
  IAdvertisementResponse
} from "../interfaces/advertisementInterface";

export class AdvertisementService {
  static create = async (
    id: string,
    advertisementData: IAdvertisementRequest
  ): Promise<IAdvertisementResponse> => {
    const userRepository = AppDataSource.getRepository(UserEntity);
    const advertisementRepository =
      AppDataSource.getRepository(AdvertisementEntity);
    const imageRepository = AppDataSource.getRepository(ImageEntity);

    const user = await userRepository.findOneBy({ id });
    const advertisement = await advertisementRepository.save({
      ...advertisementData,
      user: user!,
    });
    advertisementData.images.forEach(
      async (image) => await imageRepository.save({ image, advertisement })
    );

    return advertisement;
  };

  static readAll = async (): Promise<IAdvertisementResponse[]> => {
    const advertisementRepository =
      AppDataSource.getRepository(AdvertisementEntity);

    const advertisements = await advertisementRepository.find({
      select: {
        image: {
          image: true,
        },
      },
      relations: {
        image: true,
      },
    });

    return advertisements;
  };

  static readById = async (id: string): Promise<IAdvertisementResponse> => {
    const advertisementRepository =
      AppDataSource.getRepository(AdvertisementEntity);

    const advertisement = await advertisementRepository.find({
      where: { id },
      select: {
        image: {
          image: true,
        },
      },
      relations: {
        image: true,
      },
    });

    return advertisement[0];
  };

  static updateById = async (
    id: string,
    advertisementData: Partial<IAdvertisementRequest>
  ): Promise<IAdvertisementResponse> => {
    const advertisementRepository =
      AppDataSource.getRepository(AdvertisementEntity);
    const imageRepository = AppDataSource.getRepository(ImageEntity);

    const advertisementUpdate = await advertisementRepository.findOneBy({ id });

    const updatedAt = new Date();
    advertisementData.images?.map(
      async (image) =>
        await imageRepository.save({
          image,
          advertisement: advertisementUpdate!,
        })
    );
    delete advertisementData.images;
    await advertisementRepository.update(
      id,
      Object.assign(advertisementUpdate!, {
        ...advertisementData,
        updatedAt: updatedAt,
      })
    );

    const advertisement = await advertisementRepository.find({
      where: { id },
      select: {
        image: {
          image: true,
        },
      },
      relations: {
        image: true,
      },
    });

    return advertisement[0]!;
  };

  static deleteById = async (id: string): Promise<void> => {
    const advertisementRepository =
      AppDataSource.getRepository(AdvertisementEntity);

    const advertisement = await advertisementRepository.findOneBy({ id });

    await advertisementRepository.update(
      id,
      Object.assign(advertisement!, (advertisement!.isActive = false))
    );
  };
}
