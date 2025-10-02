import { Review, ReviewDocument, reviewModel } from "../models/review.model";

class ReviewService {

    async create(reviewData: Review): Promise<ReviewDocument | { message: string }> {
        try {
            const newReview = await reviewModel.create(reviewData);
            return newReview;
        } catch (error) {
            return { message: 'An error occurred while creating the review.' };
        }
    }

    async getReviewsByBookId(bookId: string): Promise<ReviewDocument[]> {
        try {
            const reviews = await reviewModel.find({ bookId });
            return reviews;
        } catch (error) {
            throw error;
        }
    }

    async getReviewsByUserId(userId: string): Promise<ReviewDocument[]> {
        try {
            const reviews = await reviewModel.find({ userId });
            return reviews;
        } catch (error) {
            throw error;
        }
    }

    async deleteById(id: string): Promise<boolean> {
        try {
            const isDeleted = await reviewModel.findByIdAndDelete(id);
            return isDeleted !== null;
        } catch (error) {
            throw error;
        }
    }
}

export const reviewService = new ReviewService();