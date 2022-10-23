import { generateAccessToken } from './../helpers/generateToken';
import { IUserLogin } from './../interfaces/user.interface';
import User from '../models/user.model';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { IUserRegister } from '../interfaces/user.interface';
import { validationRegister, validationLogin } from '../helpers/validateUser';
import dotenv from 'dotenv';
dotenv.config();
class authController {
    static async register(req: Request, res: Response) {
        const { username, email, password }: IUserRegister = req.body;
        if (!username) {
            return res.status(400).json({
                error: 'Username is required',
            });
        }
        if (!email) {
            return res.status(400).json({
                error: 'Email is required',
            });
        }
        if (!password) {
            return res.status(400).json({
                error: 'Password is required',
            });
        }
        const { error } = validationRegister({ username, email, password });
        if (error) {
            return res
                .status(400)
                .json({ message: 'Invalid username or email or password!' });
        }
        try {
            const user = await User.findOne({ where: { email } });
            if (user) {
                return res
                    .status(400)
                    .json({ message: 'Email is already in used' });
            }
            const salt = await bcrypt.genSalt(+process.env.SALT);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            // await User.sync();
            const newUser = await User.create({
                username,
                email,
                password: hashedPassword,
            });
            return res.status(201).json(newUser);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: error.message });
        }
    }
    static async login(req: Request, res: Response) {
        const { email, password }: IUserLogin = req.body;
        if (!email) {
            return res.status(400).json({
                error: 'Email is required',
            });
        }
        if (!password) {
            return res.status(400).json({
                error: 'Password is required',
            });
        }
        const { error } = validationLogin({ email, password });
        if (error) {
            return res
                .status(400)
                .json({ message: 'Invalid username or email or password!' });
        }
        try {
            const user: any = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            const isValidPassword = await bcrypt.compare(
                req.body.password,
                user['password'],
            );
            if (!isValidPassword) {
                return res.status(401).json({ message: 'Invalid password' });
            }
            const { password, ...info } = user?.dataValues;
            const accessToken = generateAccessToken(info);
            return res.status(200).json({ ...info, accessToken });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: error.message });
        }
    }
    static async getUsers(req: Request, res: Response) {
        // await User.sync();
        try {
            const users = await User.findAll();
            return res.status(200).json(users);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: error.message });
        }
    }
}

export default authController;
