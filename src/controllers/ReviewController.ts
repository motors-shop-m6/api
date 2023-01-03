import { Request, Response } from "express";
import { IReviewRequest } from "../interfaces/reviewInterface";
import { ReviewService } from "../services/ReviewService";

export class ReviewController {
  static create = async (req: Request, res: Response) => {
    const userId = req.user.id;
    const adsId = req.params.adsId;
    const reviewData: IReviewRequest = req.body;

    const review = await ReviewService.create(reviewData, userId, adsId);

    return res.status(201).send(review);
  };
}
