import express, { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

interface Error {
    name?: string;
    stack?: string;
    message?: string;
    status?: number;
}
// erro handling function
const errorHandler = (next: NextFunction) => {
    const error: Error = new Error('Please try again!');
    error.status = 401;
    next(error);
};
export const validation = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const authHeader = req.get('Authorization');
        if (authHeader) {
            // check if the get token a bearer or not
            const bearer = authHeader.split(' ')[0].toLowerCase();
            const token = authHeader.split(' ')[1];
            if (token && bearer === 'bearer') {
                const decode = jwt.verify(
                    token,
                    process.env.SECRET_TOKEN as string
                );
                if (decode) {
                    next();
                } else {
                    // failed to authenticate user
                    errorHandler(next);
                }
            } else {
                // no token
                errorHandler(next);
            }
        } else {
            // no token were provided
            errorHandler(next);
        }
    } catch (err) {
        errorHandler(next);
    }
};
