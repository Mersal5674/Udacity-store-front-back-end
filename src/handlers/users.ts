import { hash } from 'bcrypt';
import { Request, Response } from 'express';
import { userClass, userData } from '../models/user';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { isWeakMap } from 'util/types';
import bcrypt from 'bcrypt';

// use dotenv
dotenv.config();

const newUser = new userData();
// adding the express handler function
export const index = async (req: Request, res: Response) => {
    try {
        const allUsers = await newUser.indexUsers();
        res.json({ allUsers, message: 'Users retreved successfully!' });
        //    console.log(allUsers)
    } catch (err) {
        res.status(400).send('Error!! try again!');
    }
};
// add the show handler
export const show = async (req: Request, res: Response) => {
    try {
        const specificUser = await newUser.showUser(req.params.id);
        res.json(specificUser);
    } catch (err) {
        res.status(400).send('Error!! try again!');
    }
};
// add the create handler
export const create = async (req: Request, res: Response) => {
    try {
        const createdUser = await newUser.createUser(req.body);
        res.json({
            message: `New user: '${req.body.first_name}' created successfully`,
            createdUser,
        });
    } catch (err) {
        console.log(err);
        res.status(400).send('Error!! try again!');
    }
};
// add the authentication handler
export const authenticate = async (req: Request, res: Response) => {
    try {
        const result = await newUser.authenticateUser(req.body.email);
        if (result != 'Email does not exsit!') {
            const token = jwt.sign(
                { user: result },
                process.env.SECRET_TOKEN as string
            );
            res.json({
                message: `User 'does exist' and 'authenticated successfully!'`,
                Saved_Info: result,
                token,
            });
        } else {
            res.json(result);
        }
    } catch (err) {
        console.log(err);
        res.status(401);
        res.send('Error!! try again!');
    }
};
// add the delete handler
export const reset = async (req: Request, res: Response) => {
    try {
        const deleted_user_info = await newUser.delete(req.params.id);
        console.log(deleted_user_info);
        res.json({ message: 'User Deleted', deleted_user_info });
    } catch (err) {
        res.status(400).send('Error!! try again!');
    }
};
