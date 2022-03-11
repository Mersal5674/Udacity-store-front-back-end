import express, { Application } from 'express';
import { index, create, show, reset, authenticate } from '../handlers/users';
import { validation } from '../middlewares/userCheck';

// index route
export const newUserRoute = (app: express.Application) => {
    app.get('/allusers', validation, index);
    app.post('/authenticate', authenticate);
    app.get('/user/:id', validation, show);
    app.post('/newuser', create);
    app.delete('/deleteuser/:id', validation, reset);
};
