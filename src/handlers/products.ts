import { Request, Response } from 'express';
import dotenv from 'dotenv';
import { productsData, productsClass } from '../models/product';
import { Jwt } from 'jsonwebtoken';

// using the dotenv for when I shall gonna need it
dotenv.config();
// use productsData we imported
const newProduct = new productsData();

// building the handlers
// index handler
export const index = async (req: Request, res: Response) => {
    try {
        const newIndex = await newProduct.indexProduct();
        res.json({ newIndex, message: `Products retreved successfully!` });
        // console.log(newIndex)
    } catch (err) {
        console.log(err);
        res.status(400).send('Error!! try again!');
    }
};
// the show handler
export const show = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const targetProduct = await newProduct.showProduct(req.params.id);
        console.log(id);
        res.json({
            targetProduct,
            message: 'selected product retreved successfully!',
        });
    } catch (err) {
        res.status(400).send('Error!! try again!');
    }
};
// the create handler
export const create = async (req: Request, res: Response) => {
    try {
        const createdProduct = await newProduct.create(req.body);
        res.json({
            message: `New product: '${req.body.name}' created successfully`,
            createdProduct,
        });
    } catch (err) {
        res.status(400).send('Error!! try again!');
    }
};
// the delete handler
export const reset = async (req: Request, res: Response) => {
    try {
        const delted_Product_info = await newProduct.delete(req.params.id);
        res.json({ message: 'Product Deleted', delted_Product_info });
    } catch (err) {
        res.status(400).send('Error!! try again!');
    }
};
