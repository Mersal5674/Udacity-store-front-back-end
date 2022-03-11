"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var pg_1 = require("pg");
// use dotenv
dotenv_1.default.config();
// const what we are gonna use to insert data
var _a = process.env, POSTGRES_DB = _a.POSTGRES_DB, POSTGRES_DB_TEST = _a.POSTGRES_DB_TEST, POSTGRES_USER = _a.POSTGRES_USER, ENV = _a.ENV, POSTGRES_PORT = _a.POSTGRES_PORT, POSTGRES_PASSWORD = _a.POSTGRES_PASSWORD;
var Client;
if (ENV === 'test') {
    Client = new pg_1.Pool({
        port: POSTGRES_PORT,
        database: POSTGRES_DB_TEST,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD
    });
}
else {
    Client = new pg_1.Pool({
        port: POSTGRES_PORT,
        database: POSTGRES_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD
    });
}
exports.default = Client;
