import mongoose from "mongoose"; 


export interface Review{
    userId: string;
    bookId: string;
    description: string;
}

export interface ReviewDocument extends Review, mongoose.Document {}

export const ReviewSchema = new mongoose.Schema({
    userId: {type: String, required: true},
    bookId: {type: String, required: true},
    description: {type: String, required: true}
}, {collection: "Reviews"});
export const reviewModel = mongoose.model<ReviewDocument>("Review", ReviewSchema);