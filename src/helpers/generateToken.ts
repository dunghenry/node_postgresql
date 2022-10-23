import { IToken } from './../interfaces/token.interface';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
export const generateAccessToken = (user: IToken): string => {
    return jwt.sign(
        { id: user.id, isAdmin: user.isAdmin, email: user.email },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: '5h',
        },
    );
};
export const generateRefreshToken = (user: IToken): string => {
    return jwt.sign(
        { id: user.id, isAdmin: user.isAdmin, email: user.email },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: '5h',
        },
    );
};
