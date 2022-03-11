import Client from '../config/database';
import { Jwt } from 'jsonwebtoken';
import { resolve } from 'path/posix';
import bcrypt from 'bcrypt';
import { userData } from './user';

// creating the interface of the products
export interface productsClass {
    id?: number;
    name?: string;
    price?: number;
}

// creating the products class
export class productsData {
    // the index module
    async indexProduct(): Promise<productsClass[]> {
        try {
            const connect = await Client.connect();
            const sql = 'SELECT * FROM products';
            const result = await connect.query(sql);
            const allproducts: productsClass[] = result.rows;
            connect.release();
            return allproducts;
        } catch (err) {
            throw new Error(`${err}`);
        }
    }
    // showing products with specific id
    async showProduct(id: string | number): Promise<productsClass | string> {
        try {
            const connect = await Client.connect();
            const sql = 'SELECT * FROM products WHERE id=($1)';
            const result = await connect.query(sql, [id]);
            const product: productsClass = result.rows[0];
            connect.release();
            return product;
        } catch (err) {
            throw new Error(`${err}`);
        }
    }
    // now the create methode
    async create(product: productsClass): Promise<productsClass | string> {
        try {
            const connect = await Client.connect();
            const sql =
                'INSERT INTO products (name, price) VALUES($1,$2) RETURNING *';
            const result = await connect.query(sql, [
                product.name,
                product.price,
            ]);
            const newProduct = result.rows[0];
            connect.release();
            return newProduct;
        } catch (err) {
            throw new Error(`${err}`);
        }
    }
    // the delete module
    async delete(id: string): Promise<productsClass> {
        try {
            const connect = await Client.connect();
            const sql = 'DELETE FROM products WHERE id=($1) RETURNING name';
            const result = await connect.query(sql, [id]);
            const newDelete = result.rows[0];
            connect.release();
            return newDelete;
        } catch (err) {
            throw new Error(`${err}`);
        }
    }
}
