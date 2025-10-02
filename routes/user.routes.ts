import Router = require("express");
import { userController } from "../src/controller/user.controller";
import { auth, authorizeRoles } from "../src/middelware/auth.middelware";

export const userRouter = Router();

userRouter.post("/create", userController.create)
userRouter.get('/', userController.getAll);
userRouter.post('/getById', userController.getById);
userRouter.get('/getById/:id', userController.getById);
userRouter.post('/login', userController.login);
userRouter.delete('/delete/:id', auth, authorizeRoles(['admin']), userController.delete);


