import express, { Application } from 'express';
import { validation } from '../middlewares/userCheck';
import {
    index,
    create,
    show,
    reset,
    addProduct,
    cart,
} from '../handlers/orders';

// using the express and building the route
export const orderRoutes = (app: express.Application) => {
    app.get('/allorders', validation, index);
    app.get('/order/:id', validation, show);
    app.post('/neworder', validation, create);
    app.delete('/deleteorder/:id', validation, reset);
    app.post('/neworder/:id/product', validation, addProduct);
    app.get('/cart', validation, cart);
};
