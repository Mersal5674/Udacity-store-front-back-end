import { connect } from 'http2';
import Client from '../config/database';
import bcrypt, { hash } from 'bcrypt';
import { saltRounds } from '../config/hashing';
import { release } from 'os';
import { resolve } from 'path/posix';
import { isSharedArrayBuffer } from 'util/types';
import jwt from 'jsonwebtoken';
import { token } from 'morgan';

// giving types to the elemnts of the user database we created
export interface userClass {
    email?: string;
    id: string | number;
    first_name?: string;
    last_name?: string;
    password: string;
    tokens?: string;
}

// now creating the class that we shall write the CRUD in it
export class userData {
    // getting a list of all items we have in database
    async indexUsers(): Promise<userClass[]> {
        try {
            const connect = await Client.connect();
            const sql = 'SELECT * FROM users';
            const result = await connect.query(sql);
            const user: userClass[] = result.rows;
            connect.release();
            return user;
        } catch (err) {
            throw new Error(`${err}`);
        }
    }
    // the show method
    async showUser(id: string | number): Promise<userClass | string> {
        try {
            const connect = await Client.connect();
            const sql = 'SELECT * FROM users WHERE id=($1)';
            const result = await connect.query(sql, [id]);
            const newId: userClass = result.rows[0];
            connect.release();
            return newId;
        } catch (err) {
            throw new Error(`${err}`);
        }
    }
    // writing the create fun for hashing the password
    async createUser(user: userClass): Promise<userClass | string> {
        try {
            // connecting to the database we wrote
            const connect = await Client.connect();
            const sql =
                'INSERT INTO users (first_name, last_name, email, password) VALUES($1,$2,$3,$4) RETURNING *';
            const salt = await bcrypt.genSalt(10);
            const hashedPass = await bcrypt.hash(user.password, salt);
            const allresult = await connect.query(sql, [
                user.first_name,
                user.last_name,
                user.email,
                hashedPass,
            ]);
            const newInfo = allresult.rows[0];
            connect.release();
            return newInfo;
        } catch (err) {
            console.log(err);
            throw new Error(`${err}`);
        }
    }
    // create the authentication method
    async authenticateUser(email: string): Promise<userClass | string> {
        try {
            const connect = await Client.connect();
            const sql = 'SELECT email FROM users WHERE email=($1)';
            const result = await connect.query(sql, [email]);
            if (result.rows.length) {
                const newInfo = result.rows[0];
                const isEmail = bcrypt.compareSync(`${email}`, newInfo.email);
                if (!isEmail) {
                    return newInfo;
                }
            }
            connect.release();
            return 'Email does not exsit!';
        } catch (err) {
            console.log(err);
            throw new Error(`${err}`);
        }
    }
    // add the delete model
    async delete(id: string): Promise<userClass> {
        try {
            const connect = await Client.connect();
            const sql = `DELETE FROM users WHERE id=($1) RETURNING first_name, last_name`;
            const result = await connect.query(sql, [id]);
            connect.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`${err}`);
        }
    }
}
