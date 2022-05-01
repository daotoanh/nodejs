const Sequelize = require('sequelize')

const sequelize = new Sequelize('node-complete', 'root', 'lokebeoli', {
    dialect: 'mysql',
    host: 'localhost'
})

module.exports = sequelize