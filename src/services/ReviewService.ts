import { AppDataSource } from "../data-source";
import { AdvertisementEntity } from "../entities/AdvertisementEntity";
import { ReviewEntity } from "../entities/ReviewEntity";
import { UserEntity } from "../entities/UserEntity";
import { IReviewRequest } from "../interfaces/reviewInterface";

export class ReviewService {
  static create = async (
    { comments }: IReviewRequest,
    userId: string,
    adsId: string
  ) => {
    const reviewRepository = AppDataSource.getRepository(ReviewEntity);
    const userRepository = AppDataSource.getRepository(UserEntity);
    const vehicleRepository = AppDataSource.getRepository(AdvertisementEntity);

    const user = await userRepository.findOneBy({ id: userId });
    const vehicle = await vehicleRepository.findOneBy({ id: adsId });
    const review = await reviewRepository.save({
      comments: comments,
      user: user!,
      vehicle: vehicle!,
    });

    const newReview = await reviewRepository.findOne({
      where: { id: review.id },
      select: { user: { name: true }, vehicle: { title: true } },
      relations: { user: true, vehicle: true },
    });

    return newReview;
  };
}
