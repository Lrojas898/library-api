import { Book, BookDocument, BookModel } from "../models/book.model";

class BookService {

    async getAllBooks(): Promise<BookDocument[]> {

        try {

            const response: BookDocument[] = await BookModel.find()
            return response

        } catch (error) {

            throw error

        }

    }


   async create(inputData: Book): Promise<BookDocument | { message: string }> {
  try {
    const bookId = inputData.bookId;
    const doesBookExists: BookDocument | null = await this.findByBookId(bookId);

    if (doesBookExists) {
      return { message: `Book with id ${bookId} already exists.` };
    }

    const newBook = await BookModel.create(inputData);
    return newBook; 

  } catch (error) {
    
    return { message: 'An error occurred while creating the book.' };
  }
}


    async updateBook(id: string, inputBook: Book) {

        try {

            const updateBook: BookDocument | null = await BookModel.findOneAndUpdate({ bookId: id }, inputBook, { returnOriginal: false });
            return updateBook;

        } catch (error) {

            throw error;

        }


    }

     async deleteById(id: string): Promise<boolean> {
            try {
    
                const isDeleted = await BookModel.findOneAndDelete({ bookId: id })
    
                return isDeleted !== null;
    
            } catch (error) {
    
                throw error;
    
            }
        }




     async findById(id: string) {
            try {
                const Books = await BookModel.findById(id);
                return Books;
            } catch (error) {
                throw error;
            }
        }

     async findByBookId(bookId: string) {
            try {
                const Books = await BookModel.findOne({ bookId });
                return Books;
            } catch (error) {
                throw error;
            }
        }
    





}

export const bookService = new BookService();