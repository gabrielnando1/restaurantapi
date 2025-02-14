'use strict';
/*
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const { fileURLToPath } = require('url');
*/
import fs from 'fs';
import path from 'path';
import { Sequelize } from 'sequelize';
import process from 'process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);  
const __dirname = path.dirname(__filename); 

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';

//const config = require('../config/config.js')[env];

//import { configData }  from '../config/config.cjs';
const configModule = await import('../config/config.cjs');
const config = configModule.default[env];

//const config = configData[env];

export const db = {};

export var sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    //const __filename = fileURLToPath(import.meta.url);
    //const __dirname = path.dirname(__filename);

    import(`file://${path.join(__dirname, file)}`)
    .then((module) => {
      const model = new module.default(sequelize, Sequelize.DataTypes);
      db[model.name] = model;
    })
    .catch((err) => console.error('Erro ao importar módulo:', err));

    

    //const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    //db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;

db.Sequelize = Sequelize;

//module.exports = db;
