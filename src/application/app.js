//const express = require('express')
import express from 'express'
//import { express } from 'express'
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
const app = express()
const port = 3000

import { fileURLToPath } from 'url';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Restaurant API',
      version: '1.0.0',
      description: 'Restaurant API',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: [path.resolve(__dirname, './routes/*.js')], 
};



const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());


import { Initialize } from './ioc/ioc.js'
Initialize()

import { CustomerController } from './controllers/customer.controller.js'
CustomerController(app)


import { MenuController } from './controllers/menu.controller.js'
MenuController(app)


import { OrderController } from './controllers/order.controller.js'
OrderController(app)
/*

app.get('/', (req, res) => {
  res.send('Hello World!')
})

*/
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


