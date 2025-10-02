import mongoose from "mongoose";

export type UserRole = 'admin' | "student";

export interface UserInput {
    userId: string;
    name: string;
    password: string;
    role: UserRole;
}

export interface UserDocument extends UserInput, mongoose.Document {}

const UserSchema = new mongoose.Schema({
    userId: {type: String, required: true},
    name: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, required: true}
}, {collection: "Users"});

export const userModel = mongoose.model<UserDocument>("User", UserSchema);



