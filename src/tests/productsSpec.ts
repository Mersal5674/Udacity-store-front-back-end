import Client from '../config/database';
import { productsData, productsClass } from '../models/product';
import bcrypt from 'bcrypt';
import { saltRounds } from '../config/hashing';
import { doesNotThrow } from 'assert';
import { authenticate } from '../handlers/users';
import exp from 'constants';
import app from '../server';
import jwt from 'jsonwebtoken'
import supertest from 'supertest';
import { userClass, userData } from '../models/user';

const newUser = new userData();
const request = supertest(app);
const newProduct = new productsData();
let permession:string, token:userClass;

describe('My Products CRUD', () => {
    // test the existance of the all CRUD methodes
    it('It should have an index method', () => {
        expect(newProduct.indexProduct).toBeDefined;
    });
    it('It should have an show method', () => {
        expect(newProduct.showProduct).toBeDefined;
    });
    it('It should have an create method', () => {
        expect(newProduct.create).toBeDefined;
    });

    it('It should have delete method', () => {
        expect(newProduct.delete).toBeDefined;
    });
});
// now the functionality
describe('My Products CRUD functionality', async () => {
    it('create product model', async () => {
        const product = {
            name: 'jo',
            price: 200,
        } as productsClass;
        const create = (await newProduct.create(product)) as productsClass;
        expect(create.id).not.toEqual(0);
    });
    it('Index product model', async () => {
        const result = await newProduct.indexProduct();
        expect(result.length).toBeGreaterThan(0);
    });
});
// test the end points
describe('Test endpoint responses', () => {
    const user = {
        first_name: 'test',
        last_name: 'user',
        email: 'testuser@gmail.com',
        password: '$2b$10$QnUSFE9l8aklrtqZcCa1KO1Nf.R6Jyr7lxRW7zejOqJAL.cV7/zyO'
    } as userClass;

    it('Index Products the api endpoint', async() => {
        const response = await request
        .get('/allproducts')
        expect(response.status).toBe(200); 
    });
    it('Create Product the api endpoint', async () => {
        token = await newUser.createUser(user) as userClass;
        permession = jwt.sign({token}, process.env.SECRET_TOKEN as string);
        const response = await request
        .post('/newproduct')
        .send({
            name:"test",
            price:"1"
        })
        .set('Authorization', `Bearer ${permession}`);
        expect(response.status).toBe(200); 
    })
    it('Show Products the api endpoint', async() => {
        const response = await request
        .get('/product/1')
        expect(response.status).toBe(200); 
    });
    it('Delete Product the api endpoint', async () => {
        token = await newUser.createUser(user) as userClass;
        permession = jwt.sign({token}, process.env.SECRET_TOKEN as string);
        const response = await request
        .delete('/deleteproduct/1')
        .set('Authorization', `Bearer ${permession}`);
        expect(response.status).toBe(200); 
    })
});
