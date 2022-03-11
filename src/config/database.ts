import dotenv from 'dotenv';
import { Pool } from 'pg';

// use dotenv
dotenv.config();
// const what we are gonna use to insert data
const { POSTGRES_DB, POSTGRES_DB_TEST, POSTGRES_USER, ENV, POSTGRES_PORT, POSTGRES_PASSWORD } = process.env;

let Client: Pool;
if (ENV === 'test') {
    Client = new Pool({
        port: POSTGRES_PORT as unknown as number,
        database: POSTGRES_DB_TEST,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD
    });
} else {
    Client = new Pool({
        port: POSTGRES_PORT as unknown as number,
        database: POSTGRES_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD
    });
}

export default Client;
