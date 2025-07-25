import { Request, Response } from "express";
import * as yup from "yup";
import UserModel from "../models/user.model.ts";
import { encrypt } from "../utils/encryption.ts";
import { generateToken } from "../utils/jwt.ts";
import { IRequest } from "../middlewares/auth.middleware.ts";
type TRegister = {
    fullName: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

type TLogin = {
    identifier: string;
    password: string;
}

const registerValidateSchema = yup.object().shape({
    fullName: yup.string().required("Full name is required"),
    username: yup.string().required("Username is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
    confirmPassword: yup.string().required("Confirm password is required").oneOf([yup.ref("password")], "Password and confirm password do not match"),
});



export default {
    async register(req: Request, res: Response) {

        const { fullName, username, email, password, confirmPassword } = req.body as unknown as TRegister;


        try {
            await registerValidateSchema.validate({ fullName, username, email, password, confirmPassword })

            const result = await UserModel.create({
                fullName,
                username,
                email,
                password
            });

            return res.status(200).json({
                message: "Register success",
                data: result
            });
        } catch (error) {
            const err = error as unknown as Error
            return res.status(400).json({
                message: "Invalid request",
                data: null,
                error: err.message
            });
        }


    },

    async login(req: Request, res: Response) {
        try {
            const { identifier, password } = req.body as unknown as TLogin;
            const userbyIdentifier = await UserModel.findOne({
                $or: [{ email: identifier }, { username: identifier }]
            });

            if (!userbyIdentifier) {
                return res.status(400).json({
                    message: "User not found",
                    data: null,
                    error: "User not found"
                });
            }

            const isPasswordValid = userbyIdentifier.password === encrypt(password);

            if (!isPasswordValid) {
                return res.status(400).json({
                    message: "Invalid password",
                    data: null,
                    error: "Invalid password"
                });
            }

            const token = generateToken({
                id: userbyIdentifier._id,
                role: userbyIdentifier.role
            });

            return res.status(200).json({
                message: "Login success",
                data: token
            });

        } catch (error) {
            console.log(error);
            const err = error as unknown as Error
            return res.status(400).json({
                message: "Invalid request",
                data: null,
                error: err.message
            });
        }
    },


    async me(req: IRequest, res: Response) {
        try {
           const user = req.user;
           const result = await UserModel.findById(user?.id);
           return res.status(200).json({
            message: "User info retrieved successfully",
            data: result
           });

        } catch (error) {
            console.log(error);
            const err = error as unknown as Error
            return res.status(400).json({
                message: "Invalid request",
                data: null,
                error: err.message
            });
        }
    }
};