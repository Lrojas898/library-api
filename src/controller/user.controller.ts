
import { Request, Response } from "express";
import { userService } from "../services/user.service";
import { UserDocument, UserInput } from "../models/user.model";
import { securityService } from "../services/securityService.service";

class UserController {
    async create(req: Request, res: Response) {

        try {
            req.body.password = await securityService.encryptPassword(req.body.password);

            const inputData = req.body;
            const newUser = {

                ...inputData
            }

            const user = await userService.create(newUser);
            res.json(user);

        } catch (error) {

            res.json(error);

        }

    }

    async getAll(req: Request, res: Response) {
        try {
            const data = await userService.getAll()

            res.json(data)
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error interno del servidor" });
        }
    }
    async getById(req: Request, res: Response) {
        try {
            const user_id = req.params.id;

            if (!user_id || user_id.trim() === '') {
                return res.status(400).json({ message: "ID es requerido" });
            }

            //Tener cuidado de no confundir con 
            const user: UserDocument | null = await userService.findById(user_id);

            if (!user) {
                return res.status(404).json({ message: "Usuario no encontrado" });
            }

            return res.status(200).json(user);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error interno del servidor" });
        }
    }

    async login(req: Request, res: Response) {
        try{
            const existUser: UserDocument | null = await userService.findByUserId(req.body.userId);

            if(!existUser) {
                return res.status(400).json({message: `User ${req.body.userId} doesn't exist`});
            }

            const currentPassword = existUser.password;
            if(currentPassword){
                const isMatch = await securityService.comparePassword(req.body.password, existUser.password);
                if(!isMatch) {
                    return res.status(403).json({message: `Password or email incorrect`});
                }
                const token = await securityService.generateToken(existUser.id, existUser.role)
                return res.status(200).json({
                    message: "Login successful",
                    token
                })
            }
        }catch(error){
            console.error(error);
            return res.status(500).json({
                message: "User or password incorrect"
            })
        }
    }



    async update(req: Request, res: Response){

        try {

            const id = req.params.id;
            if (!id || id.trim() === '') {
                return res.status(400).json({ message: "ID es requerido" });
            }
            const input: UserInput = req.body;
            const user: UserDocument | null = await userService.updateUser(id, input);
            if(user === null){
                return res.status(400).json({message: "User not found"});
            }

            return res.json(user);
            
        } catch (error) {

            res.json(error);
            
        }


    }

    async delete(req: Request, res: Response) {
        try {
            const user_id = req.params.id;

            if (!user_id || user_id.trim() === '') {
                return res.status(400).json({ message: "ID es requerido" });
            }

            const user: boolean = await userService.deleteById(user_id);

            if (!user) {
                return res.status(400).json({ message: `No se pudo borrar usuario con id ${user_id}` });
            }else {

                return res.status(200).json({message: `Se elimino correctamente el usuario`});
            }

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error interno del servidor" });
        }
    }








}


export const userController = new UserController();

