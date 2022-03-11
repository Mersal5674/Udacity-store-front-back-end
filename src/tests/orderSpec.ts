import Client from '../config/database';
import { orderData, orderClass } from '../models/order';
import bcrypt from 'bcrypt';
import { saltRounds } from '../config/hashing';
import { doesNotThrow } from 'assert';
import exp from 'constants';
import app from '../server';
import jwt from 'jsonwebtoken'
import supertest from 'supertest';
import { userData, userClass } from '../models/user';

const newUser = new userData();
const request = supertest(app);
const newOrder = new orderData();
let permession: string, token: userClass;

describe('My orders CRUD', () => {
    // test the existance of the all CRUD methodes
    it('It should have an index method', () => {
        expect(newOrder.index).toBeDefined;
    });
    it('It should have an show method', () => {
        expect(newOrder.show).toBeDefined;
    });
    it('It should have an create method', () => {
        expect(newOrder.create).toBeDefined;
    });

    it('It should have delete method', () => {
        expect(newOrder.delete).toBeDefined;
    });

    it('It should have cart', () => {
        expect(newOrder.cart).toBeDefined;
    });
});
// now the functionality
describe('My orders CRUD functionality', async () => {
    it('create product model', async () => {
        const product = {
            status: 'jo'
        } as orderClass;
        const create = (await newOrder.create(product)) as orderClass;
        expect(create.id).not.toEqual(0);
    });
    it('Index product model', async () => {
        const result = await newOrder.index();
        expect(result.length).toBeGreaterThan(0);
    });
    // cart
    it('create product model', async () => {
        const product = {
            quantity: 10,
            orderId: '',
            productId: '',
        } as orderClass;
        const create = (await newOrder.create(product)) as orderClass;
        expect(create.id).not.toEqual(0);
    });
});
// test the end points
describe('Test endpoint responses', async () => {
    const user = {
        first_name: 'test',
        last_name: 'user',
        email: 'testuser@gmail.com',
        password: '$2b$10$QnUSFE9l8aklrtqZcCa1KO1Nf.R6Jyr7lxRW7zejOqJAL.cV7/zyO'
    } as userClass;

    it('Index Order the api endpoint', async() => {
        token = await newUser.createUser(user) as userClass;
        permession = jwt.sign({token}, process.env.SECRET_TOKEN as string);
        const response = await request
        .get('/allorders')
        .set('Authorization', `Bearer ${permession}`);
        expect(response.status).toBe(200); 
    });
    it('Show Order the api endpoint', async() => {
        token = await newUser.createUser(user) as userClass;
        permession = jwt.sign({token}, process.env.SECRET_TOKEN as string);
        const response = await request
        .get('/order/1')
        .set('Authorization', `Bearer ${permession}`);
        expect(response.status).toBe(200); 
    });
    it('Create Order the api endpoint', async() => {
        token = await newUser.createUser(user) as userClass;
        permession = jwt.sign({token}, process.env.SECRET_TOKEN as string);
        const user_id = token.id
        const response = await request
        .post('/neworder')
        .send({
            status:"To buy",
            user_id:`${user_id}`
        })
        .set('Authorization', `Bearer ${permession}`);
        expect(response.status).toBe(200); 
    });
    it('Cart Order the api endpoint', async() => {
        token = await newUser.createUser(user) as userClass;
        permession = jwt.sign({token}, process.env.SECRET_TOKEN as string);
        const response = await request
        .get('/cart')
        .set('Authorization', `Bearer ${permession}`);
        expect(response.status).toBe(200); 
    });
});
