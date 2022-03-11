import Client from '../config/database';
import { userClass, userData } from '../models/user';
import bcrypt from 'bcrypt';
import { saltRounds } from '../config/hashing';
import { doesNotThrow } from 'assert';
import exp from 'constants';
import { productsClass } from '../models/product';
import supertest from 'supertest';
import { newUserRoute } from '../routes/user';
import app from '../server';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()
const newUser = new userData();
const request = supertest(app);
let token: string;

describe('My users CRUD', () => {
    // test the existance of the all CRUD methodes
    it('It should have an index method', () => {
        expect(newUser.indexUsers).toBeDefined;
    });
    it('It should have an show method', () => {
        expect(newUser.showUser).toBeDefined;
    });
    it('It should have an create method', () => {
        expect(newUser.createUser).toBeDefined;
    });

    it('It should have authentication method', () => {
        expect(newUser.authenticateUser).toBeDefined;
    });
    it('It should have delete method', () => {
        expect(newUser.delete).toBeDefined;
    });
});
// now the functionality
describe('My users CRUD functionality', async () => {
    it('Create to work fine', async () => {
        const user = {
            first_name: 'test',
            last_name: 'user',
            email: 'testuser@gmail.com',
            password: 'test123',
        } as userClass;
        const result = (await newUser.createUser(user)) as productsClass;
        expect(result.id).not.toEqual(0);
    });
    // index model
    it('Index to work fine', async () => {
        const result = await newUser.indexUsers();
        expect(result.length).toBeGreaterThan(0);
    });
    // auth model
    it('Authenticate to work fine', async () => {
        const email = 'testuser@gmail.com';
        // make casting using // as userClass
        const result = (await newUser.authenticateUser(email)) as userClass;
        expect(result.email).toBe('testuser@gmail.com');
    });
});
// test the end points
describe('Test endpoint responses', () => {

    it('Create User the api endpoint', async () => {
        const response = await request
        .post('/newuser')
        .send({
            first_name: 'test',
            last_name: 'user',
            email: 'testuser@gmail.com',
            password: 'test123'
        });
        expect(response.status).toBe(200);
    });
    it('Authenticate User the api endpoint', async () => {
        const response = await request
        .post('/authenticate')
        .send({
            email: 'testuser@gmail.com',
        });
        expect(response.status).toBe(200);
    });
    it('Index User the api endpoint', async() => {
        const user = {
            first_name: 'test',
            last_name: 'user',
            email: 'testuser@gmail.com',
            password: '$2b$10$QnUSFE9l8aklrtqZcCa1KO1Nf.R6Jyr7lxRW7zejOqJAL.cV7/zyO'
        } as userClass;
        token = jwt.sign({user}, process.env.SECRET_TOKEN as string)  
        const response = await request
        .get('/allusers')
        .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200); 
        console.log(token)
    });
    it('Show User the api endpoint', async() => {
        const response = await request
        .get(`/user/1`)
        .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200); 
    });
});