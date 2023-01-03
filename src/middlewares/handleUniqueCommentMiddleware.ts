import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { ReviewEntity } from "../entities/ReviewEntity";
import { BadRequestError } from "../errors/AsyncErrorResponse";
import { regexExp } from "../utils/regexUtil";

export const handleUniqueCommentMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const adsId = req.params.id;

  const reviewRepository = AppDataSource.getRepository(ReviewEntity);

  if (!regexExp.uuid.test(adsId)) {
    throw new BadRequestError("Invalid Id Format");
  }

  const uniqueReview = await reviewRepository.findOne({
    where: { vehicle: { id: adsId }, user: { id: req.user.id } },
  });

  if (uniqueReview) {
    throw new BadRequestError("Already have a comment");
  }

  next();
};
