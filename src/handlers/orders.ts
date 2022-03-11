import { Request, Response } from 'express';
import dotenv from 'dotenv';
import { orderData, orderClass } from '../models/order';

// env config just incase
dotenv.config();
// const a variable to handle incoming orderdata
const newOrder = new orderData();

// index handler
export const index = async (req: Request, res: Response) => {
    try {
        const allOrders = await newOrder.index();
        res.json({ allOrders, message: 'all Order retreved successfully!' });
    } catch (error) {
        console.log(error);
        res.status(400).send('Error!! try again!');
    }
};
// show order with specific id handler
export const show = async (req: Request, res: Response) => {
    try {
        const targetOrder = await newOrder.show(req.params.id);
        res.json({
            targetOrder,
            message: 'selected Order retreved successfully!',
        });
    } catch (error) {
        console.log(error);
        res.status(400).send('Error!! try again!');
    }
};
// create handler
export const create = async (req: Request, res: Response) => {
    try {
        const createdOrder = await newOrder.create(req.body);
        res.json({ message: `New Order created successfully!`, createdOrder });
    } catch (error) {
        console.log(error);
        res.status(400).send('Error!! try again!');
    }
};
// delete handler
export const reset = async (req: Request, res: Response) => {
    try {
        const deleted_order_info = await newOrder.delete(req.params.id);
        res.json({ message: 'Order Deleted!', deleted_order_info });
    } catch (error) {
        res.status(400).send('Error!! try again!');
    }
};
// add product
export const addProduct = async (req: Request, res: Response) => {
    const order_id: string = req.params.id;
    const product_id: string = req.body.product_id;
    const quantity: number = parseInt(req.body.quantity);

    try {
        const addedProduct = await newOrder.addProduct(
            quantity,
            order_id,
            product_id
        );
        res.json(addedProduct);
    } catch (err) {
        console.log(err);
        res.status(400);
        res.json(err);
    }
};
// index handler
export const cart = async (req: Request, res: Response) => {
    try {
        const allOrders = await newOrder.cart();
        res.json({ allOrders, message: 'Cart retreved successfully!' });
    } catch (error) {
        console.log(error);
        res.status(400).send('Error!! try again!');
    }
};
