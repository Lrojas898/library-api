
import { UserDocument, UserInput, userModel } from "../models/user.model";

class UserService {

    async getAll(): Promise<UserDocument[]> {
        try {
            const response: UserDocument[] = await userModel.find()
            return response
        } catch (error) {
            throw error
        }
    }
    async create(newUser: UserDocument) {
        
        try {
            const doesUserExists: UserDocument | null = await this.findByUserId(newUser.userId);
            if (doesUserExists) return { message: `User ${newUser.userId} already exist.` }
            const createNewUser: UserDocument = await userModel.create(newUser);
            return createNewUser;
        } catch (error) {
            throw error;
        }
    }

    async findById(id: string) {
        try {
            const users = await userModel.findById(id);
            return users;
        } catch (error) {
            throw error;
        }
    }

    async findByUserId(userId: string) {
        try {
            const users = await userModel.findOne({ userId });
            return users;
        } catch (error) {
            throw error;
        }
    }

    async updateUser(id: string, inputUser: UserInput) {

        try {

            const updateUser: UserDocument | null = await userModel.findOneAndUpdate({ userId: id }, inputUser, { returnOriginal: false });
            if (updateUser) updateUser.password = "";
            return updateUser;

        } catch (error) {

            throw error;

        }


    }

    async deleteById(id: string): Promise<boolean> {
        try {

            const isDeleted = await userModel.findOneAndDelete({ userId: id })

            return isDeleted !== null;

        } catch (error) {

            throw error;

        }
    }

}
export const userService = new UserService();