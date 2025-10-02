import Router = require("express");
import { auth, authorizeRoles } from "../src/middelware/auth.middelware";
import { bookController } from "../src/controller/books.controller";

export const bookRouter = Router();

bookRouter.post("/create", bookController.create)
bookRouter.get('/', bookController.getAllBooks);
bookRouter.get('/getById/:id', bookController.getById);
bookRouter.put('/:id',auth, authorizeRoles(['admin']), bookController.updateById);
bookRouter.delete('/:id',auth, authorizeRoles(['admin']), bookController.deleteById);
bookRouter.post('/:id/review', auth, bookController.addReview);



