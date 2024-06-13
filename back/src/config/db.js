const {Sequelize} = require('sequelize');

require('dotenv').config();

// Parametros de conección a nuestra base de datos
const databese = process.env.NAME_DB; 
const username = process.env.USERNAME_DB;
const password = process.env.PASSWORD_DB;
const host = process.env.HOST_DB;

// Objeto sequlize para autenticarnos en nuestra BD
const sequelize = new Sequelize(databese, username, password, {
    host,
    dialect: 'mysql'
})

// Conexión propiamente dicha
const connectToDB = async () => {
    try {
        await sequelize.authenticate();    
        console.log('Conectado a la BD');
    } catch (error) {
        console.error(error);
    }
}

// Exportamos los modulos anteriores
module.exports = {
    sequelize, connectToDB
}