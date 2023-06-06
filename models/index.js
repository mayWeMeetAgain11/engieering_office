'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};
const databases = Object.keys(config.databases)

// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(config.database, config.username, config.password, config);
// }
for (let index = 0; index < databases.length; index++) {
  let database = databases[index];
  let dbPath = config.databases[database];
  db[database] = new Sequelize(dbPath.database, dbPath.username, dbPath.password, dbPath)
}



fs
  .readdirSync(__dirname + '/database1')
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = db.Database1.import(path.join(__dirname + '/database1', file));
    db[model.name] = model;
  });


fs
  .readdirSync(__dirname + '/database2')
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = db.Database2.import(path.join(__dirname + '/database2', file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
