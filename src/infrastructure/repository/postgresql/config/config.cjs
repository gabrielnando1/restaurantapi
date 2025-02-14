/*
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);  
const __dirname = path.dirname(__filename); 


const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env';
//require('dotenv').config({ path: `../../../application/${envFile}` });
import dotenv from 'dotenv';

dotenv.config({ path: `../../../application/${envFile}` });
//dotenv.config({ path: path.resolve(process.cwd(), `./src/application/${envFile}`)});

export const configData = {
  
    development: {
        username: process.env.DB_USER,
        password: process.env.DB_PWD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: process.env.DB_DIALECT,
        logging: true
    },
    test: {
        username: process.env.DB_USER,
        password: process.env.DB_PWD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: process.env.DB_DIALECT,
        logging: true
    },
    production: {
        username: process.env.DB_USER,
        password: process.env.DB_PWD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: process.env.DB_DIALECT
    }
};

*/
const path = require('path');
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env';
let envPath = ''
if (process.cwd().indexOf(path.join('infrastructure', 'repository', 'postgres')) != -1){
    envPath = `../../../application/${envFile}`;
} else 
{
    envPath = path.resolve(process.cwd(), `./src/application/${envFile}`);
}
require('dotenv').config({ path: envPath });
//require('dotenv').config({ path: `../../../application/${envFile}` });
module.exports = {
  
    development: {
        username: process.env.DB_USER,
        password: process.env.DB_PWD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: process.env.DB_DIALECT,
        logging: true
    },
    test: {
        username: process.env.DB_USER,
        password: process.env.DB_PWD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: process.env.DB_DIALECT,
        logging: true
    },
    production: {
        username: process.env.DB_USER,
        password: process.env.DB_PWD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: process.env.DB_DIALECT
    }
};
