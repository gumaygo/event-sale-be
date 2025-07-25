import { Request, Response, NextFunction } from "express";
import { getUserFromToken, IUserToken } from "../utils/jwt.ts";





export interface IRequest extends Request {
    user?: IUserToken;
}

export default (req: IRequest, res: Response, next: NextFunction) => {
    const authorization = req.headers?.authorization
    if (!authorization) {
        return res.status(401).json({
            message: "Unauthorized",
            data: null,
        });
    }
    const [prefix, accessToken] = authorization.split(" ");

    if (!(prefix === "Bearer" && accessToken)) {
        return res.status(401).json({
            message: "Invalid token",
            data: null,
        });
    }

    const user = getUserFromToken(accessToken);
    if (!user) {
        return res.status(401).json({
            message: "Unauthorized",
            data: null,
        });
    }

    (req as IRequest).user = user;
    next();
}