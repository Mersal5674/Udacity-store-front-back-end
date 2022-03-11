import Client from '../config/database';
import jwt from 'jsonwebtoken';
import { ClientBase } from 'pg';

export interface orderClass {
    id?: string | number;
    status?: string;
    user_id?: string;
}

// writing the crud;
export class orderData {
    // writing index model
    async index(): Promise<orderClass[]> {
        try {
            // connect to tthe database
            const connect = await Client.connect();
            // write the sql order
            const sql = 'SELECT * FROM orders';
            // concat the sql with the reseved info
            const result = await connect.query(sql);
            // release connection
            connect.release();
            // return the value
            return result.rows;
        } catch (error) {
            // return error
            throw new Error(`${error}`);
        }
    }
    // writing show order with specific id model
    async show(id: string | number): Promise<orderClass> {
        try {
            const connect = await Client.connect();
            const sql = 'SELECT * FROM orders WHERE id=($1)';
            const result = await connect.query(sql, [id]);
            const info = result.rows[0];
            connect.release();
            console.log(info);
            return info;
        } catch (error) {
            throw new Error(`${error}`);
        }
    }
    // writing create order model
    async create(order: orderClass): Promise<orderClass> {
        try {
            const connect = await Client.connect();
            // used youser id should be the same as the aquired user_id in users table
            const sql =
                'INSERT INTO orders (status, user_id) VALUES($1,$2) RETURNING *';
            const result = await connect.query(sql, [
                order.status,
                order.user_id,
            ]);
            const newOrder = result.rows[0];
            connect.release();
            return newOrder;
        } catch (error) {
            console.log(error);
            throw new Error(`${error}`);
        }
    }
    // writing the deleteing model
    async delete(id: string): Promise<orderClass> {
        try {
            const connect = await Client.connect();
            const sql =
                'DELETE FROM orders WHERE id=($1) RETURNING status, email';
            const result = await connect.query(sql, [id]);
            const newDelete = result.rows[0];
            connect.release();
            return newDelete;
        } catch (error) {
            console.log(error);
            throw new Error(`${error}`);
        }
    }
    // creating cart
    async addProduct(
        quantity: number,
        orderId: string,
        productId: string
    ): Promise<orderClass> {
        try {
            const connect = await Client.connect();
            const sql =
                'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
            const result = await connect.query(sql, [
                quantity,
                orderId,
                productId,
            ]);
            const order = result.rows[0];
            connect.release();
            return order;
        } catch (err) {
            throw new Error(
                `Could not add product ${productId} to order ${orderId}: ${err}`
            );
        }
    }
    // user cart index
    async cart(): Promise<orderClass[]> {
        try {
            const connect = await Client.connect();
            const sql = 'SELECT * FROM order_products';
            const result = await connect.query(sql);
            return result.rows;
        } catch (error) {
            console.log(error);
            throw new Error(`${error}`);
        }
    }
}
