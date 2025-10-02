// book.model.ts
import mongoose, { Schema, Document, model } from 'mongoose';
import { Review } from './review.model';
import { reviewModel } from './review.model';

export interface Book {
  bookId: string;
  title: string;
  author: string;
  reviews: Review[];
}

export interface BookDocument extends Book, Document {}

const BookSchema = new Schema<BookDocument>({
  bookId: { type: String, required: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  reviews: [reviewModel.schema],
}, {collection: "Books"});

export const BookModel = model<BookDocument>('Book', BookSchema);