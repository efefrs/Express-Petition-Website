const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database/petitiondb.sqlite'
 })

module.exports = sequelize