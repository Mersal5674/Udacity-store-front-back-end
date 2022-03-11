import express, { Application } from 'express';
import { index, create, show, reset } from '../handlers/products';
import { validation } from '../middlewares/userCheck';

// products route
export const productRoute = (app: express.Application) => {
    app.get('/allproducts', index);
    app.post('/newproduct', validation, create);
    app.get('/product/:id', show);
    app.delete('/deleteproduct/:id', validation, reset);
};
