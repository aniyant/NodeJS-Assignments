// const mysql = require('mysql2');
const sqlite = require('sqlite3');
const { Sequelize } = require('sequelize');

// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'root',
//     database: 'your_database_name'
// });

const sequelize = new Sequelize({
    dialect:'sqlite',
    host: 'localhost',
    username: 'root',
    password: 'root',
    database: 'moviesdb',
    logging: (...msg) => console.log(msg)
});

const connectToDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

module.exports = {sequelize, connectToDB};