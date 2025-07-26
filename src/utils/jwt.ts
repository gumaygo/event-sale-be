import jwt from "jsonwebtoken";
import { SECRET } from "./env";
import { User } from "../models/user.model";
import { Types } from "mongoose";

export interface IUserToken extends Omit<
    User, "password"
    | "activationCode"
    | "isActive"
    | "email"
    | "fullName"
    | "username"
    | "profilePicture"
> {
   id? : Types.ObjectId;
}


export const generateToken = (user: IUserToken) => {
   const token = jwt.sign(user, SECRET, { expiresIn: "1h" });
   return token;
}

export const getUserFromToken = (token: string) => {
    const user = jwt.verify(token, SECRET) as IUserToken;
    return user;
}
