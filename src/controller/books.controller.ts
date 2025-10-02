import { Request, Response, NextFunction } from "express";
import { Book, BookDocument } from "../models/book.model";
import { Review } from "../models/review.model";
import { bookService } from "../services/book.service";
import { reviewService } from "../services/review.service";

class BookController {




    async getAllBooks(req: Request, res: Response) {
        try {

            const books: BookDocument[] = await bookService.getAllBooks();
            res.json(books);

        } catch (error) {

            res.json(error);

        }
    }

    async getById(req: Request, res: Response) {
        try {

            const bookId = req.params.id;
            if (!bookId || bookId.trim() === '') {
                return res.status(400).json({ message: "ID es requerido" });
            }

            const book: BookDocument | null = await bookService.findByBookId(bookId);

            if (!book) {
                return res.status(404).json({ message: "Libro no encontrado" });
            }

            return res.status(200).json(book);

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error interno del servidor" });
        }
    }

    async create(req: Request, res: Response) {
        try {

        const inputData: Book = req.body;

        const newBook = await bookService.create(inputData);
        
        res.json(newBook);
        } catch (error) {

            res.json(error)

        }
    }

   
     async deleteById(req: Request, res: Response) {
           try {
               const book_id = req.params.id;
   
               if (!book_id || book_id.trim() === '') {
                   return res.status(400).json({ message: "ID es requerido" });
               }
   
               const book: boolean = await bookService.deleteById(book_id);
   
               if (!book) {
                   return res.status(400).json({ message: `No se pudo borrar libro con id ${book_id}` });
               }else {
   
                   return res.status(200).json({message: `Se elimino correctamente el libro`});
               }
   
           } catch (error) {
               console.error(error);
               return res.status(500).json({ message: "Error interno del servidor" });
           }
       }

    async updateById(req: Request, res: Response){

        try{

            const bookId = req.params.id;

             if (!bookId || bookId.trim() === '') {
                   return res.status(400).json({ message: "ID es requerido" });
               }

            const bookInput: Book = req.body;
            const book: BookDocument | null = await bookService.updateBook(bookId, bookInput);
            if(book === null){
                return res.status(400).json({message: `Book ${bookId} not found`});
            }
            return res.json(book);
        }catch(error){
            res.json(error);
        }
    }

    async addReview(req: Request, res: Response) {
        try {
            const bookId = req.params.id;

            if (!bookId || bookId.trim() === '') {
                return res.status(400).json({ message: "Book ID es requerido" });
            }

            
            const book = await bookService.findByBookId(bookId);
            if (!book) {
                return res.status(404).json({ message: "Libro no encontrado" });
            }

            
            const userId = (req as any).user?.id;
            if (!userId) {
                return res.status(401).json({ message: "Usuario no autenticado" });
            }

            const { description } = req.body;
            if (!description || description.trim() === '') {
                return res.status(400).json({ message: "Descripción es requerida" });
            }

            const reviewData: Review = {
                userId,
                bookId,
                description: description.trim()
            };

            const newReview = await reviewService.create(reviewData);

            if ('message' in newReview) {
                return res.status(500).json(newReview);
            }

            return res.status(201).json({
                message: "Review creada exitosamente",
                review: newReview
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error interno del servidor" });
        }
    }

}

export const bookController = new BookController();